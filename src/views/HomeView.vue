<template>
    <div class="home">
        <barra-navegacao></barra-navegacao>

        <div class="row justify-content-center">
            <div class="col-lg-6 col-md-6 col-sm-6">
                <div v-if="!registerActive" class="card login" v-bind:class="{ error: emptyFields }">
                <fieldset>
                    <form class="form-group">
                        <h1>Início</h1>
                    </form>
                </fieldset>
            </div>
        </div>
    </div>

    </div>
</template>

<script>
// @ is an alias to /src

import LoginService from "@/services/LoginService";
import BarraNavegacao from '@/components/BarraNavegacao.vue';

export default {
    name: "HomeView",
    components: {
        BarraNavegacao
    },
    methods: {
        desloga() {
            LoginService.deslogar();
            this.$router.push(`/?d=${new Date()}`);
        },
    },
};
</script>

<style scoped>

.card {
  padding: 10px;
  /* Define o espaçamento interno */
}

</style>
