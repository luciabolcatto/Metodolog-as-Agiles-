import { mountApp } from "./main";
function parseDifficulty(value) {
    const normalized = value?.toLowerCase();
    if (normalized === "facil" || normalized === "media" || normalized === "dificil") {
        return normalized;
    }
    return undefined;
}
const params = new URLSearchParams(window.location.search);
const palabra = params.get("word") ?? "GATO";
const dificultadUrl = parseDifficulty(params.get("difficulty")) ??
    parseDifficulty(window.localStorage.getItem("ahorcado-dificultad"));
const autoStart = params.has("word");
mountApp(document.getElementById("app"), {
    palabra,
    dificultad: dificultadUrl,
    autoStart,
});
