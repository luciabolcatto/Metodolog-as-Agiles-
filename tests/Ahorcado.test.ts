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

it("fallar una letra descuenta una vida", () => {
  const juego = new Ahorcado("GATO");
  juego.adivinar("E");
  expect(juego.vidas()).toBe(5);
});

it("fallar una letra no altera la palabra enmascarada", () => {
  const juego = new Ahorcado("GATO");
  juego.adivinar("E");
  expect(juego.palabraEnmascarada()).toBe("_ _ _ _");
});

it("el estado inicial es JUGANDO", () => {
  const juego = new Ahorcado("GATO");
  expect(juego.estado()).toBe("JUGANDO");
});

it("el estado es GANASTE cuando se aciertan todas las letras", () => {
  const juego = new Ahorcado("GATO");
  juego.adivinar("G");
  juego.adivinar("A");
  juego.adivinar("T");
  juego.adivinar("O");
  expect(juego.estado()).toBe("GANASTE");
});

it("el estado es PERDISTE cuando las vidas llegan a 0", () => {
  const juego = new Ahorcado("GATO");
  "ZXCVBN".split("").forEach((l) => juego.adivinar(l));
  expect(juego.estado()).toBe("PERDISTE");
});

it("revela toda la palabra cuando se pierde", () => {
  const juego = new Ahorcado("GATO");
  "ZXCVBN".split("").forEach((l) => juego.adivinar(l));
  expect(juego.palabraEnmascarada()).toBe("G A T O");
});

it("no descuenta vida si la letra se repite", () => {
  const juego = new Ahorcado("GATO");
  juego.adivinar("E");
  expect(juego.vidas()).toBe(5);
  juego.adivinar("E");
  expect(juego.vidas()).toBe(5);
});

it("informa si la letra ya fue intentada", () => {
  const juego = new Ahorcado("GATO");
  juego.adivinar("A");
  juego.adivinar("A");
  expect(juego.mensaje()).toBe("Ya intentaste con esa letra");
});
