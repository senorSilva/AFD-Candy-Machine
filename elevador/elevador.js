document.addEventListener("DOMContentLoaded", () => {
    const displayAndar = document.getElementById("display-andar");
    const portas = document.getElementById("porta-elevador");
    const portaE = document.querySelector(".porta.esquerda");
    const portaD = document.querySelector(".porta.direita");
  
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
  
    let andarAtual = 0;
    let emMovimento = false;
  
    function atualizarVisual(andar) {
      const container = document.getElementById("case2-container");
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
      if (emMovimento || destino === andarAtual) return;
      emMovimento = true;
      fecharPortas();
      const tempo = Math.abs(destino - andarAtual) * 2000;
      displayAndar.textContent = `Indo para o andar ${destino}...`;
      setTimeout(() => {
        andarAtual = destino;
        atualizarVisual(destino);
        displayAndar.textContent = destino === 0 ? "Você está no térreo" : `Você está no andar ${destino}`;
        abrirPortas();
        emMovimento = false;
      }, tempo);
    }
  
    document.querySelectorAll(".andar-btn").forEach(botao => {
      botao.addEventListener("click", () => {
        moverParaAndar(parseInt(botao.getAttribute("data-andar")));
      });
    });
  
    atualizarVisual(andarAtual);
    abrirPortas();
  });