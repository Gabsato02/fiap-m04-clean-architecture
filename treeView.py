import os

IGNORAR_PASTAS = {'node_modules', '__pycache__', '.git'}
ARQUIVO_SAIDA = 'estrutura.txt'

def mostrar_arvore(caminho, nivel=0, max_nivel=3, prefixo='', saida=[]):
    if nivel > max_nivel:
        return

    try:
        itens = sorted(os.listdir(caminho))
    except PermissionError:
        saida.append(prefixo + "└── [Acesso negado]")
        return

    for i, item in enumerate(itens):
        if item in IGNORAR_PASTAS:
            continue

        caminho_completo = os.path.join(caminho, item)
        eh_ultimo = (i == len(itens) - 1)
        simbolo = "└── " if eh_ultimo else "├── "

        saida.append(prefixo + simbolo + item)

        if os.path.isdir(caminho_completo):
            novo_prefixo = prefixo + ("    " if eh_ultimo else "│   ")
            mostrar_arvore(caminho_completo, nivel + 1, max_nivel, novo_prefixo, saida)

# Caminho inicial (pode mudar para outro)
caminho_inicial = "."
max_niveis = 3

# Lista para armazenar a saída
saida_texto = []
mostrar_arvore(caminho_inicial, max_nivel=max_niveis, saida=saida_texto)

# Salvar no arquivo
with open(ARQUIVO_SAIDA, "w", encoding="utf-8") as f:
    f.write("\n".join(saida_texto))

print(f"✔ Estrutura salva em '{ARQUIVO_SAIDA}'")
