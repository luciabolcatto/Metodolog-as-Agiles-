import { describe, it, expect } from "vitest";
import { Ahorcado } from "../src/domain/Ahorcado";

it("la palabra empieza completamente enmascarada", () => {
  const juego = new Ahorcado("GATO");
  expect(juego.palabraEnmascarada()).toBe("_ _ _ _");
});

it("las vidas iniciales son 6", () => {
  const juego = new Ahorcado("GATO");
  expect(juego.vidas()).toBe(6);
});

it("adivinar una letra correcta la revela en la palabra", () => {
  const juego = new Ahorcado("GATO");
  juego.adivinar("A");
  expect(juego.palabraEnmascarada()).toBe("_ A _ _");
});

it("acertar una letra no descuenta vidas", () => {
  const juego = new Ahorcado("GATO");
  juego.adivinar("A");
  expect(juego.vidas()).toBe(6);
});
