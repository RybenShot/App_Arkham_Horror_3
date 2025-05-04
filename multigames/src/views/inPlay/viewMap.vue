<template>

    <basicDataMap/>
    <hr class="my-2">


    <div v-if="this.$store.state.StoreReservaDeMitos == true"><ReservaDeMitos/></div>
    <div v-if="this.$store.state.StoreAjustesPlay == true"><AjustesPlay/></div>
</template>

<script>
import basicDataMap from "@/components/inPlay/map/basicDataMap.vue";

import ReservaDeMitos from "@/components/inPlay/map/ReservaDeMitosPlay.vue";
import AjustesPlay from "@/components/inPlay/AjustesPlay.vue";


import { apiService } from '@/services/api.js';


export default {
    name: "viewinPlayMap",
    components:{
        basicDataMap,

        ReservaDeMitos,
        AjustesPlay,
    },
    methods:{

    },
    mounted(){

    },
}
</script>