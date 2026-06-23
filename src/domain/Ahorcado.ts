export class Ahorcado {
  private palabra: string;
  private _vidas: number = 6;
  private letrasAdivinadas: Set<string> = new Set();

  constructor(palabra: string) {
    this.palabra = palabra;
  }

  adivinar(letra: string): void {
    const letraUpper = letra.toUpperCase();
    this.letrasAdivinadas.add(letraUpper);
    if (!this.palabra.includes(letraUpper)) {
      this._vidas--;
    }
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
    if (this._vidas <= 0) {
      return "PERDISTE";
    }
    const todasAdivinadas = this.palabra.split("").every((l) => this.letrasAdivinadas.has(l));
    if (todasAdivinadas) {
      return "GANASTE";
    }
    return "JUGANDO";
  }
}

