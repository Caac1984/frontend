<template>
    <div class="about">
        <barra-navegacao></barra-navegacao>

        <div class="row g-0 justify-content-center">
            <div class="col-lg-6 col-md-6 col-sm-6">
                <div v-if="!registerActive" class="card login" v-bind:class="{ error: emptyFields }">
                <fieldset>
                    <form class="form-group">
                        <h1>Sobre</h1>
                        <p class="fs-4">(Descrição)</p>
                        <p class="fs-4">Alunos:</p>
                        <p class="fs-6">Alexander - Integração de sistema</p>
                        <p class="fs-6">Carlos - FrontEnd</p>
                        <p class="fs-6">Hebert - BackEnd</p>
                    </form>
                </fieldset>
            </div>
        </div>
    </div>

    </div>
</template>
<script>
import BarraNavegacao from "@/components/BarraNavegacao.vue";
export default {
 components: {
  BarraNavegacao,
 },
};
</script>

<style scoped>

.card {
  padding: 10px;
  /* Define o espaçamento interno */
}

</style>