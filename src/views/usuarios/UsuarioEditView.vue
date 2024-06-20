<template>
  <!-- Importa e utiliza o componente de barra de navegação -->
  <barra-navegacao></barra-navegacao>

  <!-- Container principal da página de edição do usuário -->
  <div class="Useredit">
    <div class="row g-0 justify-content-center">
      <!-- Centraliza o conteúdo horizontalmente -->
      <!-- Coluna responsiva -->
      <div class="col-lg-6 col-md-6 col-sm-8">
        <!-- Ajusta o tamanho da coluna em diferentes dispositivos -->
        <!-- Card de login -->
        <!-- Exibe o card se o objeto 'usuario' estiver disponível -->
        <div v-if="usuario" class="card login" :class="{ error: emptyFields }">
          <h1>Usuário:</h1>
          <!-- Formulário de atualização dos dados do usuário -->
          <fieldset>
            <legend>Dados do usuário:</legend>
            <form @submit.prevent="atualizaUsuario">
              <div class="row gx-3 gy-2 align-items-center p-2">
                <!-- Campo de login (desabilitado para edição) -->
                <div class="col-sm-4 form-group">
                  <label>Login</label>
                  <input v-model="usuario.login" type="text" class="form-control" disabled />
                </div>
                <!-- Campo de nome -->
                <div class="col-sm-4">
                  <label>Nome</label>
                  <input v-model="usuario.nome" type="text" class="form-control" />
                </div>
                <!-- Campo de sobrenome -->
                <div class="col-sm-4">
                  <label>Sobrenome</label>
                  <input v-model="usuario.sobrenome" type="text" class="form-control" />
                </div>
                <!-- Campo de período -->
                <div class="col-sm-4">
                  <label>Período</label>
                  <input v-model="usuario.periodo" type="number" min="1" max="10" class="form-control" />
                </div>
                <!-- Campo de seleção de permissões -->
                <div class="col-sm-8 menu-drop">
                  <label>Permissões</label>
                  <select v-model="usuario.permissoes" multiple class="form-select" aria-label="Permissões">
                    <!-- Laço para exibir as opções de permissões disponíveis -->
                    <option v-for="(permissao, index) in permissoes" :key="index" :value="permissao.role">
                      {{ permissao.label }}
                    </option>
                  </select>
                </div>
              </div>
              <!-- Botões de ação (atualizar e voltar) -->
              <div class="d-grid gap-2 d-md-block bots">
                <button type="submit" class="btn btn-primary atualizar me-2">Atualizar</button>
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
      usuario: null,
      permissoes: [
        { label: "Administrador", role: "ROLE_ADMIN" },
        { label: "Professor", role: "ROLE_PROFESSOR" },
        { label: "Usuário", role: "ROLE_USER" },
        { label: "Projetos", role: "ROLE_PROJETOS" },
      ],
      emptyFields: false,
    };
  },
  mounted() {
    // Carrega os dados do usuário ao montar o componente
    this.getUsuario(this.$route.params.id);
  },
  methods: {
    getUsuario(id) {
      // Faz uma solicitação GET para obter os dados do usuário
      axios({
        method: "GET",
        url: `http://localhost:8080/users/${id}`,
        headers: {
          Authorization: `Bearer ${AuthService.dados.token}`,
        },
      }).then((r) => {
        // Define os dados do usuário obtidos na resposta
        this.usuario = r.data;
      });
    },
    atualizaUsuario() {
      // Verifica se há campos vazios antes de enviar a atualização
      if (!this.usuario.nome || !this.usuario.sobrenome || !this.usuario.periodo || this.usuario.permissoes.length === 0) {
        this.emptyFields = true;
        return;
      }
      this.emptyFields = false;

      // Faz uma solicitação PUT para atualizar os dados do usuário
      axios({
        method: "PUT",
        url: `http://localhost:8080/users/${this.usuario.id}`,
        headers: {
          Authorization: `Bearer ${AuthService.dados.token}`,
          "Content-Type": "application/json",
        },
        data: JSON.stringify(this.usuario),
      }).then((r) => {
        // Redireciona para a lista de usuários após a atualização
        console.log(JSON.stringify(this.usuario));
        console.log(r);
        this.$router.push("/usuarios");
      });
    },
    voltar() {
      // Volta para a página anterior
      this.$router.go(-1);
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
  border: 2px solid rgb(0, 0, 0);
  /* Ajusta a borda conforme necessário */
  padding: 20px;
  /* Ajuste o espaçamento interno conforme necessário */
  border-radius: 10px;
  /* Ajuste o arredondamento dos cantos conforme necessário */
  margin-top: 20px;
  /* Ajuste a margem superior conforme necessário */
}

legend {
  font-size: 1.2em;
  /* Ajuste o tamanho da fonte conforme necessário */
  font-weight: bold;
  /* Deixe o texto em negrito */
}

textarea {
  width: 100%;
  /* Faz com que o textarea ocupe a largura total */
  height: 100px;
  /* Ajuste a altura conforme necessário */
  margin-top: 10px;
  /* Ajuste a margem superior conforme necessário */
  border-radius: 5px;
  /* Ajuste o arredondamento dos cantos conforme necessário */
  padding: 10px;
  /* Ajuste o espaçamento interno conforme necessário */
}

button {
  /* Ajuste o tamanho da fonte conforme necessário */
  box-shadow: 1px 2px 1px 1px rgba(0, 0, 0, 0.745) !important;
}

button:hover {
  color: black !important;
}

.menu-drop select {
  font-size: 0.9em;
  /* Ajuste o tamanho da fonte conforme necessário */
  margin-left: 10px;
  /* Ajuste a margem à esquerda conforme necessário */
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

.table * {
  border: solid 1px black;
}
</style>
