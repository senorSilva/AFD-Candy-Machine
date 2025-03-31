// Espera o DOM estar completamente carregado antes de executar o script
document.addEventListener("DOMContentLoaded", () => {
  // Preços dos doces
  const doces = { A: 6, B: 7, C: 8 };
  const nomesDoces = { A: "Caramelo", B: "Bombom", C: "Barra Chocolate" };
  let valorInserido = 0; // Acumulador de valor inserido pelo usuário

  // Elementos da interface
  const estadoElemento = document.getElementById("estado");
  const mensagemElemento = document.getElementById("mensagem");
  const doceButtons = document.querySelectorAll(".doce");
  const notaButtons = document.querySelectorAll(".nota");
  const somMoeda = document.getElementById("som-moeda");

  const abrirMaquina = document.getElementById("abrir-maquina");
  const fecharMaquina = document.getElementById("fechar-maquina");
  const containerMaquina = document.getElementById("maquina-container");

  // Ao clicar no botão para abrir a máquina
  abrirMaquina.addEventListener("click", () => {
    abrirMaquina.style.display = "none"; // Oculta botão de abrir
    containerMaquina.classList.add("visible"); // Mostra máquina

    // Reinicia estado
    valorInserido = 0;
    estadoElemento.textContent = `Valor: R$0,00`;
    mensagemElemento.textContent = `Insira uma nota`;
    doceButtons.forEach(button => button.disabled = true);
  });

  // Ao clicar no botão de fechar a máquina
  fecharMaquina.addEventListener("click", () => {
    containerMaquina.classList.remove("visible");
    abrirMaquina.style.display = "block";
  });

  // Atualiza display com valor inserido e ativa/desativa botões de doces
  function atualizarEstado() {
    estadoElemento.textContent = `Valor: R$${valorInserido},00`;

    // Habilita botões se tiver saldo suficiente
    doceButtons.forEach(button => {
      const tipoDoce = button.getAttribute("data-doce");
      button.disabled = valorInserido < doces[tipoDoce];
    });

    // Mostra qual doce está disponível
    if (valorInserido >= doces.C) {
      mensagemElemento.textContent = "Barra Chocolate disponível";
    } else if (valorInserido >= doces.B) {
      mensagemElemento.textContent = "Bombom disponível";
    } else if (valorInserido >= doces.A) {
      mensagemElemento.textContent = "Caramelo disponível";
    } else {
      mensagemElemento.textContent = "Insira uma nota";
    }
  }

  // Cria animação de queda da moeda e toca o som
  function criarAnimacaoMoeda(valor) {
    if (valor <= 0) return;

    for (let i = 0; i < valor; i++) {
      setTimeout(() => {
        const coin = document.createElement("div");
        coin.classList.add("coin");

        const painel = document.querySelector(".interface-panel");
        painel.appendChild(coin);

        coin.style.animation = "coin-fall 1s forwards";

        // Reinicia som da moeda
        somMoeda.currentTime = 0;
        somMoeda.play().catch(error => {
          console.log("Erro ao tentar tocar o áudio da moeda:", error);
        });

        // Remove moeda após animação
        setTimeout(() => {
          coin.remove();
        }, 1000);
      }, i * 500); // Intervalo entre moedas
    }
  }

  // Mostra o doce na "porta" após compra
  function mostrarDoceEntregue(tipo) {
    const doce = document.createElement("div");
    doce.classList.add("doce-entregue");

    const imagem = document.createElement("img");
    imagem.src = `candy${tipo === "A" ? 1 : tipo === "B" ? 2 : 3}.png`;
    imagem.alt = `Doce ${tipo}`;
    imagem.style.width = "120px";
    imagem.style.height = "auto";
    doce.appendChild(imagem);

    const porta = document.getElementById("saida-doce");
    porta.appendChild(doce);

    // Animação de "tremor" da máquina
    containerMaquina.classList.add("shake");
    setTimeout(() => {
      containerMaquina.classList.remove("shake");
    }, 600);

    // Remove o doce da interface após 2 segundos
    setTimeout(() => {
      doce.remove();
    }, 2000);
  }

  // Função chamada ao inserir uma nota
  function inserirNota(valor) {
    valorInserido += valor;
    criarAnimacaoMoeda(valor);
    atualizarEstado();
  }

  // Função chamada ao selecionar um doce
  function selecionarDoce(tipo) {
    if (valorInserido >= doces[tipo]) {
      const troco = valorInserido - doces[tipo];
      valorInserido = 0; // Reseta valor
      atualizarEstado();
      mostrarDoceEntregue(tipo);

      const nomeDoce = nomesDoces[tipo];
      mensagemElemento.textContent = troco > 0
        ? `${nomeDoce} entregue. Troco: R$${troco},00`
        : `${nomeDoce} entregue sem troco`;
    }
  }

  // Eventos para botões de nota
  notaButtons.forEach(button => {
    button.addEventListener("click", () => {
      const valor = parseInt(button.getAttribute("data-valor"));
      inserirNota(valor);
    });
  });

  // Eventos para botões de doce
  doceButtons.forEach(button => {
    button.addEventListener("click", () => {
      const tipoDoce = button.getAttribute("data-doce");
      selecionarDoce(tipoDoce);
    });
  });
});
