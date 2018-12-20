<template>
  <div class="app flex-row align-items-center">
    <div class="container">
      <b-row class="justify-content-center">
        <b-col md="6">
          <b-card-group>
            <b-card no-body class="p-4">
              <b-card-body>
                <b-form @submit="onSubmit">
                  <h1>Login</h1>
                  <p class="text-muted">Sign In to your account</p>
                  <b-input-group class="mb-3">
                    <b-input-group-prepend><b-input-group-text><i class="icon-user"></i></b-input-group-text></b-input-group-prepend>
                    <input
                      ref="userid" 
                      type="text" 
                      v-model="form.userid" 
                      class="form-control" 
                      placeholder="Username">
                  </b-input-group>
                  <b-input-group class="mb-4">
                    <b-input-group-prepend><b-input-group-text><i class="icon-lock"></i></b-input-group-text></b-input-group-prepend>
                    <input 
                      ref="password" 
                      type="password" 
                      v-model="form.password" 
                      class="form-control" 
                      placeholder="Password">
                  </b-input-group>
                  <b-row>
                    <b-col cols="6">
                      <b-button type="submit" variant="primary" class="px-4">Login</b-button>
                    </b-col>
                    <b-col cols="6" class="text-right">
                      <!-- <b-button variant="link" class="px-0">Forgot password?</b-button> -->
                    </b-col>
                  </b-row>
                </b-form>
              </b-card-body>
            </b-card>
            <!-- <b-card no-body class="text-white bg-primary py-5 d-md-down-none" style="width:44%">
              <b-card-body class="text-center">
                <div>
                  <h2>Sign up</h2>
                  <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                  <b-button variant="primary" class="active mt-3">Register Now!</b-button>
                </div>
              </b-card-body>
            </b-card> -->
          </b-card-group>
        </b-col>
      </b-row>
    </div>
  </div>
</template>

<script>

export default {
  name: 'Login',
  layout: 'clean',
  async fetch ({ store, redirect, params }) {
    try {
      await store.dispatch({type:'cookieInit'})
      if(store.state.auth) {
        redirect('/')
      }
    } catch( e ) {}
  },
  data () {
    return {
      form: {
        userid: '',
        password: ''
      }
    }
  },

  methods: {
    onSubmit ( e ) {
      e.preventDefault()
      if(this.form.userid === '') {
        alert('아이디를 입력하세요.')
        this.$refs.userid.focus()
        return 
      }
      if(this.form.password === '') {
        this.$refs.password.focus()
        alert('패스워드를 입력하세요.')
        return 
      }

      this.$store.dispatch({
        type:'login',
        data: this.form
      })
      .then(() => {
        alert("관리자님 로그인 되었습니다.");
        this.$router.push('/')
      })
      .catch((e) => {
        alert(e.message)
      })
      
    }
  }
}
</script>