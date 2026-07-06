import { Ahorcado } from "../domain/Ahorcado";

type Difficulty = "facil" | "media" | "dificil";

interface AppOptions {
  palabra: string;
  dificultad?: Difficulty;
  autoStart?: boolean;
}

export function mountApp(container: HTMLElement, options: AppOptions): void {
  let juego: Ahorcado | null = null;
  let timerInterval: number | null = null;
  let dificultadSeleccionada: Difficulty = options.dificultad ?? "media";
  let guessInputValue = "";

  function iniciarTemporizador(): void {
    if (timerInterval !== null) return;
    timerInterval = window.setInterval(() => {
      if (juego && juego.estado() === "JUGANDO") {
        juego.actualizarTiempo(1);
        render();
      } else if (timerInterval !== null) {
        window.clearInterval(timerInterval);
        timerInterval = null;
      }
    }, 1000);
  }

  function iniciarJuego(): void {
    juego = new Ahorcado(options.palabra, dificultadSeleccionada);
    render();
    iniciarTemporizador();
  }

  function renderInicio(): void {
    container.innerHTML = `
      <section class="card intro-screen" data-testid="start-screen">
        <h1>Ahorcado</h1>
        <p class="description">Elige tu dificultad y empieza una partida nueva.</p>
        <div class="difficulty-options">
          <button data-testid="dificultad-facil" data-dificultad="facil" class="difficulty-button ${dificultadSeleccionada === "facil" ? "active" : ""}">Facil</button>
          <button data-testid="dificultad-media" data-dificultad="media" class="difficulty-button ${dificultadSeleccionada === "media" ? "active" : ""}">Media</button>
          <button data-testid="dificultad-dificil" data-dificultad="dificil" class="difficulty-button ${dificultadSeleccionada === "dificil" ? "active" : ""}">Dificil</button>
        </div>
        <button data-testid="start-button" class="start-button">Iniciar partida</button>
      </section>
    `;

    container.querySelectorAll<HTMLButtonElement>(".difficulty-button").forEach((button) => {
      button.addEventListener("click", () => {
        const modo = button.dataset.dificultad as Difficulty | undefined;
        dificultadSeleccionada = modo ?? "media";
        window.localStorage.setItem("ahorcado-dificultad", dificultadSeleccionada);
        render();
      });
    });

    const inicio = container.querySelector<HTMLButtonElement>("[data-testid='start-button']");
    if (inicio) {
      inicio.addEventListener("click", () => {
        iniciarJuego();
      });
    }
  }

  function renderJuego(): void {
    if (!juego) return;
    container.innerHTML = `
      <section class="card game-screen">
        <div class="status-row">
          <div class="status-card">
            <span class="label">Palabra</span>
            <strong data-testid="word">${juego.palabraEnmascarada()}</strong>
          </div>
          <div class="status-card">
            <span class="label">Vidas</span>
            <strong data-testid="lives">${juego.vidas()}</strong>
          </div>
          <div class="status-card">
            <span class="label">Temporizador</span>
            <strong data-testid="timer">${juego.tiempoFormateado()}</strong>
          </div>
        </div>
        <p class="message" data-testid="mensaje">${juego.estado() !== "JUGANDO" ? juego.estado() : (juego.mensaje() || "")}</p>
        <div class="guess-row">
          <input data-testid="guess-input" type="text" maxlength="1" placeholder="Ingresa una letra" ${juego.estado() !== "JUGANDO" ? "disabled" : ""} />
          <button data-testid="guess-button" ${juego.estado() !== "JUGANDO" ? "disabled" : ""}>Enviar</button>
        </div>
      </section>
    `;

    const input = container.querySelector<HTMLInputElement>('[data-testid="guess-input"]');
    const button = container.querySelector<HTMLButtonElement>('[data-testid="guess-button"]');

    function procesarAdivinanza(): void {
      if (!input || !juego) return;
      const letra = input.value.trim().toLowerCase();
      if (letra === "") return;
      juego.adivinar(letra);
      guessInputValue = "";
      render();
    }

    if (input && button) {
      input.value = guessInputValue;

      button.addEventListener("click", procesarAdivinanza);
      input.addEventListener("input", () => {
        guessInputValue = input.value;
      });
      input.addEventListener("keydown", (e) => {
        if (e.key === "Enter") {
          procesarAdivinanza();
        }
      });
      input.focus();
    }
  }

  function render(): void {
    if (!juego) {
      renderInicio();
    } else {
      renderJuego();
    }
  }

  if (options.autoStart) {
    iniciarJuego();
  } else {
    render();
  }
}

