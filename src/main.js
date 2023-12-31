// Boostrap 4 and BootstrapVue CSS
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import 'quill/dist/quill.snow.css'
import 'izitoast/dist/css/iziToast.css'
import 'vue-tel-input/dist/vue-tel-input.css'
// Components imported CSS
import 'sweetalert2/dist/sweetalert2.min.css'
// Components custom CSS
import './css/iziToast.css'
import './css/phone.css'
import './css/popper.scss'

import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import VueMoment from 'vue-moment'
import BootstrapVue from 'bootstrap-vue'
import VueResource from 'vue-resource'
import VueQuillEditor from 'vue-quill-editor'
import Toast from 'vue-easy-toast'
import VueIziToast from 'vue-izitoast'
import ToggleSwitch from 'vuejs-toggle-switch'
import VueSweetalert2 from 'vue-sweetalert2'
import VueLazyload from 'vue-lazyload'

// Analytics
import VueMatomo from 'vue-matomo'

// Auth
import { msalPlugin } from './plugins/msalPlugin'
import { msalInstance } from './auth/authConfig'
import { AuthenticationResult, EventType } from '@azure/msal-browser'

// VEEVALIDATE CUSTOM VALIDATORS FOR VUEJS FORMS
import VeeValidate from 'vee-validate'

// API
import ApiPlugin from './plugins/api'
// import analytics from './plugins/analytics'

import store from './store'
import ToggleButton from 'vue-js-toggle-button'
import CustomRoutes from './router/index'
import CustomFilters from './plugins/filters'

Vue.use(VueMoment)
Vue.use(BootstrapVue)
Vue.use(VueResource)
Vue.use(VeeValidate)
Vue.use(ApiPlugin)
Vue.use(VueQuillEditor)
Vue.use(Toast)
Vue.use(ToggleButton)
Vue.use(VueRouter)
Vue.use(VueIziToast)
Vue.use(ToggleSwitch)
Vue.use(VueSweetalert2)
Vue.use(VueLazyload, {
  preLoad: 1.3,
  error: 'static/img/img_not_found.png',
  // error: 'static/img/loading-spin.svg',
  loading: 'static/img/loading-spin.svg',
  attempt: 1
})

const router = new VueRouter({
  mode: 'history',
  base: __dirname,
  routes: CustomRoutes,
  scrollBehavior (to, from, savedPosition) {
    return { x: 0, y: 0 }
  }
})

// The next 2 lines are optional. This is how you configure MSAL to take advantage of the router's navigate functions when MSAL redirects between pages in your app
// const navigationClient = new CustomNavigationClient(router)
// msalInstance.setNavigationClient(navigationClient)

// Account selection logic is app dependent. Adjust as needed for different use cases.
const accounts = msalInstance.getAllAccounts()
if (accounts.length > 0) {
  msalInstance.setActiveAccount(accounts[0])
}
msalInstance.addEventCallback((event) => {
  if (event.eventType === EventType.LOGIN_SUCCESS && event.payload) {
    const payload = event.payload
    const account = payload.account
    msalInstance.setActiveAccount(account)
  }
})
Vue.use(msalPlugin, msalInstance)

Vue.use(VueMatomo, {
  host: '',
  siteId: 2,

  // Changes the default .js and .php endpoint's filename
  // Default: 'matomo'
  trackerFileName: 'matomo',

  // Overrides the autogenerated tracker endpoint entirely
  // Default: undefined
  // trackerUrl: 'https://example.com/whatever/endpoint/you/have',

  // Overrides the autogenerated tracker script path entirely
  // Default: undefined
  // trackerScriptUrl: 'https://example.com/whatever/script/path/you/have',

  // Enables automatically registering pageviews on the router
  router: router,

  // Enables link tracking on regular links. Note that this won't
  // work for routing links (ie. internal Vue router links)
  // Default: true
  enableLinkTracking: true,

  // Require consent before sending tracking information to matomo
  // Default: false
  requireConsent: false,

  // Whether to track the initial page view
  // Default: true
  trackInitialView: true,

  // Run Matomo without cookies
  // Default: false
  disableCookies: false,

  // Require consent before creating matomo session cookie
  // Default: false
  requireCookieConsent: false,

  // Enable the heartbeat timer (https://developer.matomo.org/guides/tracking-javascript-guide#accurately-measure-the-time-spent-on-each-page)
  // Default: false
  enableHeartBeatTimer: false,

  // Set the heartbeat timer interval
  // Default: 15
  heartBeatTimerInterval: 15,

  // Whether or not to log debug information
  // Default: false
  debug: false,

  // UserID passed to Matomo (see https://developer.matomo.org/guides/tracking-javascript-guide#user-id)
  // Default: undefined
  userId: undefined,

  // Share the tracking cookie across subdomains (see https://developer.matomo.org/guides/tracking-javascript-guide#measuring-domains-andor-sub-domains)
  // Default: undefined, example '*.example.com'
  cookieDomain: undefined,

  // Tell Matomo the website domain so that clicks on these domains are not tracked as 'Outlinks'
  // Default: undefined, example: '*.example.com'
  domains: undefined,

  // A list of pre-initialization actions that run before matomo is loaded
  // Default: []
  // Example: [
  //   ['API_method_name', parameter_list],
  //   ['setCustomVariable','1','VisitorType','Member'],
  //   ['appendToTrackingUrl', 'new_visit=1'],
  //   etc.
  // ]
  preInitActions: [],

  // A function to determine whether to track an interaction as a site search
  // instead of as a page view. If not a function, all interactions will be
  // tracked as page views. Receives the new route as an argument, and
  // returns either an object of keyword, category (optional) and resultsCount
  // (optional) to track as a site search, or a falsey value to track as a page
  // view.
  // Default: false, i.e. track all interactions as page views
  // Example: (to) => {
  //   if (to.query.q && to.name === 'search') {
  //     return { keyword: to.query.q, category: to.params.category }
  //   } else {
  //    return null
  //   }
  // }
  trackSiteSearch: false,

  // Set this to include crossorigin attribute on the matomo script import
  // Default: undefined, possible values : 'anonymous', 'use-credentials'
  crossOrigin: undefined
})

// Filters
Object.keys(CustomFilters).forEach(name => {
  Vue.filter(name, CustomFilters[name])
})

// Vue.use(JwtDecode)
window.moment = require('moment')
window.moment.locale('fr')
window.jwtDecode = require('jwt-decode')
window.jQuery = window.$ = require('jquery')
window.tinymce = require('tinymce')
window.toast = require('vue-easy-toast')
window.moment.tz = require('moment-timezone')
require('moment/locale/fr')

store.state.assets = ApiPlugin.usedApiUrl.replace('/api/', '/assets/')
store.state.maintenanceResa = {
  active: false,
  dates: [], // [20 dec 2018 8h, 21 dec 2018 20h]
  auth: []
}
Vue.http.options.credentials = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  created: function () {
    window.Vue = this
  },
  router,
  store,
  render: h => h(App)
})
