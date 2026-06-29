import { Ahorcado } from "../domain/Ahorcado";

export function mountApp(container: HTMLElement, juego: Ahorcado): void {
  let timerInterval: NodeJS.Timeout | null = null;

  function render(): void {
    container.innerHTML = `
      <p data-testid="word">${juego.palabraEnmascarada()}</p>
      <p data-testid="lives">${juego.vidas()}</p>
      <p data-testid="timer">${juego.tiempoFormateado()}</p>
      <p data-testid="mensaje">${juego.estado() !== "JUGANDO" ? juego.estado() : (juego.mensaje() || "")}</p>
      <input type="text" maxlength="1" ${juego.estado() !== "JUGANDO" ? "disabled" : ""} />
    `;

    const input = container.querySelector("input") as HTMLInputElement;
    if (input && juego.estado() === "JUGANDO") {
      input.addEventListener("keydown", (e) => {
        if (e.key === "Enter") {
          juego.adivinar(input.value);
          input.value = "";
          render();
        }
      });
    }
  }

  // Iniciar render
  render();

  // Iniciar temporizador que decrementa cada segundo
  timerInterval = setInterval(() => {
    if (juego.estado() === "JUGANDO") {
      // Simular que pasó 1 segundo (en una app real, usarías actualización real)
      (juego as any).actualizarTiempo(1);
      render();
    } else {
      // Detener el temporizador cuando el juego termina
      if (timerInterval) clearInterval(timerInterval);
    }
  }, 1000);
}

