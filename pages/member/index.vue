<template>
  <section class="">
    <div class="memeber-page">

      <b-table 
        class="text-center" 
        striped 
        hover 
        :fields="tableFields" 
        :items="$store.state.members">
        
        <template slot="index" slot-scope="data">
          {{data.index + 1}}
        </template>

        <template slot="denied" slot-scope="data">
          {{data.item.denied ? '차단' : '승인'}}
        </template>

      </b-table>

      <div class="align-right">
        <b-button @click="$router.push('/member/write')" type="button" variant="success">회원추가</b-button>
      </div>

    </div>
  </section>
</template>



<script>
export default {
  
  layout: 'default',
  
  async fetch ({ app, store, redirect, params }) {

    try {

      await store.dispatch({type:'cookieInit'})

      if(!store.state.auth) {
        redirect('/login')
      }

      const res = await app.$axios({
        method: 'get',
        url: '/api/admin/member/',
        headers: { 
          'x-access-token': store.state.auth.accessToken 
        }
      })

      if(res.data.success) {
        store.commit('setMembers', res.data.body)
      }
      else {
        redirect('/login')
      }

    } 
    catch ( e ){} 
    
  },

  data () {
    return {
      tableFields: [
        { key: 'index', label: '번호' },
        { key: 'userid', label: '아이디' },
        { key: 'username', label: '이름' },
        { key: 'nickname', label: '닉네임' },
        { key: 'email', label: '이메일' },
        { key: 'point', label: '포인트' },
        { key: 'denied', label: '승인' }
      ]
    }
  },

  components: {

  }
}
</script>

<style lang="scss">

.memeber-page {
  
  th{ 
    background: #fff;
  }
}

</style>

