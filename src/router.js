import Vue from 'vue'
import VueRouter from "vue-router"
import access from "./middleware/access"
import auth from "./middleware/auth"

Vue.use(VueRouter)

export default new VueRouter({

  mode: 'history',
  linkActiveClass: "active",
  routes: [
    {path: '*', component: () => import('./components/base/NotFound')},
    {
      path: '/',
      redirect: '/dashboard'
    },
    {
      path: '/sign-in',
      name: 'sign-in',
      component: () => import('./components/auth/SignIn')
    },
    {
      path: '/sign-up',
      name: 'sign-up',
      component: () => import('./components/auth/SignUp')
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: () => import('./components/dashboard/Index'),
      meta: {
        middleware: [auth],
        title: 'Dashboard'
      }
    },
    {
      path: '/apps',
      name: 'apps',
      component: () => import('./components/app/List'),
      meta: {
        middleware: [auth],
        title: 'Applications'
      }
    },
    {
      path: '/users',
      name: 'users',
      component: () => import('./components/app/users/Index'),
      meta: {
        middleware: [auth],
        title: 'Users & Roles'
      }
    },
    {
      path: '/profile',
      name: 'profile',
      component: () => import('./components/profile/Index'),
      meta: {
        middleware: [auth],
        title: 'Profile settings'
      }
    },
    {
      path: '/app',
      redirect: '/app/pages',
      name: 'app',
      component: () => import('./components/app/Index'),
      meta: {
        middleware: [auth],
      },
      children: [
        {
          path: 'module',
          name: 'module',
          component: () => import('./components/app/modules/Index'),
          redirect: 'module/list',
          children: [
            {
              path: 'list',
              name: 'module-list',
              component: () => import('./components/app/modules/List'),
              meta: {
                title: 'Your modules'
              }
            },
            {
              path: ':moduleId/:folder',
              name: 'module-edit',
              component: () => import('./components/app/modules/Edit')
            },
          ]
        },
        {
          path: 'pages',
          name: 'page-list',
          component: () => import('./components/app/page/List'),
          meta: {
            title: 'List of page',
            middleware: [access]
          }
        },
        {
          path: 'publication',
          name: 'publication',
          component: () => import('./components/app/publication/List'),
          meta: {
            title: 'Publications'
          }
        },
        {
          path: 'settings',
          name: 'app-settings',
          component: () => import('./components/app/settings/Index'),
          meta: {
            title: 'Settings'
          }
        },
      ]
    },
    {
      path: '/marketplace',
      name: 'marketplace',
      component: () => import('./components/marketplace/Index'),
      meta: {
        middleware: [auth],
        title: 'Marketplace'
      }
    },
    {
      path: '/settings',
      name: 'settings',
      component: () => import('./components/settings/Index'),
      meta: {
        middleware: [auth],
        title: 'Settings'
      }
    },
  ]

})
