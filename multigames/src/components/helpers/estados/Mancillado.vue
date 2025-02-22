<template>
  <div class="modal is-active">
    <div class="modal-background" @click="this.$store.state.modalMancillado = false"></div>
    <div class="mr-6">
      <div class="modal-card">
        <header class="modal-card-head BGMancillado">
          <p class="modal-card-title has-text-weight-bold has-text-light">{{ textoInterfaz.titulo }}</p>
        </header>

        <section class="modal-card-body hero is-large py-2">
          <div v-if="verCartaMancillado == true">
            <h2 class="has-text-centered">{{ textoInterfaz.descripcion1 }}</h2>
            <h2 class="has-text-danger has-text-centered">{{ textoInterfaz.descripcion2 }}</h2>
            <p class="has-text-centered">{{ textoInterfaz.descripcion3 }}</p>
            <p class="subtitle is-7 has-text-right mt-2">{{ textoInterfaz.expansion }}</p>
          </div>

          <div v-if="verMancillado == true">
            <p class="subtitle is-6 mb-2  is-italic" v-if="this.$store.state.lenguaje == 'español'">{{ this.$store.state.dataMancillado.narrativa }}</p>
            <p class="subtitle is-6 mb-2  is-italic" v-if="this.$store.state.lenguaje == 'ingles'">{{ this.$store.state.dataMancillado.ENnarrativa }}</p>
            <br />
            <p class="subtitle is-6  has-text-black mb-0" style="max-width: 325px; " v-if="this.$store.state.lenguaje == 'español'">{{ this.$store.state.dataMancillado.descripcion }}</p>
            <p class="subtitle is-6  has-text-black mb-0" style="max-width: 325px; " v-if="this.$store.state.lenguaje == 'ingles'">{{ this.$store.state.dataMancillado.ENdescripcion }}</p>
            <p class="subtitle is-7 has-text-right" v-if="this.$store.state.lenguaje == 'español'">Expansion: {{ this.$store.state.dataMancillado.expansion }}</p>
            <p class="subtitle is-7 has-text-right" v-if="this.$store.state.lenguaje == 'ingles'">Expansion: {{ this.$store.state.dataMancillado.ENexpansion }}</p>
          </div>

        </section>

        <footer>
          <div v-if="verCartaMancillado == true" class="field has-addons columns is-mobile is-gapless">
            <p class="control column is-half">
              <button @click=" seleccionarMancillado(1), (verMancillado = true), (verCartaMancillado = false)" class="button is-danger is-fullwidth">{{ textoInterfaz.botones.girar }}</button>
            </p>

            <p class="control column is-half">
              <button @click="(this.$store.state.EstadoMancillado = true), (this.$store.state.modalMancillado = false)" class="button is-link is-fullwidth">{{ textoInterfaz.botones.añadir }}</button>
            </p>
          </div>

          <div v-if="verMancillado == true" class="field has-addons columns is-mobile is-gapless">
            <p class="control column">
              <button @click="(this.$store.state.modalMancillado = false), (verMancillado = false), (verCartaMancillado = true), (this.$store.state.EstadoMancillado = false)" class="button is-link is-fullwidth" >
                <p>{{ textoInterfaz.botones.volver }}</p>
              </button>
            </p>
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

        textoInterfaz:{
          titulo: "",
          descripcion1: "",
          descripcion2: "",
          descripcion3: "",
          expansion: "",
          botones: {
            quitar: "",
            añadir: "",
            volver: ""
          },
        },

        Mancillados:[
          {id: 1,
               expansion: "mareas tenebrosas",
               ENexpansion: "under dark waves",
               narrativa: "La maldad que ha arraigado en tu interior no ha hecho más que crecer con el paso del tiempo. Al principio simplemente achacabas la culpa de tus constantes infortunios a una racha de mala suerte, pero cada vez tienes más claro que hay algo en tu fuero interno boicoteando activamente tus propios esfuerzos.",
               ENnarrativa: "The evil that has taken root within you has only grown over time. At first you simply blamed your constant misfortunes on a streak of bad luck, but it is becoming clear to you that there is something inside you actively boycotting your own efforts.",
               descripcion: "Haz una tirada de VOLUNTAD y resuelve el efecto. \n0-1: Ganas una Maldición. \n2+: No hay efecto. Luego descarta esta carta.",
               ENdescripcion: "Make a roll of WILL and solve the effect.  \n0-1: You win a Curse.  \n2+: No effect. Then discard this card."},
          {id: 2,
               expansion: "mareas tenebrosas",
               ENexpansion: "under dark waves",
               narrativa: "Oyes las voces cada vez más y te tientan para que cometas atrocidades indescriptibles. Por fin te conceden una tregua piadosa a cambio de una simple promesa. Los susurros cesan, pero sabes que la presencia volverá para cobrarse lo prometido.",
               ENnarrativa: "You hear the voices more and more and they tempt you to commit unspeakable atrocities. You finally get a godly truce in exchange for a simple promise. The whispers cease, but you know that the presence will return to collect what was promised.",
               descripcion: "Haz una tirada de VOLUNTAD y resuelve el efecto. \n0-1: Ganas un Pacto Siniestro. \n2+ No hay efecto. Luego descarta esta carta.",
               ENdescripcion: "Make a roll of WILL and solve the effect.   \n0-1: You win a Sinister Pact.   \n2+ No effect. Then discard this card"},
          {id: 3,
               expansion: "mareas tenebrosas",
               ENexpansion: "under dark waves",
               narrativa: "Tu sangre mancillada atrae a los seres que se ocultan en las tinieblas con un reclamo que notas desde lo más profundo de tu ser. Esta noche, algo responde a la llamada.",
               ENnarrativa: "Your stained blood attracts the beings that hide in the darkness with a claim that you notice from the depths of your being. Tonight, something answers the call.",
               descripcion: "Haz una tirada de VOLUNTAD y resuelve el efecto correspondiente al resultado: \n0: aparece un Monstruo en tu espacio. Si se enfrenta a un investigador, el Monstruo ataca. \n1: Aparece un Monstruo en tu espacio. \n2+: No hay efecto. Luego descarta esta carta.",
               ENdescripcion: "Make a WILL spin and solve the effect corresponding to the result:  \n0: a Monster appears in your space. If you face a researcher, the Monster attacks.   \n1: A Monster appears in your space.   \n2+: No effect. Then discard this card."},
          {id: 4,
               expansion: "mareas tenebrosas",
               ENexpansion: "under dark waves",
               narrativa: "Se te nubla la vista. Ya no puedes soportar por más tiempo los impulsos y pensamientos homicidas que te atormentan. Pierdes el conocimiento. Cuando despiertas, tu ropa está manchada de sangre ... y sabes que no es tuya.",
               ENnarrativa: "Your eyes become clouded. You can no longer bear the murderous impulses and thoughts that torment you. You lose consciousness. When you wake up, your clothes are stained with blood ... and you know it’s not yours.",
               descripcion: "Haz una tirada de VOLUNTAD y resuelve el efecto correspondiente al resultado: \n0: Otro investigador de tu elección que esté situado en cualquier espacio, sufre 2 puntos de Daño y 2 puntos de Horror. \n1: Otro investigador de tu elección que esté situado en cualquier espacio, sufre 1 puntos de Daño y 1 puntos de Horror. \n2+: No hay efecto. Luego descarta esta carta. ",
               ENdescripcion: "Make a roll of WILL and solve the effect corresponding to the result:  \n0: Another researcher of your choice who is located in any space, suffers 2 damage points and 2 horror points. \n1: Another researcher of your choice that is located in any space, suffers 1 Damage points and 1 Horror points.   \n2+: No effect. Then discard this letter. "},
          {id: 5,
               expansion: "mareas tenebrosas",
               ENexpansion: "under dark waves",
               narrativa: "Al principio no eran más que simples llagas; luego se formaron las ampollas. El dolor no ha hecho más que aumentar, y ahora notas que algo se desliza bajo tu piel. Algo que quiere salir.",
               ENnarrativa: "At first they were nothing but simple sores; then the blisters formed. The pain has only increased, and now you notice something slipping under your skin. Something that wants to come out.",
               descripcion: "Haz una tirada de VOLUNTAD y resuelve el efecto correspondiente al resultado: \n0: Sufres 2 puntos de Daño y 2 puntos de Horror. \n1: Sufres 1 puntos de Daño y 1 puntos de Horror. \n2+: No hay efecto. Luego descarta esta carta. ",
               ENdescripcion: "Make a WILL spin and solve the effect corresponding to the result:  \n0: You take 2 Damage and 2 Horror points. \n1: You take 1 Damage and 1 Horror point.  \n2+: No effect. Then discard this card."},
          {id: 6,
               expansion: "mareas tenebrosas",
               ENexpansion: "under dark waves",
               narrativa: "Tus recuerdos empiezan a desvanecerse. Los únicos pensamientos que lograr retener en tu cabeza son el rumor del océano y el canto de sirena que te apremia a sumergirte bajo las olas.",
               ENnarrativa: "Your memories are beginning to fade. The only thoughts you manage to retain in your head are the sound of the ocean and the siren song that urges you to dive under the waves.",
               descripcion: "Haz una tirada de VOLUNTAD y resuelve el efecto correspondiente al resultado: \n0: Descarta un Talento. Si no puedes hacerlo, descarta todas tus fichas de concentración. \n1-2: Descarta todas tus fichas de Concentración. \n2+: No hay efecto. Luego descarta esta carta.",
               ENdescripcion: "Make a roll of WILL and solve the effect corresponding to the result:  \n0: Discard a Talent. If you cannot do so, discard all your concentration cards.  \n1-2: Discard all your Concentration cards.   \n2+: No effect. Then discard this letter."},
          {id: 7,
              expansion: "original",
              ENexpansion: "original",
              narrativa: "Mientras vas caminando por la calle inundado en tus pensamientos, sientes una fuerte dolencia en el pecho. Al abrirte la      camisa, vés un tentáculo saliendo de tu pecho, con un puñal dispuesto a clavártelo en el corazón.",
              ENnarrativa: "As you walk down the street flooded in your thoughts, you feel a strong chest ailment. When you open your shirt, you see a tentacle coming out of your chest, with a dagger ready to stab you in the heart.",
              descripcion: "Haz una tirada de 7 dados -Nºvoluntad (aqui no sirve ningun moddificador de tiradas), \nel numero de aciertos seran las veces que ha conseguido el puñal herirte, \npor lo cual, sera el numero de vidas que te tienes que quitar",
              ENdescripcion: "Make a roll of 7 dice -No will (here is no use any moddificador of rolls),  the number of hits will be the times that has got the knife hurt you,  Not which, It will be the number of lives you have to remove",
        },
        ]
      }
    },
  methods:{
    seleccionarMancillado(){
      function nuevoMancillado() {
        let numero = Math.floor(Math.random() * (0, 7));
        console.log(`Numero: ${numero}`);
        return numero;
      }
     
      let dartosEncontrados = this.Mancillados[nuevoMancillado()];
      console.log(`Seleccionamos el mancillado ${dartosEncontrados.id}`)
      // asignarNuevoEstado();
      this.$store.state.dataMancillado.expansion = dartosEncontrados.expansion;
      this.$store.state.dataMancillado.narrativa = dartosEncontrados.narrativa;
      this.$store.state.dataMancillado.descripcion = dartosEncontrados.descripcion;
      this.$store.state.dataMancillado.ENexpansion = dartosEncontrados.ENexpansion;
      this.$store.state.dataMancillado.ENnarrativa = dartosEncontrados.ENnarrativa;
      this.$store.state.dataMancillado.ENdescripcion = dartosEncontrados.ENdescripcion;

    },
    rellenarTextoSegunIdioma(){
      if(this.$store.state.lenguaje == 'español'){
        this.textoInterfaz.titulo = "Estado: Mancillado";
        this.textoInterfaz.descripcion1 = "Después de que robes una ficha de Mitos vacía o con una aparición de Pista, coloca una ficha de Perdición en tu espacio.";
        this.textoInterfaz.descripcion2 = "RETRIBUCIÓN - Dale la vuelta a la carta.";
        this.textoInterfaz.descripcion3 = "No mires el reverso de la carta hasta que se te indique";
        this.textoInterfaz.expansion = "Expansion: Mareas Tenebrosas";
        this.textoInterfaz.botones.girar = "Darle la vuelta a la carta";
        this.textoInterfaz.botones.añadir = "Añadir";
        this.textoInterfaz.botones.volver = "Volver";
      }else if(this.$store.state.lenguaje == 'ingles'){
        this.textoInterfaz.titulo = "State: Defiled";
        this.textoInterfaz.descripcion1 = "After you steal an empty Myths tab or with a Clue appearance, place a Doom tab in your space.";
        this.textoInterfaz.descripcion2 = "RETRIBUTION - Turn the letter around.";
        this.textoInterfaz.descripcion3 = "Don’t look at the back of the card until instructed";
        this.textoInterfaz.expansion = "Expansion: Under Dark Waves";
        this.textoInterfaz.botones.girar = "Turn around the card";
        this.textoInterfaz.botones.añadir = "Add";
        this.textoInterfaz.botones.volver = "Go back";
      }
    }
    // asignarNuevoEstado(){...}
  },
  mounted(){
    this.rellenarTextoSegunIdioma();
  }
};
</script>
<style>
/* pre{} */

.BGMancillado{
  background-image: url(@/assets/img/Estados/Mancillado.jpg);
  background-position: center;
  background-size: cover;
}
</style>