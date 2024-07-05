# Boggle Game

Este es un juego de Boggle desarrollado con HTML5, CSS3 y JavaScript (ES5). El objetivo del juego es encontrar tantas palabras como sea posible en una cuadrícula de 4x4 que contiene letras aleatorias.

## Tabla de Contenidos

- [Descripción](#descripción)
- [Características](#características)
- [Instalación](#instalación)
- [Cómo Jugar](#cómo-jugar)
- [Contacto](#contacto)
- [Contribuir](#contribuir)
- [Licencia](#licencia)

## Descripción

El juego de Boggle es un juego de palabras donde los jugadores deben formar palabras conectando letras adyacentes en una cuadrícula. Esta versión del juego incluye un temporizador, puntuaciones y almacenamiento de resultados en LocalStorage.

## Características

- Tablero de juego 4x4 con letras generadas aleatoriamente.
- Selección de letras contiguas para formar palabras.
- Puntuación basada en las palabras encontradas.
- Penalización por palabras incorrectas.
- Diferentes duraciones de temporizador.
- Almacenamiento de resultados en LocalStorage.
- Modal para mostrar el ranking de jugadores.
- Validaciones de formulario en la página de contacto.
- Barra de navegación con enlaces a GitHub y la página de contacto.

## Instalación

Para instalar y ejecutar el juego localmente, seguí estos pasos:

1. Cloná el repositorio:

   ```bash
   git clone https://github.com/gabriel-rodriguezcastellini/BoggleGame.git
   ```

2. Abrí `index.html` en tu navegador web.

## Cómo Jugar

1. Ingresá tu nombre en el formulario y seleccioná la duración del temporizador.
2. Hacé clic en "Iniciar Juego".
3. Seleccioná letras contiguas en el tablero para formar palabras.
4. Enviá la palabra haciendo clic en "Enviar Palabra".
5. La puntuación se actualizará automáticamente.
6. Al finalizar el tiempo, el juego guardará tu resultado y podrás verlo en el ranking.

### Temporizador

El temporizador se puede configurar a 1, 2 o 3 minutos. Durante los últimos 10 segundos, el temporizador cambiará de color y emitirá un sonido de alerta.

### Ranking

El ranking de jugadores se puede ordenar por puntaje o por fecha. Hacé clic en "Mostrar Ranking" para ver la lista de resultados.

## Contacto

Para cualquier consulta o sugerencia, por favor visitá la [página de contacto](contact.html) y llená el formulario. Asegurate de que tu nombre sea alfanumérico, el correo electrónico sea válido y el mensaje tenga más de 5 caracteres.

## Contribuir

Las contribuciones son bienvenidas. Por favor seguí estos pasos para contribuir:

1. Hacé un fork del proyecto.
2. Creá una nueva rama (`git checkout -b feature/nueva-caracteristica`).
3. Realizá los cambios necesarios y hacé commit (`git commit -m 'Añadir nueva característica'`).
4. Pusheá los cambios (`git push origin feature/nueva-caracteristica`).
5. Abrí un pull request.

## Licencia

Este proyecto está licenciado bajo la Licencia MIT. Consulta el archivo [LICENSE](LICENSE) para más detalles.

[![pages-build-deployment](https://github.com/gabriel-rodriguezcastellini/BoggleGame/actions/workflows/pages/pages-build-deployment/badge.svg)](https://github.com/gabriel-rodriguezcastellini/BoggleGame/actions/workflows/pages/pages-build-deployment)
