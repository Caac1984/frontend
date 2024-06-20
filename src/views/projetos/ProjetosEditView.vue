<template>
  <barra-navegacao></barra-navegacao>

  <div class="projetoedit">
    <div class="row g-0 justify-content-center">
      <div class="col-lg-6 col-md-6 col-sm-8">
        <div v-if="projeto" class="card login" :class="{ error: emptyFields }">
          <h1>Projeto:</h1>
          <fieldset>
            <legend>Edição do Projeto:</legend>
            <form @submit.prevent="atualizaProjeto">
              <div class="row gx-3 gy-2 align-items-center p-2">
                <div class="col-sm-4 form-group">
                  <label>Descrição</label>
                  <input v-model="projeto.descricao" type="text" class="form-control" />
                </div>
                <div class="col-sm-4 form-group">
                  <label>Professor Representante</label>
                  <input v-model="projeto.professorRepresentante" type="text" class="form-control" />
                </div>
              </div>
              <div class="d-grid gap-2 d-md-block bots">
                  <button type="submit" class="btn btn-danger atualizar me-2">Atualizar</button>
                  <button class="btn btn-primary voltar" @click="voltar">Voltar</button>
              </div>
            </form>
          </fieldset>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
import BarraNavegacao from "@/components/BarraNavegacao.vue";
import AuthService from "@/services/AuthService";
import axios from "axios";

export default {
  components: {
    BarraNavegacao,
  },
  data() {
    return {
      projeto: null,
      emptyFields: false,
    };
  },
  mounted() {
    console.log(this.$route.params.id);
    this.getProjeto(this.$route.params.id);
  },
  methods: {
    getProjeto(id) {
      axios({
        method: "GET",
        url: `http://localhost:8080/projetos/${id}`,
        headers: { Authorization: `Bearer ${AuthService.dados.token}` },
      })
        .then((r) => {
          this.projeto = r.data;
        })
        .catch((error) => {
          console.error("Erro ao carregar projeto:", error);
        });
    },
    atualizaProjeto() {
      if (!this.projeto.descricao || !this.projeto.professorRepresentante) {
        this.emptyFields = true;
        return;
      }
      this.emptyFields = false;

      axios({
        method: "PUT",
        url: `http://localhost:8080/projetos/${this.projeto.id}`,
        headers: {
          Authorization: `Bearer ${AuthService.dados.token}`,
          "Content-Type": "application/json",
        },
        data: this.projeto,
      })
        .then((r) => {
          console.log("Projeto atualizado:", r.data);
          this.$router.push("/projetos");
        })
        .catch((error) => {
          console.error("Erro ao atualizar projeto:", error);
        });
    },
    voltar() {
      this.$router.go(-1);
    },
  },
};
</script>


<style scoped>
.card {
  padding: 20px;
}

fieldset {
  border: 2px solid rgb(0, 0, 0);
  padding: 20px;
  border-radius: 10px;
  margin-top: 20px;
}

legend {
  font-size: 1.2em;
  font-weight: bold;
}

textarea {
  width: 100%;
  height: 100px;
  margin-top: 10px;
  border-radius: 5px;
  padding: 10px;
}

button {
  box-shadow: 1px 2px 1px 1px rgba(0, 0, 0, 0.745) !important;
}

.atualizar:hover {
  color: black;
}

.voltar:hover {
  color: black;
}

.menu-drop select {
  font-size: 0.9em;
  margin-left: 10px;
  width: 49%;
}

@media only screen and (max-width: 768px) {
  .menu-drop select {
    width: 100%;
  }
}

.table * {
  border: solid 1px black;
}

@media only screen and (max-width: 768px) {
  .menu-drop select {
    width: 100%;
  }

  .card {
    padding: 10px;
  }

  fieldset {
    padding: 10px;
  }

  button {
    width: 100%;
    margin-top: 10px;
  }
}

</style>
