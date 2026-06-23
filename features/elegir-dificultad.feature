# features/elegir-dificultad.feature
# language: es
Característica: Elegir dificultad

  Escenario: Iniciar una partida en dificultad difícil reduce las vidas iniciales
    Dado que el jugador selecciona la dificultad "Dificil"
    Cuando inicia una partida con la palabra "ESTERNOCLEIDOMASTOIDEO"
    Entonces se ve la palabra "_ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _"
    Y se ven 4 vidas