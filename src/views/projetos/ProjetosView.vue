<template>
  <barra-navegacao></barra-navegacao>

  <div class="projetos">
    <div class="row g-0 justify-content-center"> <!-- Centraliza o conteúdo horizontalmente -->
      <!-- Coluna responsiva -->
      <div class="col-lg-9 col-md-6 col-sm-8"> <!-- Ajusta o tamanho da coluna em diferentes dispositivos -->
        <!-- Card de login -->
        <div v-if="!registerActive" class="card login" v-bind:class="{ error: emptyFields }">

          <h1>Projetos:</h1>

          <fieldset>
            <legend>Cadastro:</legend>
            <form @submit.prevent="salvar">
              <div class="row gx-3 gy-2 align-items-center p-2">
                <div class="col-sm-4">
                  <input v-model="projeto.descricao" type="text" class="form-control" placeholder="Projeto" required>
                </div>
                <div class="col-sm-4">
                  <input v-model="projeto.professorRepresentante" type="text" class="form-control"
                    placeholder="Professor" required>
                </div>
              </div>
              <div class="row gx-3 gy-2 col-sm-2 align-items-center p-3">
                <p><button type="submit" class="btn btn-primary">Salvar</button></p>
              </div>
            </form>
          </fieldset>
          <table class="table table-dark table-striped">
            <thead>
              <tr>
                <th>Projeto:</th>
                <th>Professor:</th>
                <th>Editar dados:</th>
              </tr>
            </thead>
            <tbody class="">
              <tr v-for="(u, i) in projetos" v-bind:key="i">
                <td>{{ u.descricao }}</td>
                <td>{{ u.professorRepresentante }}</td>
                <td align="center">
                  <button class="btn btn-primary editar me-2" @click="abreEdit(u.id)">Editar</button>
                  <button class="btn btn-danger excluir" @click.prevent="excluiUsuario(u.id)">Excluir</button>
                </td>
              </tr>
            </tbody>
          </table>
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
      projetos: [],
      projeto: {
        descricao: "",
        professorRepresentante: "",
      },
    };
  },

  mounted() {
    console.log(AuthService.dados.token);
    this.getProjetos();
  },

  methods: {
    async getProjetos() {
      try {
        const response = await axios.get("http://localhost:8080/projetos", {
          headers: { Authorization: `Bearer ${AuthService.dados.token}` },
        });
        this.projetos = response.data;
      } catch (ex) {
        console.log("ERRO", ex);
      }
    },

    async salvar() {
      try {
        const response = await axios.post("http://localhost:8080/projetos",
        this.projeto, {
          headers: {
            Authorization: `Bearer ${AuthService.dados.token}`,
            "Content-Type": "application/json",
          },
        });
        if (response.status === 200 || response.status === 201) {
          this.getProjetos();
          this.projeto.descricao = ""; // ajuste para após salvar voltar o input em branco
          this.projeto.professorRepresentante = "";  // ajuste para após salvar voltar o input em branco
        } else {
          console.log("Erro ao salvar projeto:", response.data);
        }
      } catch (error) {
        console.log("Erro ao salvar projeto:", error);
      }
    },

    abreEdit(id) {
      this.$router.push(`/projetos/${id}`);
    },

    async excluiUsuario(id) {
      try {
        const response = await axios.delete(`http://localhost:8080/projetos/${id}`, {
          headers: {
            Authorization: `Bearer ${AuthService.dados.token}`,
          },
        });
        if (response.status === 200) {
          this.getProjetos();
        } else {
          console.log("ERRO", response.data);
        }
      } catch (e) {
        console.log("ERRO", e);
      }
    },
  },
};
</script>

<style scoped>
th,
td {
  text-align: center;
}

.card {
  padding: 20px;
  /* Define o espaçamento interno */
}

.form-control {
  /* Ajuste a largura conforme necessário */
  height: 30px;
  /* Ajuste a altura conforme necessário */
  font-size: 0.9em;
  /* Ajuste o tamanho da fonte conforme necessário */
  margin-left: 10px;
  /* Ajuste a margem à esquerda conforme necessário */
}

button {
  /* Ajuste o tamanho da fonte conforme necessário */
  box-shadow: 1px 2px 1px 1px rgba(0, 0, 0, 0.745) !important;
}

button:hover {
  color: black;
}

table * {
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
