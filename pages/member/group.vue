<template>
  <section class="">
    <div class="memeber-group-page">
      <b-card>
        <b-form @submit="onSubmit">
          <div class="overflow-hidden">
            
            <div class="float-right">
              <b-button-group>
                <b-button 
                  type="submit" 
                  variant="success">
                  저장하기
                </b-button>
              </b-button-group>
            </div>
          </div>

          <div class="title-line"></div>

          <p>0개의 그룹이 존재합니다</p>

          <b-container class="list-con">
            <b-row class="list-title">
                <b-col>순서변경</b-col>
                <b-col cols="3">그룹명</b-col>
                <b-col cols="5">설명</b-col>
                <b-col>회원수</b-col>
                <b-col>
                  <b-button size="sm" variant="primary" @click="addGroups">추가</b-button>
                </b-col>
            </b-row>

            <draggable 
              v-model="groupList"
              :options="{handle:'.move-btn', invertSwap:true, animation:150}"
              @end="changeDraggable">
              <transition-group>
                  <b-row class="list" v-for="(group, i) in groupList" :key="i">
                    <b-col>
                      <a class="move-btn"><i class="fas fa-arrows-alt"></i></a>
                    </b-col>
                    <b-col cols="3">
                      <div :class="{ 'form-group-error' : $v.groupList.$each[i].title.$error || !$v.groupList.$each[i].title.required}">
                        <b-form-input
                          :state="!$v.groupList.$each[i].title.$error"
                          v-model="groupList[i].title"
                          type="text">
                        </b-form-input>
                        <div class="error" v-if="$v.groupList.$each[i].title.$error && !$v.groupList.$each[i].title.required">그룹명을 입력하세요.</div>
                      </div>
                    </b-col>
                    <b-col cols="5">
                      <b-form-input 
                        v-model="group.description" 
                        type="text">
                      </b-form-input>
                    </b-col>
                    <b-col>{{ groupList[i].count }}</b-col>
                    <b-col>
                      <b-button size="sm" variant="danger" @click="removeGroups(i)">삭제</b-button>
                    </b-col>
                </b-row>
              </transition-group>
            </draggable>

          </b-container>
        </b-form>
      </b-card>
    </div>
  </section>
</template>



<script>
import draggable from 'vuedraggable'
import { validationMixin } from 'vuelidate'
import { required, minLength, maxLength, between, sameAs, integer, email } from 'vuelidate/lib/validators'

export default {
  
  layout: 'default',
  
  async fetch ({ app, store, redirect, query }) {

    try {
      await store.dispatch({type:'cookieInit'})

      if(!store.state.auth) {
        redirect('/login')
        return 
      }

      await store.dispatch({type:'getMemberGroups'})

    } 
    catch ( e ){
      console.log( e )
    } 
  },

  mixins: [
    validationMixin
  ],

  components: {
    draggable
  },

  data () {
    return {
      groupList: this.$store.state.memberGroups
    }
  },

  validations: {
    groupList: {
      $each: {
        title: {
          required
        }
      }
    }
  },

  methods: {

    addGroups () {
      this.groupList.push(
        {
          title: '',
          order: this.groupList.length,
          description: ''
        }
      )
    },

    removeGroups ( idx ) {
      this.groupList.splice(idx, 1)
      for(let i=0; i < this.groupList.length; i++) {
        this.groupList[i].order = i
      }
    },

    changeDraggable () {
     for(let i=0; i < this.groupList.length; i++) {
        this.groupList[i].order = i
      }
    },

    async onSubmit ( e ) {
      e.preventDefault();
       this.$v.$touch()
      
      if (!this.$v.$invalid) {
        try {
          const res = await this.$axios({
            method: 'post',
            url: '/api/admin/member/group/write',
            data: this.groupList,
            headers: { 
              'x-access-token': this.$store.state.auth.accessToken
            }
          })
          if(res.data.success) {
            alert('회원 그룹 저장.')
          }
          else {
            alert('회원 그룹 저장 실패.')
          }
          this.$router.go()
        } catch( e ) {
          console.log( e );
        }
      }
      else {
        setTimeout(() => {
          const invalid = this.$el.querySelectorAll('.is-invalid')
          if(invalid.length > 0)
          {
            invalid[0].focus()
          }
        })
      }
    }
  }
}
</script>

<style lang="scss">

  $lineColor: #a4b7c1;

  .memeber-group-page{
    .title-line {
      width:100%;
      height:1px;
      background-color: $lineColor;
      margin:15px 0;
    }
    .container {
      max-width:100%
    }
    .container{
      border-top:solid 1px $lineColor;
      border-bottom:solid 1px $lineColor;
    }
    .container .row {
      border-left:solid 1px $lineColor;
      border-right:solid 1px $lineColor;
    }
    .container .list{
      border-top:solid 1px $lineColor;
    }
    .container .row > div {
      padding:15px;
      text-align: center;
    }
    
    .sortable-ghost {
      background:rgb(242,242,242);
    }

    .move-btn {
      font-size:22px;
      cursor:move;
    }
    .form-group-error .error {
      display: block;
      text-align: left;
    }

    .form-control.is-valid{
      border-color:#c2cfd6 !important;
    }
  }
  
</style>

