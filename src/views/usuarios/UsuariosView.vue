<template>
  <!-- Componente da barra de navegação -->
  <barra-navegacao></barra-navegacao>

  <!-- Div principal que envolve a seção de usuários -->
  <div class="usuarios">
    <div class="row g-0 justify-content-center">
      <div class="col-lg-9 col-md-6 col-sm-8">
        <div v-if="!registerActive" class="card login"
          :class="{ error: emptyFields }">
          <h1>Usuários:</h1>
          <fieldset>
            <legend>Cadastro:</legend>
            <form @submit.prevent="salvar">
              <fieldset>
                <div class="row gx-3 gy-2 align-items-center p-2">
                  <div class="col-sm-4 form-group">
                    <input v-model="user.login" type="text" class="form-control" placeholder="Login" required>
                  </div>
                  <div class="col-sm-4">
                    <input v-model="user.senha" type="password" class="form-control" placeholder="Senha" required>
                  </div>
                </div>
                <div class="row gx-3 gy-2 align-items-center p-2">
                  <div class="col-sm-4">
                    <input v-model="user.nome" type="text" class="form-control" placeholder="Nome" required>
                  </div>
                  <div class="col-sm-4">
                    <input v-model="user.sobrenome" type="text" class="form-control" placeholder="Sobrenome" required>
                  </div>
                </div>
                <div class="row gx-3 gy-2 align-items-center p-2">
                  <div class="col-sm-4">
                    <input v-model="user.periodo" min="1" max="10" type="number" class="form-control"
                      placeholder="Período" required>
                  </div>
                  <div class="col-sm-8 menu-drop">
                    <select v-model="user.permissoes" name="listaPermissoes" id="permissoes" class="form-select"
                      required>

                      <option value="ROLE_USER">Usuário</option>
                      <option value="ROLE_ADMIN">Administrador</option>
                    </select>
                  </div>
                </div>
              </fieldset>
              <div class="gx-3 gy-2 col-sm-0 p-4 align-items-center">
                <button type="submit" class="btn btn-primary salvar">Salvar</button>
              </div>
            </form>
          </fieldset>

          <!-- Tabela de usuários -->
          <div class="table-responsive{-sm|-md|-lg|-xl|-xxl} overflow-auto">
            <table class="table table-primary">
              <!-- Cabeçalho da tabela -->
              <thead class="table-dark">
                <tr>
                  <th>Login:</th>
                  <th>Nome:</th>
                  <th>Sobrenome:</th>
                  <th>Período:</th>
                  <th>Editar dados:</th>
                </tr>
              </thead>
              <!-- Corpo da tabela -->
              <tbody class="table-group-divider">
                <tr v-for="(u, i) in usuarios" :key="i">
                  <td>{{ u.login }}</td>
                  <td>{{ u.nome }}</td>
                  <td>{{ u.sobrenome }}</td>
                  <td>{{ u.periodo }}</td>
                  <td class="bots">
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
  </div>

</template>

<script>
// Importação dos componentes e serviços necessários
import BarraNavegacao from "@/components/BarraNavegacao.vue";
import AuthService from "@/services/AuthService";
import axios from "axios";



export default {
  // Definição dos componentes utilizados
  components: {
    BarraNavegacao,
  },
  // Dados do componente

  data() {
    return {
      usuarios: [], // Lista de usuários
      user: {
        login: null,
        senha: null,
      },
    };
  },
  // Função chamada quando o componente é montado
  mounted() {
    console.log(AuthService.dados.token); // Exibe o token no console
    this.getUsuarios(); // Chama a função para obter os usuários
  },
  // Métodos do componente
  methods: {
    // Função para obter os usuários
    async getUsuarios() {
      try {
        let r = await fetch("http://localhost:8080/users", {
          method: "GET",
          headers: { Authorization: `Bearer ${AuthService.dados.token}` }, // Adiciona o token de autorização
        });
        r.json().then((j) => {
          this.usuarios = j; // Define a lista de usuários
        });
      } catch (ex) {
        console.log("ERRO", ex); // Exibe erro no console
      }
    },
    // Função para salvar um novo usuário
    async salvar() {
      // Verifica se todos os campos obrigatórios estão preenchidos
      if (
        this.user.login &&
        this.user.senha &&
        this.user.nome &&
        this.user.sobrenome &&
        this.user.periodo &&
        this.user.permissoes
      ) {
        try {
          this.user.permissoes = ["ROLE_USER"]; // Define permissões padrão
          console.log(JSON.stringify(this.user)); // Exibe os dados do usuário no console

          const response = await fetch("http://localhost:8080/users", {
            method: "POST",
            body: JSON.stringify(this.user), // Corpo da requisição com os dados do usuário
            headers: {
              Authorization: `Bearer ${AuthService.dados.token}`, // Adiciona o token de autorização
              "Content-Type": "application/json",
            },
          });

          if (response.ok) {
            this.getUsuarios(); // Atualiza a lista de usuários
            // Reseta os campos do formulário
            this.user.login = "";
            this.user.senha = "";
            this.user.nome = "";
            this.user.sobrenome = "";
            this.user.periodo = "";
            this.user.permissoes = "";
          } else {
            const errorData = await response.json();
            console.error("Erro ao salvar usuário:", errorData);
          }
        } catch (e) {
          console.error("Erro ao salvar usuário:", e);
        }
      } else {
        console.error("Por favor, preencha todos os campos obrigatórios.");
      }
    },
    // Função para abrir a edição de um usuário
    abreEdit(id) {
      this.$router.push(`/usuarios/${id}`); // Navega para a rota de edição de usuário
    },
    // Função para excluir um usuário
    async excluiUsuario(id) {
      try {
        const response = await axios.delete(`http://localhost:8080/users/${id}`, {
          headers: {
            Authorization: `Bearer ${AuthService.dados.token}`, // Adiciona o token de autorização
          },
        });
        if (response.status === 200) {
          this.getUsuarios(); // Atualiza a lista de usuários
        } else {
          console.log("ERRO", response.data); // Exibe erro no console
        }
      } catch (e) {
        console.log("ERRO", e); // Exibe erro no console
      }
    },
  },
};
</script>

<style scoped>
/* Estilo para os cabeçalhos da tabela */
th {
  text-align: center;
  /* Centraliza o texto */
}

/* Estilo para as células da tabela */
td {
  text-align: center;
  /* Centraliza o texto */
}

/* Estilo para o card */
.card {
  padding: 20px;
  /* Define o espaçamento interno */
}

/* Estilo para o seletor de permissões */
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

/* Estilo para os inputs */
.form-control {
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
}

button:hover {
  color: black;
}

button {
  /* Ajuste o tamanho da fonte conforme necessário */
  box-shadow: 1px 2px 1px 1px rgba(0, 0, 0, 0.745) !important;
}

.menu-drop select {
  font-size: 0.9em;
  /* Ajusta o tamanho da fonte conforme necessário */
  margin-left: 10px;
  /* Ajusta a margem à esquerda conforme necessário */
  width: 49%;
  /* Largura padrão de 49% */
}

/* Media query para ajustar a largura em telas menores */
@media only screen and (max-width: 768px) {
  .menu-drop select {
    width: 100%;
    /* Largura de 100% quando a largura da tela for menor que 768px */
  }
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
