function Pilha() {
  this.itens = [];

  this.push = function(elemento) {
    this.itens.push(elemento);
  };

  this.pop = function() {
    return this.itens.pop();
  };

  this.peek = function() {
    return this.itens[this.itens.length - 1];
  };

  this.isEmpty = function() {
    return this.itens.length === 0;
  };
}

document.addEventListener("DOMContentLoaded", () => {
  const displayAndar = document.getElementById("display-andar");
  const portas = document.getElementById("porta-elevador");
  const portaE = document.querySelector(".porta.esquerda");
  const portaD = document.querySelector(".porta.direita");
  const pilhaAndares = new Pilha();
  pilhaAndares.push(0); // Começa no térreo

  const backgrounds = [
    "white",
    "../images/bg_lvl_1.png",
    "../images/bg_lvl_2.png",
    "../images/bg_lvl_3.png"
  ];
  const portasE = [
    "../images/door_lvl_1_l.png",
    "../images/door_lvl_1_l.png",
    "../images/door_lvl_2_l.png",
    "../images/door_lvl_3_l.png"
  ];
  const portasD = [
    "../images/door_lvl_1_r.png",
    "../images/door_lvl_1_r.png",
    "../images/door_lvl_2_r.png",
    "../images/door_lvl_3_r.png"
  ];

  let emMovimento = false;

  function atualizarVisual(andar) {
    const container = document.getElementById("case2-background");
    container.style.backgroundImage = backgrounds[andar] === "white"
      ? "none"
      : `url(${backgrounds[andar]})`;
    container.style.backgroundColor = backgrounds[andar] === "white" ? "white" : "transparent";
    portaE.style.backgroundImage = `url(${portasE[andar]})`;
    portaD.style.backgroundImage = `url(${portasD[andar]})`;
  }

  function abrirPortas() {
    portas.classList.add("abrir");
  }

  function fecharPortas() {
    portas.classList.remove("abrir");
  }

  function moverParaAndar(destino) {
    const atual = pilhaAndares.peek();
    if (emMovimento || destino === atual) return;

    emMovimento = true;
    fecharPortas();
    const tempo = Math.abs(destino - atual) * 2000;
    displayAndar.textContent = `Indo para o andar ${destino}...`;
    displayAndar.textContent = destino === 0 ? "Indo para o térreo" : `Indo para o andar ${destino}...`;

    setTimeout(() => {
      pilhaAndares.push(destino);
      atualizarVisual(destino);
      displayAndar.textContent = destino === 0 ? "Você está no térreo" : `Você está no andar ${destino}`;
      abrirPortas();
      emMovimento = false;
    }, tempo);
  }

  // Botões dos andares
  document.querySelectorAll(".andar-btn").forEach(botao => {
    botao.addEventListener("click", () => {
      moverParaAndar(parseInt(botao.getAttribute("data-andar")));
    });
  });

  // Voltar ao andar anterior (desempilha)
  document.addEventListener("keydown", (e) => {
    if (e.key === "Backspace" || e.key === "ArrowDown") {
      if (pilhaAndares.isEmpty()) return;
      const atual = pilhaAndares.pop(); // tira o atual
      const anterior = pilhaAndares.peek(); // vê o anterior
      if (anterior !== undefined) {
        fecharPortas();
        const tempo = Math.abs(anterior - atual) * 2000;
        displayAndar.textContent = `Voltando ao andar ${anterior}...`;
        emMovimento = true;

        setTimeout(() => {
          atualizarVisual(anterior);
          displayAndar.textContent = anterior === 0 ? "Você está no térreo" : `Você está no andar ${anterior}`;
          abrirPortas();
          emMovimento = false;
        }, tempo);
      } else {
        pilhaAndares.push(atual); // volta o atual se não tinha anterior
      }
    }
  });

  atualizarVisual(pilhaAndares.peek());
  abrirPortas();
});
