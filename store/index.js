import Vuex from 'vuex'


const createStore = () => {
  return new Vuex.Store({

    state: {
      auth: null,
      admin: null,
      members: [],
      membersCount:0
    },

    mutations: {

      setAuth(state, auth) {
        state.auth = auth
      },

      setAdmin(state, admin) {
        state.admin = admin
      },

      setMembersCount(state, membersCount) {
        state.membersCount = membersCount
      },

      setMembers(state, members) {
        state.members = members
      },

      logout(state) {
        state.auth = null
        state.admin = null
      },
    },

    actions: {
      nuxtServerInit({ commit }, { app } ) {
        
      },
      nuxtClientInit({ commit }, { app } ) {

      },
      async cookieInit({ commit }) {
        let auth = this.$cookies.get('auth', { parseJSON: true })
        let admin = this.$cookies.get('admin', { parseJSON: true })
        if( auth ) {
          commit('setAuth', auth)
        }
        if( admin ) {
          commit('setAdmin', admin)
        }
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
            commit('setAdmin', { photo: res.data.body.photo })

            this.$cookies.set('auth', auth)
            this.$cookies.set('admin',  { photo: res.data.body.photo })
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
        this.$cookies.remove('admin')
        commit('logout')
      },

      async getMembersCount ({ commit }) {
        try {
          
          const res = await this.$axios({
            method: 'get',
            url: '/api/admin/member/count',
            headers: { 
              'x-access-token': this.state.auth.accessToken 
            }
          })
          
          if(res.data.success) {
            commit('setMembersCount', res.data.body)
          }
          else {
            this.$router.push('/login')
          }
        } catch( e ) {
          console.log(e)
        }
      },

      async getMembers ({ commit }, { viewNum }) {
        try {
          
          const res = await this.$axios({
            method: 'get',
            url: '/api/admin/member/',
            params: {
              viewNum: viewNum
            },
            headers: { 
              'x-access-token': this.state.auth.accessToken 
            }
          })
          
          if(res.data.success) {
            commit('setMembers', res.data.body)
          }
          else {
            this.$router.push('/login')
          }
        } catch( e ) {
          console.log(e)
        }
      }

    }
  })
}

export default createStore
