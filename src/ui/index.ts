import { Ahorcado } from "../domain/Ahorcado";
import { mountApp } from "./main";

const params = new URLSearchParams(window.location.search);
const palabra = params.get("word") ?? "AHORCADO";


const dificultadUrl = params.get("difficulty")?.toLowerCase() ?? undefined;



const juego = new Ahorcado(palabra, dificultadUrl);
mountApp(document.getElementById("app")!, juego);