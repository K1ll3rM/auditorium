import {resolve} from 'path';

import {defineNuxtConfig} from 'nuxt'

export default defineNuxtConfig({
  // Disable server-side rendering: https://go.nuxtjs.dev/ssr-mode
  ssr: false,

  // Target: https://go.nuxtjs.dev/config-target
  target: 'static',

  // Global page headers: https://go.nuxtjs.dev/config-head
  meta: {
    title: 'auditorium',
    meta: [
      {charset: 'utf-8'},
      {name: 'viewport', content: 'width=device-width, initial-scale=1'},
      {hid: 'description', name: 'description', content: ''},
      {name: 'format-detection', content: 'telephone=no'}
    ],
    link: [
      {rel: 'icon', type: 'image/x-icon', href: '/favicon.ico'}
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    'assets/icons/bootstrap-icons.css',
    'assets/css/style.scss'
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [],

  // PWA module configuration: https://go.nuxtjs.dev/pwa
  pwa: {
    manifest: {
      lang: 'en'
    }
  },

  generate: {
    dir: 'build'
  },

  alias: {
    '~': resolve(__dirname, '/'),
    '@': resolve(__dirname, '../'),
    '~bootstrap-dark-5': resolve(__dirname, '../node_modules/bootstrap-dark-5'),
    '~bootstrap': resolve(__dirname, '../node_modules/bootstrap'),
  }
})
