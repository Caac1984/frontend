<template>
    <barra-navegacao></barra-navegacao>

    <div class="cadastro">
        <div class="row justify-content-center"> <!-- Centraliza o conteúdo horizontalmente -->
            <!-- Coluna responsiva -->
            <div class="col-lg-6 col-md-6 col-sm-8"> <!-- Ajusta o tamanho da coluna em diferentes dispositivos -->
                <!-- Card de login -->
                <div v-if="!registerActive" class="card login" v-bind:class="{ error: emptyFields }">
                    <h1>Usuário:</h1>
                    <fieldset v-if="usuario != null">
                        <legend>Dados do usuário:</legend>
                        <p>Login: {{ usuario.login }}</p>
                        <p>Permissões:</p>
                        <textarea v-model="usuario.permissoes"></textarea>
                        <hr />
                        <button class="btn btn-primary salvar-btn1" @click="atualizaUsuario">Atualiza</button> 
                        <button class="btn btn-primary salvar-btn2" @click="excluiUsuario">Excluir</button>
                        <p></p>
                    </fieldset>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import BarraNavegacao from "@/components/BarraNavegacao.vue";
import AuthService from "@/services/AuthService";
//import UtilService from "@/services/UtilService";

import axios from "axios";

export default {
    components: {
        BarraNavegacao,
    },
    data() {
        return {
            usuario: null,
        };
    },
    mounted() {
        this.getUsuario(this.$route.params.id);
    },
    methods: {
        getUsuario(id) {
            axios({
                method: "GET",
                url: `http://localhost:8080/users/${id}`,
            }).then((r) => {
                this.usuario = r.data;
            });
        },
        atualizaUsuario() {
            if (typeof this.usuario.permissoes == "string") {
                this.usuario.permissoes = this.usuario.permissoes.split(",");
            }
            axios({
                method: "PUT",
                url: `http://localhost:8080/users/${this.usuario.id}`,
                headers: {
                    Authorization: `Bearer ${AuthService.dados.token}`,
                    "Content-Type": "application/json",
                },
                data: JSON.stringify(this.usuario),
            }).then((r) => {
                console.log(r);
                this.$router.push("/usuarios")
            });
        },
        excluiUsuario() {
            axios({
                method: "DELETE",
                url: `http://localhost:8080/users/${this.usuario.id}`,
                headers: {
                    Authorization: `Bearer ${AuthService.dados.token}`,
                    "Content-Type": "application/json",
                },
            }).then((r) => {
                console.log(r);
                this.$router.push("/usuarios")
            });
        },
    },
};
</script>

<style scoped>
.card {
  padding: 20px;
  /* Define o espaçamento interno */
}

fieldset {
  border: 2px solid blue; /* Ajuste a borda conforme necessário */
  padding: 20px; /* Ajuste o espaçamento interno conforme necessário */
  border-radius: 10px; /* Ajuste o arredondamento dos cantos conforme necessário */
  margin-top: 20px; /* Ajuste a margem superior conforme necessário */
}

legend {
  font-size: 1.2em; /* Ajuste o tamanho da fonte conforme necessário */
  font-weight: bold; /* Deixe o texto em negrito */
}

textarea {
  width: 100%; /* Faz com que o textarea ocupe a largura total */
  height: 100px; /* Ajuste a altura conforme necessário */
  margin-top: 10px; /* Ajuste a margem superior conforme necessário */
  border-radius: 5px; /* Ajuste o arredondamento dos cantos conforme necessário */
  padding: 10px; /* Ajuste o espaçamento interno conforme necessário */
}

button {
  margin: 0 10px; /* Ajuste a margem conforme necessário */
  box-shadow: 1px 2px 1px 1px rgba(0, 0, 0, 0.745) !important;
}

.salvar-btn1:hover {
  color: black;
  background-color: yellow;
}

.salvar-btn2:hover {
  color: black;
  background-color: rgb(255, 21, 0);
}

.salvar-btn1, .salvar-btn2 {
  margin-top: 10px; /* Ajuste a margem superior conforme necessário */
  width: 20%; /* Ajuste a largura conforme necessário */
  height: 40px; /* Ajuste a altura conforme necessário */
  font-size: 1em; /* Ajuste o tamanho da fonte conforme necessário */
}
</style>