import { Ahorcado } from "../domain/Ahorcado";

export function mountApp(container: HTMLElement, juego: Ahorcado): void {
  function render(): void {
    container.innerHTML = `
      <p data-testid="word">${juego.palabraEnmascarada()}</p>
      <p data-testid="lives">${juego.vidas()}</p>
      <input type="text" maxlength="1" />
    `;

    container.querySelector("input")!.addEventListener("keydown", (e) => {
      if (e.key === "Enter") {
        const input = e.target as HTMLInputElement;
        juego.adivinar(input.value);
        render();
      }
    });
  }

  render();
}
