export class Ahorcado {
  private palabra: string;
  private _vidas: number = 6;
  private letrasAdivinadas: Set<string> = new Set();
  private _mensaje: string | null = null;
  private tiempoEnSegundos: number;

  constructor(palabra: string, dificultad: string = "media") {
    this.palabra = palabra;

    if (dificultad === "dificil") {
      this._vidas = 4;
      this.tiempoEnSegundos = 180; // 3 minutos
    } else if (dificultad === "facil") {
      this._vidas = 8;
      this.tiempoEnSegundos = 300; // 5 minutos
    } else {
      this._vidas = 6; // Para "media" o si no pasan el parámetro
      this.tiempoEnSegundos = 300; // 5 minutos
    }
  }

  tiempoRestante(): number {
    return this.tiempoEnSegundos;
  }

  actualizarTiempo(segundosTranscurridos: number): void {
    this.tiempoEnSegundos -= segundosTranscurridos;
    if (this.tiempoEnSegundos < 0) {
      this.tiempoEnSegundos = 0;
    }
  }

  tiempoFormateado(): string {
    const minutos = Math.floor(this.tiempoEnSegundos / 60);
    const segundos = this.tiempoEnSegundos % 60;
    return `${minutos}:${segundos.toString().padStart(2, "0")}`;
  }

  adivinar(letra: string): void {
    if (this.estado() !== "JUGANDO") {
      this._mensaje = "La partida ya terminó";
      return;
    }
    if (!/^[a-zA-ZñÑ]$/.test(letra)) {
      this._mensaje = "Entrada inválida";
      return;
    }
    const letraUpper = letra.toUpperCase();
    if (this.letrasAdivinadas.has(letraUpper)) {
      this._mensaje = "Ya intentaste con esa letra";
      return;
    }
    this._mensaje = null;
    this.letrasAdivinadas.add(letraUpper);
    if (!this.palabra.includes(letraUpper)) {
      this._vidas--;
    }
  }

  mensaje(): string | null {
    return this._mensaje;
  }

  palabraEnmascarada(): string {
    if (this.estado() === "PERDISTE") {
      return this.palabra.split("").join(" ");
    }
    return this.palabra
      .split("")
      .map((l) => (this.letrasAdivinadas.has(l) ? l : "_"))
      .join(" ");
  }

  vidas(): number {
    return this._vidas;
  }

  estado(): string {
    if (this._vidas <= 0 || this.tiempoEnSegundos <= 0) {
      return "PERDISTE";
    }
    const todasAdivinadas = this.palabra.split("").every((l) => this.letrasAdivinadas.has(l));
    if (todasAdivinadas) {
      return "GANASTE";
    }
    return "JUGANDO";
  }
}

