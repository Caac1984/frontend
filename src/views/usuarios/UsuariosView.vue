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
            <form class="row g-3 ">
              <fieldset class="p-3 col-sm-12 col-md-9">
                <!--<p><label>Login</label><input type="text" v-model="user.login" /></p>-->
                <div class="row">
                  <div class="col-md-6">
                    <input v-model="user.login" type="login" class="form-control" placeholder="Login" required>
                    <p></p>
                  </div>
                  <div class="col-md-6">
                    <input v-model="user.senha" type="senha" class="form-control" placeholder="Senha" required>
                    <p></p>
                  </div>
                </div>
                <div class="row g-3 ">
                  <div class="col-md-6">
                    <input v-model="user.nome" type="text" class="form-control" placeholder="Nome" required>
                    <p></p>
                  </div>
                  <div class="col-md-6">
                    <input v-model="user.sobrenome" type="text" class="form-control" placeholder="Sobrenome" required>
                    <p></p>
                  </div>
                </div>
                <div class="row g-3 ">
                  <div class="col">
                    <input v-model="user.periodo" type="text" class="form-control" placeholder="Período" required>
                    <p></p>
                  </div>
                  <div class="col-sm-12 col-md-6 md-2">
                    <select name="listaPermissoes" id="permissoes" class="form-select"
                      aria-label="Default select example">
                      <option selected>Permissões:</option>
                      <option value="ROLE_USER">Usuário</option>
                      <option value="ROLE_PROJETOS">Projetos</option>
                      <option value="ROLE_ADMIN">Administrador</option>
                    </select>
                  </div>
                </div>
              </fieldset>
              <!--<p><label>Senha</label><input type="password" v-model="user.senha" /></p>-->
              <p></p>
              <p><button class="btn btn-primary salvar-btn" @click="salvar">Salvar</button></p>
            </form>
          </fieldset>

          <table class="table table-dark table-striped">
            <thead>
              <tr>
                <th>Login:</th>
                <th>Nome:</th>
                <th>Sobrenome:</th>
                <th>Período:</th>
              </tr>
            </thead>
            <tbody class="table-group-divider">
              <tr v-for="(u, i) in usuarios" v-bind:key="i" @click="abreEdit(u.id)">
                <td>{{ u.login }}</td>
                <td>{{ u.nome }}</td>
                <td>{{ u.sobrenome }}</td>
                <td>{{ u.periodo }}</td>
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

.form-label {
margin-bottom: 5px;
color: white;
}

<style scoped>
.card {
  padding: 20px;
  /* Define o espaçamento interno */
}

.form-select {
  width: 40%;
  /* Ajuste a largura conforme necessário */
  height: 38px;
  /* Ajuste a altura conforme necessário */
  font-size: 0.9em;
  /* Ajuste o tamanho da fonte conforme necessário */
  margin-left: 10px;
  /* Ajuste a margem à esquerda conforme necessário */
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

</style>