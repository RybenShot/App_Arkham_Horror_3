<template>
  <div class="modal is-active">
    <div class="modal-background"></div>
    <div class="mr-6">
      <div class="modal-card">
        <header class="modal-card-head BGMaldicion">
          <p class="modal-card-title has-text-light">Estado: MANCILLADO</p>
        </header>
        <section class="modal-card-body hero is-large py-2">
          <h2 class="has-text-centered">Despues de que robes una fichad e Mitos vacía o con una aparición de Pista, coloca una ficha de Perdición en tu espacio.</h2>
          <h2 class="has-text-danger has-text-centered">RETRIBUCIÓN - Dale la vuelta a la carta.</h2>
          <p class="has-text-centered">No mires el reverso de la carta hasta que se te indique</p>
        </section>
        <footer class="modal-card-foot">
          <!-- <button @click="(EstadoMaldito = false), this.Maldito()" class="button column is-3 is-danger p-1"> Descartar </button> -->
          <button
            @click="cerrarModal(false)"
            class="button column is-3 is-link p-1"
          >
            Volver
          </button>
        </footer>
      </div>
    </div>
  </div>
</template>

<script>
export default {
    name:"EstadoMaldicion",
    data(){
      return{
        Mancillados:[
          {id: 1,
               expansion: "mareas tenebrosas",
               narrativa: "La maldad que ha arraigado en tu interior no ha echo mas que crecer con el paso del tiempo. Al principio simplemente achacabas la culpa de tus constantes infortunios a una racha de mala suerte, pero cada vez tienes más claro que hay algo en tu fuero interno boicoteando activamente tus propios esfuerzos.",
               descripcion: "Haz una tirada de VOLUNTAD y resuelve el efecto. 0-1: Ganas una Maldición. 2+: No hay efecto. Luego descarta esta carta."},
          {id: 2,
               expansion: "mareas tenebrosas",
               narrativa: "Oyes las voces cada vez más y te tientan para que cometas atrocidades indescriptibles. Por fin te conceden na tregua piadosa a cambio de na simple promesa. Los susurros cesan, pero sabes que la presencia volvera para cobrarse lo prometido.",
               descripcion: "Haz una tirada de VOLUNTAD y resuelve el efecto. 0-1: Ganas un Pacto Siniestro. 2+ No hay efecto. Luego descarta esta carta."},
          {id: 3,
               expansion: "mareas tenebrosas",
               narrativa: "Tu sangre mancillada atrae a los seres que se ocultan en las tinieblas con un reclamoq ue notas desde los más profundo de tu ser. Esta noche, algo responde a la llamada.",
               descripcion: "Haz una tirada de VOLUNTAD y resuelve el efecto correspondiente al resultado: 0: aparece un Monstruo en tu espacio. Si se enfrenta a un investigador, el Monstruo ataca. 1: Aparece un Monstruo en tu espacio. 2+: No hay efecto. Luego descarta esta carta."},
          {id: 4,
               expansion: "mareas tenebrosas",
               narrativa: "Se te nubla la vista. Ya no puedes soportar por más tiepo los impulsos y pensamientos homicidas que te atormentan. Pierdes el conocimiento. Cuando despiertas, tu ropa está manchada de sangre ... y sabes que no es tuya.",
               descripcion: "Haz una tirada de VOLUNTAD y resuelve el efecto correspondiente al resultado: 0: Otro investigador de tu elección que esté situado en cualquier espacio, sufre 2 puntos de Daño y 2 puntos de Horror. 1: Otro investigador de tu elección que esté situado en cualquier espacio, sufre 1 puntos de Daño y 1 puntos de Horror. 2+: No hay efecto. Luego descarta esta carta. "},
          {id: 5,
               expansion: "mareas tenebrosas",
               narrativa: "Al principio no erasn ás que simples llagas; luego se formaron las ampollas. El dolor no ha hecho más que aumentar, y ahora notas que algo se desliza bajo tu piel. Algo que quiere salir.",
               descripcion: "Haz una tirada de VOLUNTAD y resuelve el efecto correspondiente al resultado: 0: Sufres 2 puntos de Daño y 2 puntos de Horror. 1: Sufres 1 puntos de Daño y 1 puntos de Horror. 2+: No hay efecto. Luego descarta esta carta. "},
          {id: 6,
               expansion: "mareas tenebrosas",
               narrativa: "Tus recuerdos empiezan a desvanecerse. Los únicos pensamientos que lograr retener en tu cabeza son el rumor del océano y el canto de sirena que te apremia a sumergirte bajo las olas.",
               descripcion: "Haz una tirada de VOLUNTAD y resuelve el efecto correspondiente al resultado: 0: Descarta un Talento. Si no puedes hacerlo, descarta todas tus fichas de concentración. 1-2: Descarta todas tus fichas de Concentración. 2+: No hay efecto. Luego descarta esta carta."}
        ]
      }
    },
  methods:{
    cerrarModal(valueVistaModalMancillado){
      this.$emit("cerrarModalHijoMancillado", valueVistaModalMancillado)
    }
  }
};
</script>

<style>
.BGMaldicion{
  background-image: url(@/assets/img/Estados/Mancillado.jpg);
  background-position: center;
  background-size: cover;
}
</style>