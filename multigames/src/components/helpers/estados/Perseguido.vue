<template>
    <div>
    <div class="modal is-active">
      <div class="modal-background" @click="this.$store.state.modalPerseguido = false"></div>
      <div class="mr-6">
        <div class="modal-card">
          <header class="modal-card-head BGPerseguido">
            <p class="modal-card-title has-text-weight-bold has-text-light">{{ textoInterfaz.titulo }}</p>
          </header>

          <!-- BOOOOOOOOOODYYYYYYYY -->
          <section class="modal-card-body px-2">
            <div class="hero-body px-1 py-3">
              <div v-if="verCartaPerseguido">
                <p class="has-text-centered">{{ textoInterfaz.descripcion }}</p>
                <p class="subtitle is-7 has-text-right mt-2">{{ textoInterfaz.expansion }}</p>
              </div>

              <div v-if="verResultadoPerseguido">
                <p class="title has-text-centered is-italic mb-2" v-if="this.$store.state.lenguaje == 'español'">{{ this.$store.state.dataPerseguido.title }}</p>
                <p class="title has-text-centered is-italic mb-2" v-if="this.$store.state.lenguaje == 'ingles'">{{ this.$store.state.dataPerseguido.ENtitle }}</p>
                <hr class="my-2 has-text-black" />
                <p class="subtitle is-6 mb-2  is-italic" v-if="this.$store.state.lenguaje == 'español'">{{ this.$store.state.dataPerseguido.narrativa }}</p>
                <p class="subtitle is-6 mb-2  is-italic" v-if="this.$store.state.lenguaje == 'ingles'">{{ this.$store.state.dataPerseguido.ENnarrativa }}</p>
                <br />
                <p class="subtitle is-6  has-text-black mb-0" v-if="this.$store.state.lenguaje == 'español'">{{ this.$store.state.dataPerseguido.descripcion }}</p>
                <p class="subtitle is-6  has-text-black mb-0" v-if="this.$store.state.lenguaje == 'ingles'">{{ this.$store.state.dataPerseguido.ENdescripcion }}</p>

                <p class="subtitle is-7 has-text-right" v-if="this.$store.state.lenguaje == 'español'">Expansion: {{ this.$store.state.dataPerseguido.expansion }}</p>
                <p class="subtitle is-7 has-text-right" v-if="this.$store.state.lenguaje == 'ingles'">Expansion: {{ this.$store.state.dataPerseguido.ENexpansion }}</p>
              </div>
            </div>
            
          </section>
          <!-- BOOOOOOOOOODYYYYYYYY -->

          <!-- FOOOOOOOOOTERRRRRRRRR -->
          <footer class="">
            <!-- FASE 1 -->
            <div v-if="verCartaPerseguido" class="field has-addons columns is-mobile is-gapless" >
              <p class="control column is-half">
                <button @click=" SeleccionarCartaPerseguido(1), (verCartaPerseguido = false), (verResultadoPerseguido = true)" class="button is-danger is-fullwidth" > {{ textoInterfaz.botones.verCarta }}</button>
              </p>

              <p class="control column is-half">
                <button @click=" (this.$store.state.EstadoPerseguido = true), (this.$store.state.modalPerseguido = false)" class="button is-link is-fullwidth">{{ textoInterfaz.botones.añadir }} </button>
              </p>
            </div>

            <!-- FASE 2 -->
            <div v-if="verResultadoPerseguido">
              <button @click="(this.$store.state.EstadoPerseguido = false), (this.$store.state.modalPerseguido = false), (verCartaPerseguido = true)" class="button is-fullwidth is-12 is-link column">{{ textoInterfaz.botones.volver }} </button>
            </div>
          </footer> <!-- End Footer -->

        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "modal estado Perseguido",
  data() {
    return {
      verCartaPerseguido: true,
      verResultadoPerseguido: false,

      textoInterfaz:{
          titulo: "",
          descripcion: "",
          expansion: "",
          botones: {
            verCarta: "",
            añadir: "",
            volver: ""
          },
        },

      CartasDePerseguido: [
        {id: 1,
          expansion: "Secretos",
          ENexpansion: "Secrets",
          title: "Desplumado",
          ENtitle: "Plucked",
          narrativa: "Tus protestas no hacen mella en el trio de imponentes rufianes. La mujer de cabello castaño y mirada severa se cruje los nhudillos y sugiere que hagas un pequeño donativo para ´ahorrarte posibles molestias´. No parece que tengas alternativa",
          ENnarrativa: "Your protests do not make a dent in the trio of imposing ruffians. The woman with brown hair and a stern gaze cracks her knuckles and suggests that you make a small donation to 'spare yourself potential trouble.' It doesn't seem like you have an alternative.",
          descripcion: "Descarta todo tu dinero, luego descarta esta carta.",
          ENdescripcion: "Discard all your money, then discard this card."
        },
        {id: 2,
          expansion: "Secretos",
          ENexpansion: "Secrets",
          title: "Agitado",
          ENtitle: "disturbed",
          narrativa: "Tras escapar de puro milagro en varias ocasiones, tienes la certeza de que no tardaran en capturarte. Cada vez que intentas achar un sue;ecito, una sombra en la pared te espabila deprisa. Cuesta mucho estar a pleno rendimiento si no logras descansar.",
          ENnarrativa: "After narrowly escaping several times, you are certain they will soon capture you. Every time you try to find a little nap, a shadow on the wall startles you awake quickly. It's hard to be at your best if you can't get some rest.",
          descripcion: "Elige una habilidad. Cuando resuelvas pruebas en las que utilice esa habilidad, tiras un dado menos. (para recordarlo tendras activo en los estados una carta de 'Agitado', elige la habilidad en la nueva carta de estado) RETRIBUCION --- Descrata el estado 'Agitado'. Este efecto no se resuelve durante la fase en la que hayas dado la vuelta a esta carta.",
          ENdescripcion: "Choose a skill. When resolving tests using that skill, roll one less die. (To remember this, you will have the 'Agitated' card active in the states; choose the skill on the new state card.) RETRIBUTION --- Discard the 'Agitated' state. This effect does not resolve during the phase in which you flipped this card."
        },
        {id: 3,
          expansion: "Secretos",
          ENexpansion: "Secrets",
          title: "Desarmado",
          ENtitle: "Unarmed",
          narrativa: "-Cuidadito, figura! No queremos que te hagas daño, sabes?. Tras un cacheo relativamente concienzudo, se aseguran de que no llevas encima nada peligroso y te dejan ir.",
          ENnarrativa: "Be careful, buddy! We don't want you to get hurt, you know? After a relatively thorough pat-down, they make sure you're not carrying anything dangerous and let you go.",
          descripcion: "Descarta un Arma que no tenga el rasgo Extraordinario. Luego descarta esta carta.",
          ENdescripcion: "Discard a weapon that does not have the Extraordinary trait. Then discard this card."
        },
        // {id: 4,
        //   expansion: "Secretos",
        //   ENexpansion: "Secrets",
        //   title: "Agresor Vengativo - Enemigo",
        //   ENtitle: "",
        //   narrativa: " 3 de vida / -0 de fuerza / -2 de observacion / 2 de Daño.",
        //   ENnarrativa: "",
        //   descripcion: " Cuando se muestra, este Mounstruo se enfrenta a ti. Si estre Mounstruo no está enfrentado a ningun investigador, descartalo.",
        //   ENdescripcion: ""
        // },
        {id: 4,
          expansion: "Secretos",
          ENexpansion: "Secrets",
          title: "Detenido",
          ENtitle: "Arrested",
          narrativa: " Balbuceas una explicacion, o como minimo una excusa, pero el tipo que te ah acorralado no da su brazo a torcer. Insiste en ´evitar que causes problemas´. Tras pasarte un buen rato esposado a una mesa y engogiendote bajo su mirada acusadora, al fin te deja libre y te marchas afrontandote la dolorida muñeca.",
          ENnarrativa: "You stammer an explanation, or at least an excuse, but the guy who cornered you won't budge. He insists on 'preventing you from causing trouble.' After spending quite some time with you handcuffed to a table and sizing you up under his accusing gaze, he finally lets you go, and you leave nursing your sore wrist.",
          descripcion: "Quedas rezagado, Luego descarta esta carta.",
          ENdescripcion: "You fall behind, then discard this card."
        },
        {id: 5,
          expansion: "Secretos",
          ENexpansion: "Secrets",
          title: "Paliza",
          ENtitle: "Beating",
          narrativa: "Cuando por fin te atrapan, hacen oidos sordos a tus palabras. Resulta que lo unico que necesitabas era un capon bien dado y un puñetazo en el estomago, acompañados de unas cuantas patadas para rematar la faena. Al cabo de un rato se marchan, dejandote en el suelo sin aliento y con un par de costillas rotas.",
          ENnarrativa: "When they finally catch you, they ignore your words. It turns out that all you needed was a well-delivered smack and a punch in the stomach, accompanied by a few kicks to finish the job. After a while, they leave, leaving you on the ground, out of breath and with a couple of broken ribs.",
          descripcion: "Sufres dos puntos de Daño. Luego descarta esta carta.",
          ENdescripcion: "You suffer two points of damage. Then discard this card."
        },
      ]
    }
  },
  methods: {
    rellenarTextoSegunIdioma(){
      if(this.$store.state.lenguaje == 'español'){
        this.textoInterfaz.titulo = "Estado: Perseguido";
        this.textoInterfaz.descripcion = "Descrata todos tus Talentos de Reputación. No puedes ganar Talentos de Reputación. RETRIBUCION -- Haz una prueba de influencia. Si fallas, dale la vuelta a esta carta. Si el resultado de la prueba es de 2 o mas, descarta esta carta.";
        this.textoInterfaz.expansion = "Expansion: Noche";

        this.textoInterfaz.botones.verCarta = "Ver carta";
        this.textoInterfaz.botones.añadir = "Añadir";
        this.textoInterfaz.botones.volver = "Volver";
      }else if(this.$store.state.lenguaje == 'ingles'){
        this.textoInterfaz.titulo = "State: Persecuted";
        this.textoInterfaz.descripcion = "Discard all your Reputation Talents. You cannot gain Reputation Talents. RETRIBUTION -- Roll a dice. If you roll a 1, flip this card. If the result of the test is 2 or more, discard this card.";
        this.textoInterfaz.expansion = "Expansion: Night";

        this.textoInterfaz.botones.verCarta = "See card";
        this.textoInterfaz.botones.añadir = "Add";
        this.textoInterfaz.botones.volver = "Volver";
      }
    },
    activarEstados(NdePacto){
      if (NdePacto.id == 2) {
        console.log("se va a activar el Perseguido 2")
        this.$store.state.estadoPerseguido_Agitado = true
      }
    },
    SeleccionarCartaPerseguido() {
      function nuevoPerseguido(NumDeCarta){
        return NumDeCarta.id == Math.floor(Math.random() * (1, 5) + 1);
      }
    let datosEncontrados = this.CartasDePerseguido.find(nuevoPerseguido);
    this.activarEstados(datosEncontrados)

    //console.log(`Se va a copiar los archivos del Perseguido ${datosEncontrados.id}`)
    this.$store.state.dataPerseguido = datosEncontrados;
    },
  },
  mounted(){
    this.rellenarTextoSegunIdioma();
  }
}
</script>

<style>
.BGPerseguido{
  background-image: url(@/assets/img/Estados/Perseguido.jpg);
  background-position: center;
  background-size: cover;
}
</style>