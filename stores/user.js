import { defineStore } from 'pinia'
import axios from '~~/plugins/axios'

const $axios = axios().provide.axios

export const useUserStore = defineStore('user', {
  state: () => ({
    id: 1,
    theme_id: 4,
    name: 'test123',
    email: 'test123@gm.com',
    image: 'http://localhost:8000/user-placeholder.png',
    bio: 'hello world',
    theme: null,
    colors: null,
    allLinks: null,
    isMobile: false,
    updatedLinkId: 0,
    addLinkOverlay: false,
    isPreviewOverlay: false,
  }),
  actions: {
    hidePageOverflow(val, id) {
      if (val) {
        document.body.style.overflow = 'hidden'
        if (id) {
          document.getElementById(id).style.overflow  = 'hidden'
        }
        return
      }
      document.body.style.overflow = 'visible'
      if (id) {
        document.getElementById(id).style.overflow  = 'visible'
      }
    },

    allLowerCaseNoCaps(str) {
      return str.split(' ').join('').toLowerCase()
    },

    async hasSessionExpired() {
      
    },

    async getTokens() {
      await $axios.get('/sanctum/csrf-cookie')
    },

    async getUser() {
      this.$state.id = 1
      this.$state.theme_id = 4
      this.$state.name = "test123"
      this.$state.bio = "hello world"
      this.$state.image = "http://localhost:8000/user-placeholder.png"

      this.getUserTheme()
    },

    getUserTheme() {
      this.$state.colors.forEach(color => {
        if (this.$state.theme_id === color.id) {
          this.$state.theme = color
        }
      })
    },

    async updateTheme(themeId) {
      this.$state.theme_id = themeId
      this.getUserTheme()
    },

    async addLink(name, url) {
      this.$state.allLinks.push({
        id:Math.random(),
        user_id:1,
        name,
        url,
        image:"http://localhost:8000/link-placeholder.png"
      })
    },

    async deleteLink(id) {
      this.$state.allLinks = this.$state.allLinks.filter(x => x.id !== id)
    },

    async updateLink(id, name, url) {
      let search = this.$state.allLinks.find(x => x.id === id)
      search.name = name
      search.url = url
    },

    async getAllLinks() {
      this.$state.allLinks = this.$state.allLinks = [
        {
          id:1,
          user_id:1,
          name:"Link 1",
          url:"https://stackoverflow.com/questions/68876100/vue-laravel-sanctum-csrf-token-mismatch-419-error",
          image:"http://localhost:8000/link-placeholder.png"
        },
        {
          id:2,
          user_id:1,
          name:"Link 2",
          url:"https://stackoverflow.com/questions/68876100/vue-laravel-sanctum-csrf-token-mismatch-419-error",
          image:"http://localhost:8000/link-placeholder.png"
        }
      ]
    },

    async logout() {
      this.resetState()
    },

    resetState() {      
      this.$state.id = ''
      this.$state.name = ''
      this.$state.email = ''
      this.$state.image = ''
      this.$state.bio = ''
      this.$state.theme_id = ''
      this.$state.theme = null
      this.$state.colors = null
      this.$state.allLinks = null
      this.$state.isMobile = false
      this.$state.updatedLinkId = 0
      this.$state.addLinkOverlay = false
      this.$state.isPreviewOverlay = false
    },
  },
  persist: true
})