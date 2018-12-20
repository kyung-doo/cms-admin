import Vuex from 'vuex'


const createStore = () => {
  return new Vuex.Store({

    state: {
      auth: null,
      photo: null,
      members: []
    },

    mutations: {

      setAuth(state, auth) {
        state.auth = auth
      },

      setPhoto(state, photo) {
        state.photo = photo
      },

      setMembers(state, members) {
        state.members = members
        console.log('setMembers')
      },

      logout(state) {
        state.auth = null
        state.photo = null
      },
    },

    actions: {
      nuxtServerInit({ commit }, { app } ) {
        
      },
      nuxtClientInit({ commit }, { app } ) {

      },
      async cookieInit({ commit }) {
        let auth = this.$cookies.get('auth', { parseJSON: true })
        let photo = this.$cookies.get('photo', { parseJSON: false })
        if( auth ) {
          commit('setAuth', auth)
        }
        if( photo ) {
          commit('setPhoto', photo)
        }
        console.log('cookieInit')
      },

      async login({ commit }, { data }) {
        try {
          const res = await this.$axios({
              method: 'post',
              url: '/api/admin/auth/login',
              data: data
          })

          if( res.data.success ) {
            const auth = {
              accessToken: res.data.body.token
            }

            commit('setAuth', auth)
            commit('setPhoto', res.data.body.photo)

            this.$cookies.set('auth', auth)
            this.$cookies.set('photo',  res.data.body.photo)
          }
          else
          {
            throw res.data.error
          }
        }
        catch ( e ) {
          throw e
        } 
      },

      async logout({ commit }) {
        this.$cookies.remove('auth')
        this.$cookies.remove('photo')
        commit('logout')
      }

    }
  })
}

export default createStore
