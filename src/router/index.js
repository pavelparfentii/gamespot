import { createRouter, createWebHistory } from 'vue-router'
import Home from '../components/home/index.vue'
import Signin from '../components/user/signin.vue'

import { isAuth, isLoggedIn } from '@/composables/auth'

import Dashboard from '../components/user/dashboard/index.vue'
import DashboardMain from '../components/user/dashboard/main.vue'

import Article from '@/components/articles/article.vue'

import UserProfile from '@/components/user/dashboard/pages/user_profile.vue'
import AdminArticles from '@/components/user/dashboard/admin/articles.vue'
import AdminAddArticle from '@/components/user/dashboard/admin/add.vue'
import AdminEditArticle from '@/components/user/dashboard/admin/edit.vue'

import NotFound from '@/components/404.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
    },
    {
      path: '/article/:id',
      name: 'article',
      component: Article,
    },
    { path: '/signin', name: 'signin', component: Signin, beforeEnter: isLoggedIn },
    {
      path: '/user/dashboard',
      component: Dashboard,
      beforeEnter: isAuth,
      children: [
        {
          path: '',
          component: DashboardMain,
          name: 'dashboard',
        },
        {
          path: 'profile',
          component: UserProfile,
          name: 'user_profile',
        },
        {
          path: '/admin/articles',
          name: 'admin_articles',
          component: AdminArticles,
        },
        {
          path: '/admin/articles/add',
          name: 'admin_add_article',
          component: AdminAddArticle,
        },
        {
          path: '/admin/articles/edit/:id',
          name: 'admin_edit_article',
          component: AdminEditArticle,
        },
      ],
    },
    {
      path: '/:notFound(.*)*',
      name: 'not_found',
      component: NotFound,
    },
  ],
})
export default router
