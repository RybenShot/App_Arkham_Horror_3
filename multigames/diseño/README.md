# DiceRoller — tirador de dados

Sin dependencias externas:

- `diceEngine.js` — motor de física y render sobre canvas 2D. No sabe nada de Vue, se puede usar en React, Svelte o vanilla.
- `diceSound.js` — golpes sintetizados con Web Audio, sin archivos de audio.
- `DiceRoller.vue` — componente `<script setup>` que envuelve el motor, expone props y emite eventos.
- `demo.html` — página suelta, con sonido incluido, para probar el motor sin montar nada.

Copia `diceEngine.js`, `diceSound.js` y `DiceRoller.vue` a `src/components/` y listo.

## Uso mínimo

```vue
<script setup>
import { ref } from 'vue'
import DiceRoller from './components/dice-roller/DiceRoller.vue'

const count = ref(3)

function onSettled({ values, total, marked }) {
  console.log(values, total, marked)
}
</script>

<template>
  <DiceRoller v-model:count="count" @settled="onSettled" />
</template>
```

## Props

| Prop | Tipo | Por defecto | Descripción |
| --- | --- | --- | --- |
| `count` | Number | `3` | Número de dados. Admite `v-model:count`. |
| `maxCount` | Number | `15` | Tope del slider interno. |
| `bounce` | Number | `0.45` | Coeficiente de restitución, de 0 a 0.7. |
| `view` | String | `'top'` | `'top'` cenital o `'side'` lateral. Admite `v-model:view`. |
| `markFrom` | Number | `5` | Umbral de éxito: a partir de este valor el dado se tiñe y suelta confeti. Admite `v-model:markFrom`. |
| `height` | Number | `330` | Alto del canvas en px. El ancho es el del contenedor. |
| `showControls` | Boolean | `true` | Muestra sliders y botones. Ponlo en `false` para usar tu propia UI. |
| `showResult` | Boolean | `true` | Muestra la cabecera con el total y el desglose. |
| `rollOnMount` | Boolean | `true` | Lanza una tirada al montar. |
| `sound` | Boolean | `true` | Sonido de los golpes. |
| `volume` | Number | `0.5` | Volumen, de 0 a 1. |
| `theme` | Object | `{}` | `{ ink, board, die, dieMarked, pipOne, confetti }`. `die` y `dieMarked` son `[r,g,b]`. |

## Eventos

- `roll` — se emite al empezar una tirada completa.
- `reroll` — índice del dado al empezar un relanzamiento suelto.
- `settled` — `{ values: number[], total: number, marked: number }` cuando todos los dados se detienen.
- `update:count`, `update:view`, `update:markFrom` — para los `v-model`.

## Métodos expuestos

```vue
<DiceRoller ref="dados" :show-controls="false" />
```

```js
const dados = ref(null)
dados.value.roll(1)        // tirada normal
dados.value.roll(1.9)      // lanzamiento fuerte
dados.value.rerollOne(2)   // relanzar sólo el tercer dado
dados.value.toggleView()
dados.value.values         // ref con las caras actuales
dados.value.total          // ref con la suma
dados.value.marked         // ref con el nº de éxitos
```

## Relanzar un dado suelto

Un toque sobre un dado lo relanza a él solo; un toque fuera del tablero, o un deslizamiento, lanza todos. El dado cae cerca de donde estaba, así que la disposición se conserva. Si choca con un vecino, ese vecino se despierta y se aparta, y el evento `settled` vuelve a emitirse con los valores actualizados.

Por código:

```js
const i = engine.pickAt(ev.clientX, ev.clientY)  // -1 si no hay dado ahí
if (i >= 0) engine.rollOne(i)
```

`pickAt` proyecta el centro de cada dado a pantalla y se queda con el más cercano a la cámara dentro de su radio, así que en montones acierta el de arriba.

## Umbral de éxito

`markFrom` decide qué cuenta como éxito, de 1 a 6. Cambiarlo repinta los dados marcados al instante, sin volver a tirar:

```js
engine.setMarkFrom(4)   // 4, 5 y 6 son éxito
engine.marked           // cuántos dados lo alcanzan
engine.markFrom         // umbral actual
```

En el componente es la prop `markFrom` con `v-model`, y el evento `settled` ya devuelve `marked` calculado con ese umbral.

## Sonido

`diceSound.js` sintetiza cada golpe en el momento, sin archivos de audio: una ráfaga de ruido por un filtro de banda para el clac, más un seno grave en las caídas fuertes. El tono cambia según el dado choque contra el suelo, contra la pared o contra otro dado, y el volumen sale de la velocidad del impacto. Al terminar una tirada con cincos o seises suena un repique corto.

El motor agrupa los golpes: un aterrizaje toca varios vértices pero emite un solo evento, el más fuerte, con 50 ms de descanso por dado, y el sintetizador limita a seis voces simultáneas.

Los navegadores no dejan abrir el audio sin un gesto previo del usuario, así que el contexto se crea en el primer toque o clic. El componente ya lo hace por su cuenta; si usas el motor suelto, llama a `sound.unlock()` desde algún evento de usuario.

```js
const sound = new DiceSound({ volume: 0.5 })
sound.setEnabled(false)   // silenciar
sound.setVolume(0.3)      // volumen 0 a 1
```

## Usar el motor sin Vue

```js
import DiceEngine from './diceEngine.js'
import DiceSound from './diceSound.js'

const sound = new DiceSound()
document.addEventListener('pointerdown', () => sound.unlock(), { once: true })

const engine = new DiceEngine(document.querySelector('canvas'), {
  count: 5,
  restitution: 0.5,
  view: 'top',
  onImpact: (e) => sound.impact(e),
  onSettled: ({ total }) => console.log(total)
})
engine.start()
engine.roll()
// ...
engine.destroy()
```

## Notas de implementación

- La física integra cuerpos rígidos: gravedad, colisión por los 8 vértices del cubo contra suelo y paredes, impulsos con restitución y fricción tangencial, e inercia isótropa del cubo. Las colisiones entre dados se aproximan con esferas y el impulso se aplica en el punto de contacto para que transmita giro.
- Paso fijo de 1/180 s con acumulador, hasta 8 subpasos por frame. El render va a la tasa del navegador.
- El tamaño del dado baja con la cantidad según `0.25·n^-0.14`, con suelo en `0.168`.
- Cada tirada reparte los dados por una rejilla barajada que cubre el tablero: se calcula el tiempo de vuelo y con él la velocidad horizontal que deja cada dado en su celda.
- Los dados no se enderezan: se detienen donde los deja la simulación, y el valor es la cara con mayor componente vertical.
- El motor limpia su `ResizeObserver` y sus listeners en `destroy()`, que el componente llama en `onBeforeUnmount`.
- Todo el dibujo es canvas 2D, así que funciona con SSR siempre que el componente se monte en cliente (`<ClientOnly>` en Nuxt).
