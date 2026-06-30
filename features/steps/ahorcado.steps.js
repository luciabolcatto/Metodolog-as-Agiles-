import { expect } from "@playwright/test";
import { createBdd } from "playwright-bdd";
const { Given, When, Then } = createBdd();
function normalizarDificultad(dificultad) {
    return dificultad.toLowerCase().replace(/[^a-z]/g, "");
}
Given("que el jugador abre la aplicación", async ({ page }) => {
    await page.goto("/");
});
Given("que el jugador abre la aplicación con la palabra {string}", async ({ page }, palabra) => {
    await page.goto(`/?word=${palabra}`);
});
Given("que el jugador selecciona la dificultad {string}", async ({ page }, dificultad) => {
    await page.goto("/");
    await page.getByTestId(`dificultad-${normalizarDificultad(dificultad)}`).click();
});
Given("una partida con la palabra {string}", async ({ page }, palabra) => {
    await page.goto(`/?word=${palabra}`);
});
When("el jugador elige la dificultad {string}", async ({ page }, dificultad) => {
    await page.getByTestId(`dificultad-${normalizarDificultad(dificultad)}`).click();
});
When("elige la dificultad {string}", async ({ page }, dificultad) => {
    await page.getByTestId(`dificultad-${dificultad.toLowerCase()}`).click();
});
When("presiona iniciar partida", async ({ page }) => {
    await page.getByTestId("start-button").click();
});
When("inicia una partida con la palabra {string}", async ({ page }, palabra) => {
    await page.goto(`/?word=${palabra}`);
});
When("el jugador adivina la letra {string}", async ({ page }, letra) => {
    const input = page.getByTestId("guess-input");
    await input.fill(letra);
    await input.press("Enter");
});
Then("ve el título {string}", async ({ page }, titulo) => {
    await expect(page.getByRole("heading", { name: titulo })).toBeVisible();
});
Then("ve la opción de dificultad {string} seleccionada", async ({ page }, dificultad) => {
    await expect(page.getByTestId(`dificultad-${dificultad.toLowerCase()}`)).toHaveClass(/active/);
});
Then("se ve la palabra {string}", async ({ page }, esperada) => {
    await expect(page.getByTestId("word")).toHaveText(esperada);
});
Then("se ven {int} vidas", async ({ page }, vidas) => {
    await expect(page.getByTestId("lives")).toHaveText(String(vidas));
});
Then("se ve el mensaje {string}", async ({ page }, mensaje) => {
    await expect(page.getByTestId("mensaje")).toHaveText(mensaje);
});
Then("se ve el temporizador en {string}", async ({ page }, tiempoEsperado) => {
    await expect(page.getByTestId("timer")).toHaveText(tiempoEsperado);
});
