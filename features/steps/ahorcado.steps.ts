import { expect } from "@playwright/test";
import { createBdd } from "playwright-bdd";

const { Given, When, Then } = createBdd();

function normalizarDificultad(dificultad: string): string {
  return dificultad.toLowerCase().replace(/[^a-z]/g, "");
}

Given("que el jugador abre la aplicación", async ({ page }) => {
  await page.goto("/");
});

Given("que el jugador abre la aplicación con la palabra {string}", async ({ page }, palabra: string) => {
  await page.goto(`/?word=${palabra}`);
});

Given("que el jugador selecciona la dificultad {string}", async ({ page }, dificultad: string) => {
  await page.goto("/");
  await page.getByTestId(`dificultad-${normalizarDificultad(dificultad)}`).click();
});

Given("una partida con la palabra {string}", async ({ page }, palabra: string) => {
  await page.goto(`/?word=${palabra}`);
});

When("el jugador elige la dificultad {string}", async ({ page }, dificultad: string) => {
  await page.getByTestId(`dificultad-${normalizarDificultad(dificultad)}`).click();
});
When("elige la dificultad {string}", async ({ page }, dificultad: string) => {
  await page.getByTestId(`dificultad-${dificultad.toLowerCase()}`).click();
});
When("presiona iniciar partida", async ({ page }) => {
  await page.getByTestId("start-button").click();
});

When("inicia una partida con la palabra {string}", async ({ page }, palabra: string) => {
  await page.goto(`/?word=${palabra}`);
});

When("el jugador adivina la letra {string}", async ({ page }, letra: string) => {
  const input = page.getByTestId("guess-input");
  await input.fill(letra);
  await input.press("Enter");
});

Then("ve el título {string}", async ({ page }, titulo: string) => {
  await expect(page.getByRole("heading", { name: titulo })).toBeVisible();
});

Then("ve la opción de dificultad {string} seleccionada", async ({ page }, dificultad: string) => {
  await expect(page.getByTestId(`dificultad-${dificultad.toLowerCase()}`)).toHaveClass(/active/);
});

Then("se ve la palabra {string}", async ({ page }, esperada: string) => {
  await expect(page.getByTestId("word")).toHaveText(esperada);
});

Then("se ven {int} vidas", async ({ page }, vidas: number) => {
  await expect(page.getByTestId("lives")).toHaveText(String(vidas));
});

Then("se ve el mensaje {string}", async ({ page }, mensaje: string) => {
  await expect(page.getByTestId("mensaje")).toHaveText(mensaje);
});

Then("se ve el temporizador en {string}", async ({ page }, tiempoEsperado: string) => {
  await expect(page.getByTestId("timer")).toHaveText(tiempoEsperado);
});
