import Vue from 'vue'
import Router from 'vue-router'
import { interopDefault } from './utils'

const _8ac645b4 = () => interopDefault(import('..\\pages\\login.vue' /* webpackChunkName: "pages_login" */))
const _3ac14a96 = () => interopDefault(import('..\\pages\\member\\index.vue' /* webpackChunkName: "pages_member_index" */))
const _8b46ec3c = () => interopDefault(import('..\\pages\\member\\group.vue' /* webpackChunkName: "pages_member_group" */))
const _8223897c = () => interopDefault(import('..\\pages\\member\\write.vue' /* webpackChunkName: "pages_member_write" */))
const _1e158be2 = () => interopDefault(import('..\\pages\\index.vue' /* webpackChunkName: "pages_index" */))

Vue.use(Router)

if (process.client) {
  window.history.scrollRestoration = 'manual'
}
const scrollBehavior = function (to, from, savedPosition) {
  // if the returned position is falsy or an empty object,
  // will retain current scroll position.
  let position = false

  // if no children detected
  if (to.matched.length < 2) {
    // scroll to the top of the page
    position = { x: 0, y: 0 }
  } else if (to.matched.some(r => r.components.default.options.scrollToTop)) {
    // if one of the children has scrollToTop option set to true
    position = { x: 0, y: 0 }
  }

  // savedPosition is only available for popstate navigations (back button)
  if (savedPosition) {
    position = savedPosition
  }

  return new Promise((resolve) => {
    // wait for the out transition to complete (if necessary)
    window.$nuxt.$once('triggerScroll', () => {
      // coords will be used if no selector is provided,
      // or if the selector didn't match any element.
      if (to.hash) {
        let hash = to.hash
        // CSS.escape() is not supported with IE and Edge.
        if (typeof window.CSS !== 'undefined' && typeof window.CSS.escape !== 'undefined') {
          hash = '#' + window.CSS.escape(hash.substr(1))
        }
        try {
          if (document.querySelector(hash)) {
            // scroll to anchor by returning the selector
            position = { selector: hash }
          }
        } catch (e) {
          console.warn('Failed to save scroll position. Please add CSS.escape() polyfill (https://github.com/mathiasbynens/CSS.escape).')
        }
      }
      resolve(position)
    })
  })
}

export function createRouter() {
  return new Router({
    mode: 'history',
    base: '/admin/',
    linkActiveClass: 'nuxt-link-active',
    linkExactActiveClass: 'nuxt-link-exact-active',
    scrollBehavior,

    routes: [{
      path: "/login",
      component: _8ac645b4,
      name: "login"
    }, {
      path: "/member",
      component: _3ac14a96,
      name: "member"
    }, {
      path: "/member/group",
      component: _8b46ec3c,
      name: "member-group"
    }, {
      path: "/member/write",
      component: _8223897c,
      name: "member-write"
    }, {
      path: "/",
      component: _1e158be2,
      name: "index"
    }],

    fallback: false
  })
}
