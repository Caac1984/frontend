<template>
    <div class="about">
        <barra-navegacao></barra-navegacao>

        <div class="row g-0 justify-content-center">
            <div class="col-lg-6 col-md-6 col-sm-6">
                <div v-if="!registerActive" class="card login" v-bind:class="{ error: emptyFields }">
                    <fieldset>
                        <form class="form-group">
                            
                            <p class="fs-4">Alunos:</p>
                            <hr>
                            <table class="table table-primary table-striped">
                                <thead class="table-dark">
                                    <tr>
                                        <th>Nome:</th>
                                        <th>Participação:</th>
                                    </tr>
                                </thead>
                                <tbody class="table-group-divider">
                                    <tr v-for="(aluno, index) in usuarios" :key="index">
                                        <td>{{ aluno.nome }}</td>
                                        <td>{{ aluno.participacao }}</td>
                                    </tr>
                                </tbody>
                            </table>
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
    data() {
        return {
            usuarios: [
                { nome: 'Alexander', participacao: 'Integração de sistema' },
                { nome: 'Carlos', participacao: 'FrontEnd' },
                { nome: 'Hebert', participacao: 'BackEnd' },
            ],
        };
    },
};
</script>

<style scoped>
.card {
    padding: 10px;
    /* Define o espaçamento interno */
}

.table-dark {
    background-color: blue;
}
</style>
