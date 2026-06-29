# language: es
Característica: Temporizador de partida

  Escenario: La partida comienza con temporizador de 5 minutos en dificultad media
    Dado una partida con la palabra "GATO"
    Entonces se ve el temporizador en "5:00"

  Escenario: La partida comienza con temporizador de 3 minutos en dificultad difícil
    Dado que el jugador selecciona la dificultad "Dificil"
    Cuando inicia una partida con la palabra "PALABRA"
    Entonces se ve el temporizador en "3:00"
