# language: es
Característica: Iniciar partida

  Escenario: El jugador ve la pantalla de inicio y comienza una partida
    Dado que el jugador abre la aplicación
    Entonces ve el título "Ahorcado"
    Y ve la opción de dificultad "Media" seleccionada
    Cuando elige la dificultad "Dificil"
    Y presiona iniciar partida
    Entonces se ve la palabra "_ _ _ _"
    Y se ven 4 vidas
