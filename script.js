document.addEventListener("DOMContentLoaded", () => {
    const doces = { A: 6, B: 7, C: 8 };
    let valorInserido = 0;
  
    const estadoElemento = document.getElementById("estado");
    const mensagemElemento = document.getElementById("mensagem");
    const doceButtons = document.querySelectorAll(".doce");
    const notaButtons = document.querySelectorAll(".nota");
    const somMoeda = document.getElementById("som-moeda");
  
    const abrirMaquina = document.getElementById("abrir-maquina");
    const fecharMaquina = document.getElementById("fechar-maquina");
    const containerMaquina = document.getElementById("maquina-container");
  
    abrirMaquina.addEventListener("click", () => {
      abrirMaquina.style.display = "none";
      containerMaquina.classList.add("visible");
  
      valorInserido = 0;
      estadoElemento.textContent = `Valor: R$0,00`;
      mensagemElemento.textContent = `Insira uma nota`;
      doceButtons.forEach(button => button.disabled = true);
    });
  
    fecharMaquina.addEventListener("click", () => {
      containerMaquina.classList.remove("visible");
      abrirMaquina.style.display = "block";
    });
  
    function atualizarEstado() {
      estadoElemento.textContent = `Valor: R$${valorInserido},00`;
  
      doceButtons.forEach(button => {
        const tipoDoce = button.getAttribute("data-doce");
        button.disabled = valorInserido < doces[tipoDoce];
      });
  
      if (valorInserido >= doces.C) {
        mensagemElemento.textContent = "Opção C disponível";
      } else if (valorInserido >= doces.B) {
        mensagemElemento.textContent = "Opção B disponível";
      } else if (valorInserido >= doces.A) {
        mensagemElemento.textContent = "Opção A disponível";
      } else {
        mensagemElemento.textContent = "Insira uma nota";
      }
    }
  
    function criarAnimacaoMoeda(valor) {
      if (valor <= 0) return;
  
      for (let i = 0; i < valor; i++) {
        setTimeout(() => {
          const coin = document.createElement("div");
          coin.classList.add("coin");

          const painel = document.querySelector(".interface-panel");
          painel.appendChild(coin);


          coin.style.animation = "coin-fall 1s forwards";
  
          somMoeda.currentTime = 0;
          somMoeda.play().catch(error => {
            console.log("Erro ao tentar tocar o áudio da moeda:", error);
          });
  
          setTimeout(() => {
            coin.remove();
          }, 1000);
        }, i * 500);
      }
    }
  
    function mostrarDoceEntregue(tipo) {
      const doce = document.createElement("div");
      doce.classList.add("doce-entregue");
      const imagem = document.createElement("img");
      imagem.src = `candy${tipo === "A" ? 1 : tipo === "B" ? 2 : 3}.png`;
      imagem.alt = `Doce ${tipo}`;
      imagem.style.width = "80px";
      imagem.style.height = "auto";
      doce.appendChild(imagem);
      
      document.body.appendChild(doce);
  
      setTimeout(() => {
        doce.remove();
      }, 2000);
    }
  
    function inserirNota(valor) {
      valorInserido += valor;
      criarAnimacaoMoeda(valor);
      atualizarEstado();
    }
  
    function selecionarDoce(tipo) {
      if (valorInserido >= doces[tipo]) {
        const troco = valorInserido - doces[tipo];
        valorInserido = 0;
        atualizarEstado();
  
        mostrarDoceEntregue(tipo);
  
        mensagemElemento.textContent = troco > 0
          ? `Doce ${tipo} entregue. Troco: R$${troco},00`
          : `Doce ${tipo} entregue sem troco`;
      }
    }
  
    notaButtons.forEach(button => {
      button.addEventListener("click", () => {
        const valor = parseInt(button.getAttribute("data-valor"));
        inserirNota(valor);
      });
    });
  
    doceButtons.forEach(button => {
      button.addEventListener("click", () => {
        const tipoDoce = button.getAttribute("data-doce");
        selecionarDoce(tipoDoce);
      });
    });
  });
  