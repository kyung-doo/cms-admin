<template>
  <section class="">
    <div class="memeber-page">

      <b-table 
        class="text-center" 
        responsive 
        striped 
        hover 
        :fields="tableFields" 
        :items="$store.state.members">
        
        <template slot="index" slot-scope="data">
          {{data.index + 1}}
        </template>

         <template slot="userid" slot-scope="data">
          {{data.item.userid}} <b-badge v-if="data.item.level == 1">관리자</b-badge>
        </template>

        <template slot="register_datetime" slot-scope="data">
          {{data.item.register_datetime = data.item.register_datetime.substr(0,10)}}
        </template>

        <template slot="check_recive" slot-scope="data">
          <b-form-checkbox :checked="data.item.open_profile" :disabled="true"></b-form-checkbox>
          <b-form-checkbox :checked="data.item.receive_email" :disabled="true"></b-form-checkbox>
          <b-form-checkbox :checked="data.item.use_note" :disabled="true"></b-form-checkbox>
          <b-form-checkbox :checked="data.item.receive_sms" :disabled="true"></b-form-checkbox>
        </template>

        <template slot="denied" slot-scope="data">
          {{data.item.denied ? '차단' : '승인'}}
        </template>

      </b-table>

      <ListViewNum
        @change="listViewNmChange" />

      <div class="align-right">
        <b-button @click="$router.push('/member/write')" type="button" variant="success">회원추가</b-button>
      </div>

    </div>
  </section>
</template>



<script>
import ListViewNum from '~/components/helper/ListViewNum'

export default {
  
  layout: 'default',
  
  async fetch ({ app, store, redirect, params }) {

    try {

      await store.dispatch({type:'cookieInit'})

      if(!store.state.auth) {
        redirect('/login')
      }

      await store.dispatch({type:'getMembersCount'})

      await store.dispatch({type:'getMembers', viewNum: 10})

    } 
    catch ( e ){} 
    
  },

  components: {
    ListViewNum
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
        { key: 'register_datetime', label: '가입일' },
        { key: 'check_recive', label: '공개/메일/쪽지/문자' },
        { key: 'denied', label: '승인' }
      ],

      viewNum: 10,
      currenPage: 1,
      totalPages: 1
    }
  },

  mounted () {
    
  },

  methods: {

    listViewNmChange ( val ) {
      this.viewNum = val
    }
  }
}
</script>

<style lang="scss">

.memeber-page {
  
  th { 
    background: #fff;
  }

  .custom-checkbox {
    position: relative;
    padding:0;
  }
  .custom-control-label:before,
  .custom-control-label:after {
    left:0;
  }
  table {
    min-width:900px;
  }
}

</style>

