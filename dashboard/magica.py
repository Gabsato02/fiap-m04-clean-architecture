import os
import shutil
import re
from pathlib import Path

SRC_BASE = Path("src").resolve()

MIGRACOES = [
    (r"modules/.*/components", "presentation/components"),
    (r"modules/.*/views", "presentation/views"),
    (r"root\.component\.tsx", "presentation"),
    (r"root\.component\.test\.tsx", "presentation"),
    (r"modules/.*/services/index\.ts", "infrastructure/repositories"),
    (r"requests/index\.ts", "infrastructure/http"),
    (r"types/index\.ts", "domain/entities"),
]

EXTENSOES_ALVO = (".ts", ".tsx")

def encontrar_arquivos(base: Path):
    for caminho in base.rglob("*"):
        if caminho.suffix in EXTENSOES_ALVO and caminho.is_file():
            yield caminho.resolve()

def caminho_relativo_src(path: Path) -> str:
    return path.relative_to(SRC_BASE).as_posix()

def novo_destino(path: Path) -> Path:
    rel = caminho_relativo_src(path)
    for padrao, destino_base in MIGRACOES:
        if re.search(padrao, rel):
            return SRC_BASE / destino_base / path.name
    return None

def remover_imports_conteudo(conteudo: str) -> str:
    linhas = conteudo.splitlines()
    return "\n".join(
        linha for linha in linhas if not re.match(r"^\s*(import|require)\s+", linha)
    )

def mover_arquivo_removendo_imports(origem: Path, destino: Path):
    os.makedirs(destino.parent, exist_ok=True)
    with open(origem, "r", encoding="utf-8") as f:
        conteudo = f.read()

    conteudo_sem_imports = remover_imports_conteudo(conteudo)

    with open(destino, "w", encoding="utf-8") as f:
        f.write(conteudo_sem_imports)

    os.remove(origem)
    print(f"✅ {origem.relative_to(SRC_BASE)} ➜ {destino.relative_to(SRC_BASE)} (sem imports)")

def atualizar_imports_em_todos(caminho_antigo: Path, caminho_novo: Path):
    antigo_rel_sem_ext = caminho_antigo.relative_to(SRC_BASE).with_suffix("")
    for arquivo in encontrar_arquivos(SRC_BASE):
        with open(arquivo, "r", encoding="utf-8") as f:
            conteudo = f.read()

        if str(antigo_rel_sem_ext) not in conteudo:
            continue

        import_novo = os.path.relpath(
            caminho_novo.with_suffix(""), start=arquivo.parent
        ).replace("\\", "/")

        if not import_novo.startswith("."):
            import_novo = f"./{import_novo}"

        # Substituir todos os imports do caminho antigo
        novo_conteudo = re.sub(
            rf"(from\s+['\"])(.*?{re.escape(str(antigo_rel_sem_ext))})(['\"])",
            rf"\1{import_novo}\3",
            conteudo
        )

        if conteudo != novo_conteudo:
            with open(arquivo, "w", encoding="utf-8") as f:
                f.write(novo_conteudo)
            print(f"🔧 Import ajustado em: {arquivo.relative_to(SRC_BASE)}")

def main():
    arquivos_restantes = list(encontrar_arquivos(SRC_BASE))
    movidos = []

    while True:
        progresso = False
        novos_restantes = []
        for caminho in arquivos_restantes:
            destino = novo_destino(caminho)
            if destino:
                mover_arquivo_removendo_imports(caminho, destino)
                atualizar_imports_em_todos(caminho, destino)
                movidos.append((caminho, destino))
                progresso = True
            else:
                novos_restantes.append(caminho)
        if not progresso:
            break
        arquivos_restantes = novos_restantes

    print(f"\n✅ Total de arquivos movidos e ajustados: {len(movidos)}")

if __name__ == "__main__":
    main()
