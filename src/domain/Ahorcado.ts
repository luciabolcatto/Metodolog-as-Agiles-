export class Ahorcado {
  private palabra: string;
  private _vidas: number = 6;
  private letrasAdivinadas: Set<string> = new Set();

  constructor(palabra: string) {
    this.palabra = palabra;
  }

  adivinar(letra: string): void {
    this.letrasAdivinadas.add(letra.toUpperCase());
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
