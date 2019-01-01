<template>
  <section class="">
    <div class="memeber-page">

      <b-card>

        <div class="overflow-hidden">

          <div class="float-left">
            
          </div>

          <div class="float-right">
            <b-button-group>
              <b-button 
                @click="downloadExcel" 
                variant="primary" 
                type="button" >
                <i class="fas fa-file-excel"></i> 엑셀 다운로드
              </b-button>
              <b-button 
                @click="deleteMembers" 
                type="button" 
                variant="danger" 
                :disabled="checkOne">
                선택삭제
              </b-button>
              <b-button 
                @click="$router.push('/member/write')" 
                type="button" 
                variant="success">
                회원추가
              </b-button>
            </b-button-group>
          </div>
          
        </div>

        <b-table 
          class="text-center" 
          responsive 
          striped 
          hover 
          :fields="tableFields" 
          :items="members">

          <template slot="HEAD_remove" slot-scope="data">
            <b-form-checkbox 
              id="check-all" 
              v-model="checkAll" 
              @click.native.stop />
          </template>
          
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

          <template slot="groups" slot-scope="data">
            <span v-for="(group, i) in data.item.groups" :key="i">
              {{ (data.item.groups.length-1 > i ) ? group.title+', ' : group.title }}
            </span>
          </template>

          <template slot="check_recive" slot-scope="data">
            <b-form-checkbox 
              :checked="data.item.open_profile" 
              :disabled="true" />
            <b-form-checkbox 
              :checked="data.item.receive_email" 
              :disabled="true" />
            <b-form-checkbox 
              :checked="data.item.use_note" 
              :disabled="true" />
            <b-form-checkbox 
              :checked="data.item.receive_sms" 
              :disabled="true" />
          </template>

          <template slot="denied" slot-scope="data">
            {{data.item.denied ? '차단' : '승인'}}
          </template>

          <template slot="modify" slot-scope="data">
            <b-button 
              @click="$router.push({path:'/member/write', query: {id: data.item._id}})" 
              type="button" 
              size="sm" 
              variant="success">
              수정
            </b-button>
          </template>

          <template slot="remove" slot-scope="data">
            <b-form-checkbox 
              :id="'check-' + data.index" 
              v-model="checkMembers" 
              :value="data.item._id" 
              @click.native.stop />
          </template>

        </b-table>

        <div class="overflow-hidden">

          <div class="float-left">
            <ListViewNum
              :selected="parseInt(viewNum)"
              @change="listViewNmChange" />
          </div>

          <div class="float-right">
            <b-button-group>
              <b-button 
                @click="deleteMembers" 
                type="button" 
                variant="danger" 
                :disabled="checkOne">
                선택삭제
              </b-button>
              <b-button 
                @click="$router.push('/member/write')" 
                type="button" 
                variant="success">
                회원추가
              </b-button>
            </b-button-group>
          </div>

        </div>

        <b-pagination 
        size="md" 
        align="center"
        :total-rows="membersCount"  
        :per-page="parseInt(viewNum)"
        :hide-ellipsis=true
        :value="parseInt(page)"
        :limit="10"
        prev-text="<i class='fas fa-angle-left'></i>"
        next-text="<i class='fas fa-angle-right'></i>"
        first-text="<i class='fas fa-angle-double-left'></i>"
        last-text="<i class='fas fa-angle-double-right'></i>"
        @input="pagenationChange" />

      </b-card>

    </div>
  </section>
</template>



<script>
import ListViewNum from '~/components/helper/ListViewNum'
import XLSX from 'xlsx'

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
      page: this.$route.query.page|| 1,
      viewNum: this.$route.query.viewNum || 10,
      checkMembers: [],
      tableFields: [
        { key: 'index', label: '번호' },
        { key: 'userid', label: '아이디' },
        { key: 'username', label: '이름' },
        { key: 'nickname', label: '닉네임' },
        { key: 'email', label: '이메일' },
        { key: 'point', label: '포인트' },
        { key: 'register_datetime', label: '가입일' },
        { key: 'last_login_date', label: '최근로그인' },
        { key: 'groups', label: '회원 그룹' },
        { key: 'check_recive', label: '공개/메일/쪽지/문자' },
        { key: 'denied', label: '승인' },
        { key: 'modify', label: '수정' },
        { key: 'remove', label: '' }
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
    },

    pagenationChange ( val ) {
      this.$router.push({
        query: {
          page: val,
          viewNum: this.viewNum
        }
      })
    },

    async deleteMembers () {
      if(this.checkMembers.length > 0) {

        try {
          const res = await this.$axios({
              method: 'post',
              url: '/api/admin/member/delete',
              data: {
                ids: this.checkMembers
              },
              headers: { 
                'x-access-token': this.$store.state.auth.accessToken
              }
          })
          
          if(res.data.success) {
            alert('선택하신 회원을 삭제 하였습니다.')
            this.$router.go()
          }
          else {
            alert(res.data.error.message)
            if(res.data.error.code == 403)
            {
              this.$store.dispatch('logout').then(() => {
                  this.$router.push('/login')
              })
            }
            else {
              this.$router.go()
            }
          }
        } catch(e) {
          console.log(e)
          return
        }
        
      }
    },

    downloadExcel () {
      let exelData = []
      this.members.forEach(( member, i ) => {
        exelData.push({
          "아이디": member.userid,
          "이름": member.username,
          "닉네임": member.nickname,
          "이메일": member.email,
          "포인트": member.point,
          "가입일": new Date( member.register_datetime ).format('yyyy-MM-dd'),
          "최근로그인": member.last_login_date ? new Date( member.last_login_date ).format('yyyy-MM-dd hh:mm:ss') : ''
        })
      });
      var memberWS = XLSX.utils.json_to_sheet(exelData)
      var wb = XLSX.utils.book_new()
      XLSX.utils.book_append_sheet(wb, memberWS, '회원 정보')
      XLSX.writeFile(wb, '회원정보-'+new Date().format('yyyy-MM-dd')+'.xlsx')
    }
  },

  computed: {
    checkAll: {
      get: function () {
        return this.members ? this.checkMembers.length == this.members.length : false;
      },
      set: function (value) {
        var checked = [];

        if (value) {
            this.members.forEach(function (member) {
                checked.push(member._id);
            });
        }

        this.checkMembers = checked;
      }
    },

    checkOne: function () {
      return this.checkMembers.length > 0 ? false : true
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
    margin-top:25px;
  }

  .btn-group {
    border-radius: 5px;
    overflow: hidden;
  }
}

</style>

