import { expect } from "@playwright/test";
import { createBdd } from "playwright-bdd";

const { Given, When, Then } = createBdd();

let dificultadSeleccionada = "media"; 

Given("que el jugador selecciona la dificultad {string}", async ({ page }, dificultad: string) => {
 
  dificultadSeleccionada = dificultad
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
});
Given("una partida con la palabra {string}", async ({ page }, palabra: string) => {
  await page.goto(`/?word=${palabra}&difficulty=${dificultadSeleccionada}`);
  dificultadSeleccionada = "media"; // 💡 Limpiamos acá también
});

When("inicia una partida con la palabra {string}", async ({ page }, palabra: string) => {
  await page.goto(`/?word=${palabra}&difficulty=${dificultadSeleccionada}`);
  dificultadSeleccionada = "media"; // 💡 Limpiamos acá
});

When("el jugador adivina la letra {string}", async ({ page }, letra: string) => {
  const input = page.getByRole("textbox");
  await input.fill(letra);
  await input.press("Enter");
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
