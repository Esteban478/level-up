import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA, VitePWAOptions } from 'vite-plugin-pwa'

// https://vitejs.dev/config/

const manifestForPlugIn: Partial<VitePWAOptions> = {
  registerType: 'autoUpdate',
  manifest:{
    name:'Level Up',
    short_name:'Lvl Up',
    description:'Your ultimate habit tracker',
    icons:[
    {
      src: 'assets/icon_x512.png',
      sizes:'512x512',
      type:'image/png',
      purpose:'any maskable'
    },
    {
      src:'assets/icon_x384.png',
      sizes:'384x384',
      type:'image/png',
      purpose:'any maskable'
    },
    {
      src:'assets/icon_x192.png',
      sizes:'192x192',
      type:'image/png',
      purpose:'any maskable'
    },
    {
      src:'assets/icon_x128.png',
      sizes:'128x128',
      type:'image/png',
      purpose:'any maskable'
    },
    {
      src:'assets/icon_x96.png',
      sizes:'96x96',
      type:'image/png',
      purpose:'any maskable'
    },
    {
      src:'assets/icon_x72.png',
      sizes:'72x72',
      type:'image/png',
      purpose:'any maskable'
    },
    {
      src:'assets/icon_x48.png',
      sizes:'48x48',
      type:'image/png',
      purpose:'any maskable'
    }
  ],
  theme_color:'#282828',
  background_color: '#00C2FF',
  categories: ['education', 'fitness', 'health', 'social', 'productivity'],
  display: 'standalone',
  scope:'/',
  start_url:'/',
  orientation: 'portrait',
  shortcuts:[
    {
      name: 'Achievements',
      short_name: 'Achievements',
      description: 'Open achievements page',
      url: '/achievements',
    },
    {
      name: 'User Profile',
      short_name: 'Profile',
      description: 'Open user profile page',
      url: '/profile',
    },
    {
      name: 'Feed',
      short_name: 'Feed',
      description: 'Open feed page',
      url: '/feed',
    }
  ]
  }
}

export default defineConfig({
  plugins: [react(), VitePWA(manifestForPlugIn)],
})
