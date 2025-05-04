<template>
    <!-- Parte superior, datos del personaje, nombre, vida y eso -->
    <DatosBasicosPlay/>
    <hr class="my-2">

    <div v-if="this.$store.state.StoreTiradorDados == true"><TiradorDados/></div>
    <div v-if="this.$store.state.StoreUbicationPlayer == true"><UbicationPlayer/></div>
    <div v-if="this.$store.state.StoreEstadosPlay == true"><EstadosPlay/></div>
    <div v-if="this.$store.state.StoreHabilidades == true"><HabilidadesPlay/></div>
    <div v-if="this.$store.state.StoreAjustesPlay == true"><AjustesPlay/></div>
</template>

<script>
import DatosBasicosPlay from "@/components/inPlay/player/DatosBasicosPlay.vue";

import TiradorDados from "@/components/inPlay/player/TiradorDadosPlay.vue";
import UbicationPlayer from "@/components/inPlay/player/UbicationPlayer.vue";
import EstadosPlay from "@/components/inPlay/player/EstadosPlay.vue";
import HabilidadesPlay from "@/components/inPlay/player/HabilidadesPlay.vue";
import AjustesPlay from "@/components/inPlay/AjustesPlay.vue";

import { apiService } from '@/services/api.js';


export default {
    name: "viewinPlayPlayer",
    components:{
        DatosBasicosPlay,

        TiradorDados,
        UbicationPlayer,
        EstadosPlay,
        HabilidadesPlay,
        AjustesPlay,
    },
    methods:{

    },
    mounted(){

    },
}
</script>