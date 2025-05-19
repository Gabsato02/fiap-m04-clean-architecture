import os

EXTENSOES_IGNORADAS = {
    ".png", ".jpg", ".jpeg", ".gif", ".bmp", ".pdf",
    ".exe", ".dll", ".so", ".zip", ".tar", ".gz", ".7z",
    ".lock", ".log", ".map", ".ico", ".ttf", ".woff", ".woff2",
    ".pyc", ".class", ".jar", ".bin", ".db"
}

PASTAS_IGNORADAS = {
    "node_modules", ".git", "dist", "build", "__pycache__",
    "coverage", ".idea", ".vscode", "venv", "env"
}

ARQUIVOS_IGNORADOS = {
    "package-lock.json", ".DS_Store"
}

def limpar_conteudo(texto):
    linhas = texto.splitlines()
    linhas_limpas = []
    for linha in linhas:
        linha = linha.strip()
        if not linha:
            continue
        if linha.startswith("//") or linha.startswith("#"):
            continue
        linhas_limpas.append(linha)
    return "\n".join(linhas_limpas)

caminho_base = "."
arquivo_saida = "resumo.txt"

with open(arquivo_saida, "w", encoding="utf-8") as saida:
    for raiz, dirs, arquivos in os.walk(caminho_base):
        # Remove pastas irrelevantes
        dirs[:] = [d for d in dirs if d not in PASTAS_IGNORADAS]

        for nome_arquivo in arquivos:
            if nome_arquivo in ARQUIVOS_IGNORADOS:
                continue

            ext = os.path.splitext(nome_arquivo)[1].lower()
            if ext in EXTENSOES_IGNORADAS:
                continue

            caminho_absoluto = os.path.join(raiz, nome_arquivo)
            caminho_relativo = os.path.relpath(caminho_absoluto, caminho_base)

            try:
                with open(caminho_absoluto, "r", encoding="utf-8") as f:
                    conteudo = f.read()
                    conteudo_limpo = limpar_conteudo(conteudo)
            except Exception:
                continue  # Ignora arquivos que não são texto

            if not conteudo_limpo.strip():
                continue

            saida.write(f"### {caminho_relativo}\n")
            saida.write(conteudo_limpo)
            saida.write("\n\n")

print(f"Resumo compacto salvo em: {arquivo_saida}")
