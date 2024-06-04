<template>
  <barra-navegacao></barra-navegacao>

  <div class="cadastro">
    <div class="row justify-content-center"> <!-- Centraliza o conteúdo horizontalmente -->
      <!-- Coluna responsiva -->
      <div class="col-lg-9 col-md-6 col-sm-8"> <!-- Ajusta o tamanho da coluna em diferentes dispositivos -->
        <!-- Card de login -->
        <div v-if="!registerActive" class="card login" v-bind:class="{ error: emptyFields }">

          <h1>Usuários:</h1>

          <fieldset>
            <legend>Cadastro:</legend>
            <form class="form-group">

              <!--<p><label>Login</label><input type="text" v-model="user.login" /></p>-->
              <input v-model="user.login" type="login" class="form-control" placeholder="Login" required>
              <p></p>
              <input v-model="user.senha" type="senha" class="form-control" placeholder="Senha" required>
              <!--<p><label>Senha</label><input type="password" v-model="user.senha" /></p>-->
              <p></p>
              <p><button class="btn btn-primary salvar-btn" @click="salvar">Salvar</button></p>
            </form>
          </fieldset>

          <table class="table table-dark table-striped">
            <thead>
              <tr>
                <th>Id:</th>
                <th>Login:</th>
                <th>Permissões:</th>
              </tr>
            </thead>
            <tbody class="table-group-divider">
              <tr v-for="(u, i) in usuarios" v-bind:key="i" @click="abreEdit(u.id)">
                <td>{{ u.id }}</td>
                <td>{{ u.login }}</td>
                <td>{{ u.permissoes.length }}</td>
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

export default {
  components: {
    BarraNavegacao,
  },
  data() {
    return {
      usuarios: [],
      user: {
        login: null,
        senha: null,
      },
    };
  },
  mounted() {
    console.log(AuthService.dados.token);
    this.getUsuarios();
  },
  methods: {
    async getUsuarios() {
      try {
        let r = await fetch("http://localhost:8080/users", {
          method: "GET",
          headers: { Authorization: `Bearer ${AuthService.dados.token}` },
        });
        r.json().then((j) => {
          this.usuarios = j;
        });
      } catch (ex) {
        console.log("ERRO", ex);
      }
    },
    async salvar() {
      this.user.permissoes = ["ROLE_USER"];
      console.log(JSON.stringify(this.user));
      if (this.user.login != null && this.user.senha != null) {
        fetch("http://localhost:8080/users", {
          method: "POST",
          body: JSON.stringify(this.user),
          headers: {
            Authorization: `Bearer ${AuthService.dados.token}`,
            "Content-Type": "application/json",
          },
        })
          .then((r) => {
            if (r.status != 200 || r.status != 201) {
              r.json().then((j) => {
                console.log("ERRO", j);
              });
            }
            this.getUsuarios();
          })
          .catch((e) => {
            console.log("ERRO", e);
          });
      }
    },
    abreEdit(id) {
      this.$router.push(`/usuarios/${id}`);
    },
  },
};
</script>

<style scoped>

.card {
  padding: 20px;
  /* Define o espaçamento interno */
}

.form-control {
  width: 40%;
  /* Ajuste a largura conforme necessário */
  height: 30px;
  /* Ajuste a altura conforme necessário */
  font-size: 0.9em;
  /* Ajuste o tamanho da fonte conforme necessário */
  margin-left: 10px;
  /* Ajuste a margem à esquerda conforme necessário */
}


.form-group {

  /* Estilos para inputs dentro do form-group */
  input {
    margin-bottom: 20px !important;
    /* Define a margem inferior */
    border-radius: 10px !important;
    /* Define o arredondamento dos cantos */
  }
}

.cadastro {
  align-items: center;
  /* Centraliza verticalmente os itens */
  display: flexbox;
  /* Define um layout flexível */

}

.salvar-btn {
  margin-left: 10px;
  /* Ajuste a margem à esquerda conforme necessário */
  width: 8%;
  /* Ajuste a largura conforme necessário */
  height: 35px;
  /* Ajuste a altura conforme necessário */
  font-size: 1em;
  /* Ajuste o tamanho da fonte conforme necessário */
  box-shadow: 1px 2px 1px 1px rgba(0, 0, 0, 0.745) !important;
}

.salvar-btn:hover {
  color: black;
  background-color: rgb(40, 232, 6);
}

table * {
  border: solid 1px black;
}

table tbody tr {
  cursor: pointer;
}

fieldset input[type="text"] {
  border: solid 1px blue;
}

fieldset input[type="password"] {
  border: solid 1px blue;
}

fieldset button {
  border: solid 1px blue;
}
</style>