import { describe, it, expect } from "vitest";
import { Ahorcado } from "../src/domain/Ahorcado";

it("la palabra empieza completamente enmascarada", () => {
  const juego = new Ahorcado("GATO");
  expect(juego.palabraEnmascarada()).toBe("_ _ _ _");
});
