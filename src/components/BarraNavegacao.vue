<template>
  <div class="container-fluid mb-3 p-3 bg">
    <nav class="navbar navbar-expand-lg navbar-light bg-light" id="navmenu">
      <a href="/">
        <img src="@/assets/logo.png" ref="../src/views/homeview" alt="Logo" class="navbar-brand" />
      </a>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>

      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav mr-auto mb-2 mb-lg-0">
          <li class="nav-item">
            <router-link to="/" class="nav-link">Início</router-link>
          </li>
          <li class="nav-item">
            <router-link to="/projetos" class="nav-link">Projetos</router-link>
          </li>
          <li class="nav-item">
            <router-link to="/usuarios" class="nav-link">Usuários</router-link>
          </li>
          <li class="nav-item">
            <router-link to="/sobre" class="nav-link">Sobre</router-link>
          </li>
        </ul>
        <div class="deslogar navbar-brand">
          <div class="log-user ">{{ logado.login }}</div> | <button class="btn btn-primary" @click="desloga">Sair</button>
        </div>
      </div>
    </nav>
  </div>
</template>

<script>
import LoginService from "@/services/LoginService";
import AuthService from "@/services/AuthService";

export default {
  methods: {
    desloga() {
      LoginService.deslogar();
      this.$router.push(`/?d=${new Date()}`);
    },
  },
  computed: {
    logado() {
      return AuthService.dados;
    },
  },
};
</script>

<style scoped>

#navmenu {
 text-align: center;
}

button {
  margin: 0 10px;
}

.navbar {
  border-radius: 10px;
  font-size: 18px;
}

.navbar-brand {
  width: 130px;
  height: 40px;
  margin-right: 50px;
  margin-left: 20px;
}

.nav-item {
  margin-right: 10px;
  /* Espaçamento entre os itens do menu */
}

.deslogar {
  margin-left: auto;
  display: flex;
  align-items: center;
  margin-right: 20px;
}

button:hover {
  color: black;
}

.log-user {
  font-weight: bold;
  font-family: Helvetica;
  text-transform: uppercase;
  font-size: 19px;
  color: rgb(17, 0, 255);
}

</style>