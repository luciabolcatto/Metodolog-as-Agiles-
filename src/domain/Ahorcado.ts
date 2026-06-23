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
    return this.palabra
      .split("")
      .map((l) => (this.letrasAdivinadas.has(l) ? l : "_"))
      .join(" ");
  }

  vidas(): number {
    return this._vidas;
  }
}
