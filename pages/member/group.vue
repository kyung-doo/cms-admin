<template>
  <section class="">
    <div class="memeber-group-page">
      <b-card>
        <div class="overflow-hidden">
          
          <div class="float-right">
            <b-button-group>
              <b-button 
                type="button" 
                variant="success">
                저장하기
              </b-button>
            </b-button-group>
          </div>
        </div>

        <div class="title-line"></div>

        <p>2개의 그룹이 존재합니다</p>

        <b-container class="list-con">
          <b-row class="list-title">
              <b-col>순서변경</b-col>
              <b-col>그룹명</b-col>
              <b-col>설명</b-col>
              <b-col>기본 그룹</b-col>
              <b-col>회원수</b-col>
              <b-col>
                <b-button size="sm" variant="primary" @click="addGroups">추가</b-button>
              </b-col>
          </b-row>
          <b-row class="list" v-for="group in groupList" :key="group.title">
              <b-col>test</b-col>
              <b-col>test</b-col>
              <b-col>test</b-col>
              <b-col>test</b-col>
              <b-col>test</b-col>
              <b-col>
                <b-button size="sm" variant="danger">삭제</b-button>
              </b-col>
          </b-row>
        </b-container>

      </b-card>
    </div>
  </section>
</template>



<script>


export default {
  
  layout: 'default',
  
  async fetch ({ app, store, redirect, query }) {

    try {
      await store.dispatch({type:'cookieInit'})

      if(!store.state.auth) {
        redirect('/login')
        return 
      }

    } 
    catch ( e ){
      console.log( e )
    } 
  },

  data () {
    return {
      groupList: []
    }
  },

  methods: {

    addGroups () {
      this.groupList.push(
        {
          title: '',
          isDefault: false,
          order: this.groupList.length,
          description: ''
        }
      )
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
    .container .row .col {
      padding:15px;
    }
  }
</style>

