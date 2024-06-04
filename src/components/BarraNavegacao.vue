<template>
    <div class="container-fluid mb-3 p-3 bg">
        <nav class="navbar navbar-expand-lg navbar-light bg-light">
            <a href="/">
                <img src="@/assets/logo.png" alt="Logo" class="navbar-brand" />
            </a>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse"
                data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
                aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarSupportedContent">
                <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                    <li class="nav-item">
                        <router-link to="/">Início</router-link>
                    </li>
                    <li class="nav-item">
                        <router-link to="/projetos">Projetos</router-link>
                    </li>
                    <li class="nav-item">
                        <router-link to="/usuarios">Usuários</router-link>
                    </li>
                    <li class="nav-item">
                        <router-link to="/sobre">Sobre</router-link>
                    </li>
                </ul>
                <div class="deslogar">
                    {{ logado.login }} | <button class="bot-deslogar" @click="desloga">Sair</button>
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

button {
  margin: 0 10px; /* Ajuste a margem conforme necessário */
  box-shadow: 1px 2px 1px 1px rgba(0, 0, 0, 0.745) !important;
}

.navbar {
    border-radius: 10px;
    font-size: 18px;
    /* Define o tamanho do texto para 18 pixels */
    width: 100% !important;
}

.navbar-brand {
    width: 100px;
    height: 40px;
    margin-right: 50px;
    margin-left: 20px;
}

.nav-item {
    margin-right: 10px; /* Espaçamento entre os itens do menu */
}

.deslogar {
    margin-left: auto;
    display: flex;
    align-items: center;
    margin-right: 20px;
    
}

.bot-deslogar {
    border-radius: 6px !important;
}

.bot-deslogar:hover {
    border-radius: 6px !important;
    background-color: rgb(254, 229, 2) !important;
}

@media (max-width: 20%) {
    .nav-pills {
        flex-direction: column;
    }
}
</style>
