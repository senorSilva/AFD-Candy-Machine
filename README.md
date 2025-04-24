===========================================
 PROJETO: MÁQUINA DE DOCES INTERATIVA
===========================================

📁 DESCRIÇÃO
-----------
Este projeto simula uma máquina de doces digital com uma interface retro-gaming.
O usuário pode inserir notas, visualizar o saldo e comprar doces que "saem" da máquina com animações e efeitos sonoros.

🧩 ESTRUTURA DO PROJETO
------------------------
- index.html      → Estrutura da página e interface visual
- style.css       → Estilo e animações da interface
- script.js       → Lógica de funcionamento da máquina
- coin.mp3        → Som da moeda caindo (reproduzido ao inserir notas)
- vending-machine.png → Imagem inicial para abrir a máquina
- candy1.png, candy2.png, candy3.png → Imagens dos doces entregues
- background.png  → Imagem de fundo da interface

🎮 FUNCIONALIDADES
-------------------
✔ Inserção de valores (R$1, R$2 e R$5)  
✔ Atualização em tempo real do saldo  
✔ Habilitação dinâmica dos botões de doces  
✔ Animações de moedas caindo  
✔ Entrega animada do doce escolhido  
✔ Exibição de troco  
✔ Efeitos visuais e sonoros (shake, moeda, etc.)

🚀 COMO USAR
------------
1. Abra o arquivo `index.html` em um navegador.
2. Clique na imagem da máquina para abrir a interface.
3. Insira notas clicando nos botões R$1, R$2 ou R$5.
4. Quando o valor for suficiente, escolha um doce.
5. O doce será entregue com uma animação. Se houver troco, será informado.
6. Para reiniciar, feche a máquina clicando no botão ✖.

📦 DEPENDÊNCIAS EXTERNAS
-------------------------
- Fonte "Press Start 2P" do Google Fonts (inclusa via link)
- Nenhuma dependência externa adicional

---

🛗 CASE 2: ELEVADOR INTERATIVO (PDA)
====================================

📁 DESCRIÇÃO
-----------
Este segundo case simula o funcionamento de um elevador com transições visuais entre andares, baseado no conceito de **Autômato de Pilha (PDA)**. Ao invés de apenas ir diretamente para um andar (como um AFD), o histórico de andares é armazenado em uma **pilha**, permitindo ações como "voltar ao andar anterior".

🧩 ESTRUTURA DO CASE 2
------------------------
- elevador.html   → Interface visual do elevador
- elevador.css    → Estilização do painel e áreas do elevador
- elevador.js     → Lógica com pilha (PDA) para navegação de andares
- Imagens:
  - bg_lvl_X.png → Planos de fundo por andar
  - door_lvl_X_l/r.png → Portas esquerda/direita por andar
  - elevator_interior.png → Interior do elevador

🎮 FUNCIONALIDADES
-------------------
✔ Navegação entre térreo e 3 andares  
✔ Transição visual com abertura e fechamento de portas  
✔ Histórico de navegação via pilha (PDA)  
✔ Retorno ao andar anterior via tecla "Backspace" ou "Seta para Baixo"  
✔ Interface retro com fontes estilo 8-bit  

🚀 COMO USAR
------------
1. Abra o arquivo `elevador.html` em um navegador.
2. Clique nos botões de andares para subir ou descer.
3. Use a tecla "Backspace" para retornar ao andar anterior.
4. O visual muda dinamicamente conforme o andar visitado.

📦 DEPENDÊNCIAS EXTERNAS
-------------------------
- Fonte "Press Start 2P" do Google Fonts (inclusa via link)
- Nenhuma biblioteca adicional

## APRESENTAÇÃO 
![[LINK](https://gamma.app/docs/Automatos-Finitos-Uma-Doce-Introducao-u2y3cqtgyrl15a9?mode=doc)]
