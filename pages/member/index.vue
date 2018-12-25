<template>
  <section class="">
    <div class="memeber-page">

      <b-table 
        class="text-center" 
        responsive 
        striped 
        hover 
        :fields="tableFields" 
        :items="members">
        
        <template slot="index" slot-scope="data">
          {{ (membersCount - (viewNum * (page-1))) - data.index }}
        </template>

         <template slot="userid" slot-scope="data">
          {{data.item.userid}} <b-badge v-if="data.item.level == 1">관리자</b-badge> <b-badge v-if="data.item.level == 2">최고 관리자</b-badge>
        </template>

        <template slot="register_datetime" slot-scope="data">
          {{ data.item.register_datetime | formatDate }}
        </template>

        <template slot="last_login_date" slot-scope="data">
          {{data.item.last_login_date | formatDateTime}}
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

        <template slot="modify" slot-scope="data">
          <b-button @click="$router.push('/member/write/'+data.item._id)" type="button" size="sm" variant="success">수정</b-button>
        </template>

      </b-table>
      
      <b-pagination 
        size="md" 
        align="center"
        :total-rows="membersCount"  
        :per-page="parseInt(viewNum)"
        :hide-ellipsis=true
        :value="parseInt(page)"
        :limit="10"
        @input="pagenationChange" />

      <ListViewNum
        :selected="parseInt(viewNum)"
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
  
  async fetch ({ app, store, redirect, query }) {

    try {
      await store.dispatch({type:'cookieInit'})

      if(!store.state.auth) {
        redirect('/login')
        return 
      }

      await store.dispatch({type:'getMembersCount'})
      await store.dispatch({type:'getMembers', page:query.page || 1, viewNum: query.viewNum || 10})

    } 
    catch ( e ){
      console.log( e )
    } 
    
  },

  watchQuery: ['page', 'viewNum'],

  components: {
    ListViewNum
  },

  data () {
    return {
      members: this.$store.state.members,
      membersCount: this.$store.state.membersCount,
      page : this.$route.query.page|| 1,
      viewNum : this.$route.query.viewNum || 10,
      tableFields: [
        { key: 'index', label: '번호' },
        { key: 'userid', label: '아이디' },
        { key: 'username', label: '이름' },
        { key: 'nickname', label: '닉네임' },
        { key: 'email', label: '이메일' },
        { key: 'point', label: '포인트' },
        { key: 'register_datetime', label: '가입일' },
        { key: 'last_login_date', label: '최근로그인' },
        { key: 'check_recive', label: '공개/메일/쪽지/문자' },
        { key: 'denied', label: '승인' },
        { key: 'modify', label: '수정' }
      ]
    }
  },

  methods: {

    listViewNmChange ( val ) {
      this.$router.push({
        query: {
          page: 1,
          viewNum: val
        }
      })
      this.page = 1
      this.viewNum = val
    },

    pagenationChange ( val ) {
      this.$router.push({
        query: {
          page: val,
          viewNum: this.viewNum
        }
      })
      this.page = val
    }
  }
}
</script>

<style lang="scss">
.memeber-page {
  padding-bottom:25px
}
.memeber-page {
  th { 
    background: #fff;
  }

  .pagination{margin-top:20px}

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

