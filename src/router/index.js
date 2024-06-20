import { createRouter, createWebHashHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LoginView from '../views/LoginView.vue'
import NaoAutorizadoView from '../views/NaoAutorizadoView.vue'
import UsuariosView from '../views/usuarios/UsuariosView.vue'
import UsuarioEditView from '../views/usuarios/UsuarioEditView.vue'
import ProjetosView from '../views/projetos/ProjetosView.vue'
import ProjetosEditView from '../views/projetos/ProjetosEditView.vue'

import LoginService from '../services/LoginService'
import AuthService from '@/services/AuthService'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/projetos',
    name: 'projetos',
    component: ProjetosView
  },
  {
    path: '/projetos/:id',
    name: 'projetosedit',
    component: ProjetosEditView
  },
  {
    path: '/usuarios',
    name: 'usuarios',
    component: UsuariosView
  },
  {
    path: '/usuarios/:id',
    name: 'usuariosedit',
    component: UsuarioEditView
  },
  {
    path: '/login',
    name: 'login',
    component: LoginView
  },
  {
    path: '/nao-autorizado',
    name: 'nao-autorizado',
    component: NaoAutorizadoView
  },
  {
    path: '/sobre',
    name: 'sobre',
    component: () => import('../views/AboutView.vue') // Importação dinâmica para melhor desempenho
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

router.beforeEach((to, from) => {
  LoginService.router = router;

  // Debug para monitorar as navegações
  console.log(`de ${from.name} para ${to.name}`);

  // Verifica autenticação
  if (!LoginService.estaAutenticado() && to.name !== 'login') {
    return { name: 'login' } // Redireciona para a página de login se não estiver autenticado
  }

  // Verifica permissões
  if (!AuthService.validaPermissao(to.path)) {
    return { name: 'nao-autorizado' } // Redireciona para a página não autorizado se não tiver permissão
  }

  return true; // Permite a navegação se todas as verificações passarem
})

export default router
