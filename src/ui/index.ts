import { Ahorcado } from "../domain/Ahorcado";
import { mountApp } from "./main";

const params = new URLSearchParams(window.location.search);
const palabra = params.get("word") ?? "AHORCADO";

const juego = new Ahorcado(palabra);
mountApp(document.getElementById("app")!, juego);
