<template>
  <div class="modal is-active">
    <div class="modal-background"></div>
    <div class="mr-6">
      <div class="modal-card">
        <header class="modal-card-head BGMancillado">
          <p class="modal-card-title has-text-light">Estado: MANCILLADO</p>
        </header>

        <section class="modal-card-body hero is-large py-2">
          <div v-if="verCartaMancillado == true">
            <h2 class="has-text-centered">Después de que robes una ficha de Mitos vacía o con una aparición de Pista, coloca una ficha de Perdición en tu espacio.</h2>
            <h2 class="has-text-danger has-text-centered">RETRIBUCIÓN - Dale la vuelta a la carta.</h2>
            <p class="has-text-centered">No mires el reverso de la carta hasta que se te indique</p>
          </div>

          <div v-if="verMancillado == true">
            <p class="subtitle is-6 mb-2  is-italic">{{ this.$store.state.dataMancillado.narrativa }}</p>
            <br />
            <p class="subtitle is-6  has-text-black mb-0" style="max-width: 325px; ">{{ this.$store.state.dataMancillado.descripcion }}</p>
            <p class="subtitle is-7 has-text-right">Expansion: {{ this.$store.state.dataMancillado.expansion }}</p>
          </div>
          
        </section>

        <footer class="">
          <div v-if="verCartaMancillado == true" class="field has-addons columns is-mobile is-gapless">
            <p class="control column is-half"><button @click=" seleccionarMancillado(1), (verMancillado = true), (verCartaMancillado = false)" class="button is-danger is-fullwidth">Darle la vuelta a la carta</button></p>
            <p class="control column is-half"><button @click="(this.$store.state.modalMancillado = false)" class="button is-link is-fullwidth">Aun no</button></p>
          </div>

          <div v-if="verMancillado == true" class="field has-addons columns is-mobile is-gapless">
            <p class="control column"><button @click="(this.$store.state.modalMancillado = false), (verMancillado = false), (verCartaMancillado = true), (this.$store.state.EstadoMancillado = false)" class="button is-link is-fullwidth">Volver</button></p>
          </div>
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
        verCartaMancillado:true,
        verMancillado:false,
        Mancillados:[
          {id: 1,
               expansion: "mareas tenebrosas",
               narrativa: "La maldad que ha arraigado en tu interior no ha hecho más que crecer con el paso del tiempo. Al principio simplemente achacabas la culpa de tus constantes infortunios a una racha de mala suerte, pero cada vez tienes más claro que hay algo en tu fuero interno boicoteando activamente tus propios esfuerzos.",
               descripcion: "Haz una tirada de VOLUNTAD y resuelve el efecto. \n0-1: Ganas una Maldición. \n2+: No hay efecto. Luego descarta esta carta."},
          {id: 2,
               expansion: "mareas tenebrosas",
               narrativa: "Oyes las voces cada vez más y te tientan para que cometas atrocidades indescriptibles. Por fin te conceden una tregua piadosa a cambio de una simple promesa. Los susurros cesan, pero sabes que la presencia volverá para cobrarse lo prometido.",
               descripcion: "Haz una tirada de VOLUNTAD y resuelve el efecto. \n0-1: Ganas un Pacto Siniestro. \n2+ No hay efecto. Luego descarta esta carta."},
          {id: 3,
               expansion: "mareas tenebrosas",
               narrativa: "Tu sangre mancillada atrae a los seres que se ocultan en las tinieblas con un reclamo que notas desde lo más profundo de tu ser. Esta noche, algo responde a la llamada.",
               descripcion: "Haz una tirada de VOLUNTAD y resuelve el efecto correspondiente al resultado: \n0: aparece un Monstruo en tu espacio. Si se enfrenta a un investigador, el Monstruo ataca. \n1: Aparece un Monstruo en tu espacio. \n2+: No hay efecto. Luego descarta esta carta."},
          {id: 4,
               expansion: "mareas tenebrosas",
               narrativa: "Se te nubla la vista. Ya no puedes soportar por más tiempo los impulsos y pensamientos homicidas que te atormentan. Pierdes el conocimiento. Cuando despiertas, tu ropa está manchada de sangre ... y sabes que no es tuya.",
               descripcion: "Haz una tirada de VOLUNTAD y resuelve el efecto correspondiente al resultado: \n0: Otro investigador de tu elección que esté situado en cualquier espacio, sufre 2 puntos de Daño y 2 puntos de Horror. \n1: Otro investigador de tu elección que esté situado en cualquier espacio, sufre 1 puntos de Daño y 1 puntos de Horror. \n2+: No hay efecto. Luego descarta esta carta. "},
          {id: 5,
               expansion: "mareas tenebrosas",
               narrativa: "Al principio no eran más que simples llagas; luego se formaron las ampollas. El dolor no ha hecho más que aumentar, y ahora notas que algo se desliza bajo tu piel. Algo que quiere salir.",
               descripcion: "Haz una tirada de VOLUNTAD y resuelve el efecto correspondiente al resultado: \n0: Sufres 2 puntos de Daño y 2 puntos de Horror. \n1: Sufres 1 puntos de Daño y 1 puntos de Horror. \n2+: No hay efecto. Luego descarta esta carta. "},
          {id: 6,
               expansion: "mareas tenebrosas",
               narrativa: "Tus recuerdos empiezan a desvanecerse. Los únicos pensamientos que lograr retener en tu cabeza son el rumor del océano y el canto de sirena que te apremia a sumergirte bajo las olas.",
               descripcion: "Haz una tirada de VOLUNTAD y resuelve el efecto correspondiente al resultado: \n0: Descarta un Talento. Si no puedes hacerlo, descarta todas tus fichas de concentración. \n1-2: Descarta todas tus fichas de Concentración. \n2+: No hay efecto. Luego descarta esta carta."},
          {id: 7,
              expansion: "original",
              narrativa: "Mientras vas caminando por la calle inundado en tus pensamientos, sientes una fuerte dolencia en el pecho. Al abrirte la      camisa, vés un tentáculo saliendo de tu pecho, con un puñal dispuesto a clavártelo en el corazón.",
              descripcion: "Haz una tirada de 7 dados -Nºvoluntad (aqui no sirve ningun moddificador de tiradas), \nel numero de aciertos seran las veces que ha conseguido el puñal herirte, \npor lo cual, sera el numero de vidas que te tienes que quitar",
        },
        ]
      }
    },
  methods:{
    seleccionarMancillado(){
      function nuevoMancillado(NumMancillado) {
        return NumMancillado.id == Math.floor(Math.random() * (0, 8)) + 1;
      }
     
      let dartosEncontrados = this.Mancillados.find(nuevoMancillado);
      console.log(`Seleccionamos el mancillado ${dartosEncontrados.id}`)
      // asignarNuevoEstado();
      this.$store.state.dataMancillado.expansion = dartosEncontrados.expansion;
      this.$store.state.dataMancillado.narrativa = dartosEncontrados.narrativa;
      this.$store.state.dataMancillado.descripcion = dartosEncontrados.descripcion;
    },
    // asignarNuevoEstado(){

    // }
  }
};
</script>
<style>
pre{
  
}

.BGMancillado{
  background-image: url(@/assets/img/Estados/Mancillado.jpg);
  background-position: center;
  background-size: cover;
}
</style>