import { Ahorcado } from "../domain/Ahorcado";

export function mountApp(container: HTMLElement, juego: Ahorcado): void {
  function render(): void {
    container.innerHTML = `
      <p data-testid="word">${juego.palabraEnmascarada()}</p>
      <p data-testid="lives">${juego.vidas()}</p>
    `;
  }

  render();
}
