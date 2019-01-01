<template>
  <section class="container">
    <div class="memeber-write-page">
        <b-card>
          <b-form @submit="onSubmit">

            <b-form-group
              label="<span>*</span> 회원 아이디"
              label-class="form-label text-right"
              :label-cols="2"
              :horizontal="true">
              <div :class="{ 'form-group-error' : $v.form.userid.$error || !$v.form.userid.required}">
                <b-form-input 
                  ref="userid" 
                  id="userid" 
                  :value="form.userid"
                  :state="!$v.form.userid.$error"
                  @change.native="form.userid = $event.target.value; $v.form.userid.$touch()"
                  type="text">
                </b-form-input>
                <div class="error" v-if="$v.form.userid.$error && !$v.form.userid.required">아이디를 입력하세요.</div>
                <div class="error" v-if="$v.form.userid.$error && !$v.form.userid.minLength">아이디는 4자 이상 입력하세요.</div>
              </div>
            </b-form-group>

            <b-form-group
              label="<span>*</span> 회원 이메일"
              :label-class="[ 'form-label', 'text-right' ]"
              :label-cols="2"
              :horizontal="true">
              <div :class="{ 'form-group-error' : $v.form.email.$error || !$v.form.email.required }">
                <b-form-input 
                  ref="email" 
                  id="email"
                  :value="form.email" 
                  :state="!$v.form.email.$error"
                  @change.native="form.email = $event.target.value; $v.form.email.$touch()"
                  type="text">
                </b-form-input>
                <div class="error" v-if="$v.form.email.$error && !$v.form.email.required">이메일을 입력하세요.</div>
                <div class="error" v-if="$v.form.email.$error && !$v.form.email.email">올바른 이메일 형식이 아닙니다.</div>
              </div>
            </b-form-group>

            <b-form-group
              :label="this.$store.state.member ? '패스워드' : '<span>*</span> 패스워드'"
              label-class="form-label text-right"
              :label-cols="2"
              :horizontal="true">
              <div :class="{ 'form-group-error' : $v.form.password.$error || !$v.form.password.required }">
                <b-form-input 
                  ref="password" 
                  id="password" 
                  :state="!$v.form.password.$error"
                  @change.native="form.password = $event.target.value; $v.form.password.$touch()"
                  type="password">
                </b-form-input>
                <div class="error" v-if="$v.form.password.$error && !$v.form.password.required">패스워드를 입력하세요.</div>
                <div class="error" v-if="$v.form.password.$error && !$v.form.password.minLength">패스워드는 4자 이상 입력하세요.</div>
              </div>
            </b-form-group>

            <b-form-group
              label="<span>*</span> 회원이름"
              label-class="form-label text-right"
              :label-cols="2"
              :horizontal="true">
              <div :class="{ 'form-group-error' : $v.form.username.$error || !$v.form.username.required }">
                <b-form-input 
                  ref="username" 
                  id="username" 
                  :state="!$v.form.username.$error"
                  :value="form.username" 
                  @change.native="form.username = $event.target.value; $v.form.username.$touch()"
                  type="text">
                </b-form-input>
                <div class="error" v-if="$v.form.username.$error && !$v.form.username.required">이름를 입력하세요.</div>
              </div>
            </b-form-group>

            <b-form-group
              label="회원 그룹"
              label-class="form-label text-right"
              :label-cols="2"
              :horizontal="true">
              <b-form-checkbox
                v-for="(group, i) in groupList"
                v-model="form.groups"
                :value="group._id"
                :key="group._id"
                :id="'gorup_chk_'+i">
                {{ group.title }}
              </b-form-checkbox>
            </b-form-group>

            <b-form-group
              label="<span>*</span> 생년월일"
              label-class="form-label text-right"
              :label-cols="2"
              :horizontal="true">

              <div :class="{ 'form-group-error' : $v.form.birthday.$error || !$v.form.birthday.required }">
                <datepicker 
                  :inputClass="{'form-control' : true, 'is-invalid': $v.form.birthday.$error, 'is-valid': ! $v.form.birthday.$error && $v.form.birthday.required }"
                  name="birthday" 
                  format="yyyy-MM-dd" 
                  v-model="form.birthday"
                  initial-view="year"
                  :language="ko">
                </datepicker>
                <div class="error" v-if="$v.form.birthday.$error && !$v.form.birthday.required">생년월일을 입력하세요.</div>
              </div>

            </b-form-group>

            <b-form-group
              label="<span>*</span> 연락처"
              label-class="form-label text-right"
              :label-cols="2"
              :horizontal="true">
              <div :class="{ 'form-group-error' : ($v.form.phone2.$error || !$v.form.phone2.required) || ($v.form.phone3.$error || !$v.form.phone3.required) }">
                <b-form-select 
                  ref="phone1" 
                  id="phone1" 
                  v-model="form.phone1" 
                  :options="phoneOption"
                /> - 
                <b-form-input 
                  ref="phone2" 
                  id="phone2" 
                  :state="!$v.form.phone2.$error"
                  @change.native="form.phone2 = $event.target.value; $v.form.phone2.$touch()"
                  type="text" 
                  maxlength="4" 
                  :value="form.phone2"
                  v-numberOnly>
                </b-form-input> - 
                <b-form-input 
                  ref="phone3" 
                  id="phone3" 
                  :state="!$v.form.phone3.$error"
                  @change.native="form.phone3 = $event.target.value; $v.form.phone3.$touch()"
                  type="text" 
                  maxlength="4"
                  :value="form.phone3" 
                  v-numberOnly>
                </b-form-input>
                <div class="error" v-if="($v.form.phone2.$error && (!$v.form.phone2.required || !$v.form.phone2.minLength)) || ($v.form.phone3.$error && (!$v.form.phone3.required || !$v.form.phone3.minLength))">연락처를 입력하세요.</div>
              </div>
              
            </b-form-group>

            <b-form-group
              label="<span>*</span> 우편번호"
              label-class="form-label text-right"
              :label-cols="2"
              :horizontal="true">
              <div :class="{ 'form-group-error' : $v.form.zipcode.$error || !$v.form.zipcode.required }">
                <b-form-input 
                  v-b-modal.addressModal 
                  ref="zipcode" 
                  id="zipcode" 
                  :state="!$v.form.zipcode.$error"
                  v-model="form.zipcode"
                  type="text" 
                  readonly>
                </b-form-input>
                <b-button variant="outline-dark" v-b-modal.addressModal>검색</b-button>

                <b-modal id="addressModal" ref="addressModal" @show="showAddressModal" @hidden="hideAddressModal" size="lg">
                  <component :is="daumPostcode" @complete="handleAddress"></component>
                </b-modal>
                <div class="error" v-if="$v.form.zipcode.$error && !$v.form.zipcode.required">우편번호를 입력하세요.</div>
              </div>
            </b-form-group>

            <b-form-group
              label="<span>*</span> 주소"
              label-class="form-label text-right"
              :label-cols="2"
              :horizontal="true">
              <div :class="{ 'form-group-error' : ($v.form.address1.$error || !$v.form.address1.required) || ($v.form.address2.$error || !$v.form.address2.required) }">
                <b-form-input 
                  v-b-modal.addressModal 
                  ref="address1" 
                  id="address1" 
                  :state="!$v.form.address1.$error"
                  v-model="form.address1"
                  type="text" 
                  readonly>
                </b-form-input>
                <b-form-input 
                  ref="address2" 
                  id="address2" 
                  :value="form.address2"
                  :state="!$v.form.address2.$error"
                  @change.native="form.address2 = $event.target.value; $v.form.address2.$touch()"
                  type="text">
                </b-form-input>
                <div class="error" v-if="$v.form.address1.$error && !$v.form.address1.required">주소를 입력하세요.</div>
                <div class="error" v-if="(!$v.form.address1.$error && $v.form.address1.required) && ($v.form.address2.$error && !$v.form.address2.required)">나머지 주소를 입력하세요.</div>
              </div>
            </b-form-group>

            <b-form-group
              label="홈페이지"
              label-class="form-label text-right"
              :label-cols="2"
              :horizontal="true">
              <b-form-input 
                ref="homepage" 
                id="homepage" 
                v-model="form.homepage" 
                type="text">
              </b-form-input>
            </b-form-group>

            <b-form-group
              label="회원레벨"
              label-class="form-label text-right"
              :label-cols="2"
              :horizontal="true">
              <b-form-select 
                ref="level" 
                v-model="form.level" 
                :options="levelOption">
              </b-form-select>
            </b-form-group>

            <b-form-group
              label="포인트"
              label-class="form-label text-right"
              :label-cols="2"
              :horizontal="true">
              <b-form-input 
                ref="point" 
                v-model="form.point" 
                min="0"
                type="number">
              </b-form-input>
            </b-form-group>

            <b-form-group
              label="프로필 사진"
              label-class="form-label text-right"
              :label-cols="2"
              :horizontal="true">

              <img 
                v-if="form.photo" 
                :src="$uploadUrl+form.photo"
                width=80
                height=80
                style="margin-bottom:10px;border:solid 1px #c2cfd6" />

              <b-form-file 
                id="photo"
                ref="photo" 
                v-model="form.file"  
                accept="image/*" 
                plain>
              </b-form-file>

              <div>5MB 이하 제한. 가로길이 : 80px, 세로길이 : 80px 에 최적화되어있습니다</div>

            </b-form-group>

            <b-form-group
              label="메일수신"
              label-class="form-label text-right"
              :label-cols="2"
              :horizontal="true">
              <b-form-checkbox 
                id="receive_email"
                ref="receive_email" 
                v-model="form.receive_email">
                사용합니다
              </b-form-checkbox>
            </b-form-group>

            <b-form-group
              label="쪽지사용"
              label-class="form-label text-right"
              :label-cols="2"
              :horizontal="true">
              <b-form-checkbox
                id="use_note" 
                ref="use_note" 
                v-model="form.use_note">
                사용합니다
              </b-form-checkbox>
            </b-form-group>

            <b-form-group
              label="SMS 문자받기"
              label-class="form-label text-right"
              :label-cols="2"
              :horizontal="true">
              <b-form-checkbox 
                id="receive_sms" 
                ref="receive_sms" 
                v-model="form.receive_sms">
                사용합니다
              </b-form-checkbox>
            </b-form-group>

            <b-form-group
              label="프로필공개"
              label-class="form-label text-right"
              :label-cols="2"
              :horizontal="true">
              <b-form-checkbox 
                id="open_profile"
                ref="open_profile" 
                v-model="form.open_profile">
                사용합니다
              </b-form-checkbox>
            </b-form-group>

            <b-form-group
              label="승인상태"
              label-class="form-label text-right"
              :label-cols="2"
              :horizontal="true">
              <b-form-select 
                  ref="denied" 
                  v-model="form.denied"
                  :options="deniedOption"/>
            </b-form-group>

            <b-form-group
              label="프로필"
              label-class="form-label text-right"
              :label-cols="2"
              :horizontal="true">
              <b-form-textarea 
                ref="profile_content" 
                v-model="form.profile_content" 
                type="number"
                :rows="3" />
            </b-form-group>

            <b-form-group
              label="관리자용 메모"
              label-class="form-label text-right"
              :label-cols="2"
              :horizontal="true">
              <b-form-textarea 
                ref="admin_memo" 
                v-model="form.admin_memo" 
                type="number"
                :rows="3" />
            </b-form-group>

            <div class="align-center">
              <b-button @click="$router.push('/member')" type="button" variant="danger">취소</b-button>
              <b-button type="submit" variant="primary">확인</b-button>
            </div>

          </b-form>
        </b-card>
    </div>
  </section>
</template>

<script>

import { ObjectUtils, StringUtils } from '~/plugins/utils'
import { ko } from '~/plugins/datePickerLocale/'
import DaumPostcode from '~/components/helper/DaumPostcode'
import Datepicker from 'vuejs-datepicker'
import { validationMixin } from 'vuelidate'
import { required, minLength, maxLength, between, sameAs, integer, email } from 'vuelidate/lib/validators'

export default {

  layout: 'default',

  async fetch ({ store, redirect, query }) {

    try {
      await store.dispatch({type:'cookieInit'})
      if(!store.state.auth) {
        redirect('/login')
        return
      }

      await store.dispatch({type:'getMemberGroups'})
      
      if(query.id) {
        await store.dispatch({type:'getMember', id:query.id})
      }

    } catch( e ) {}
  },

  mixins: [
    validationMixin
  ],

  components: {
    Datepicker
  },

 
  validations: {
    form: {
      userid: {
        required,
        minLength: minLength(4)
      },
      password: {
        required ( value ) {
          if(this.$store.state.member) return true;
          return value
        },
        minLength: minLength(4)
      },
      email: {
        required,
        email
      },
      username: {
        required
      },
      birthday: {
        required
      },
      phone2: {
        required,
        minLength: minLength(3)
      },
      phone3: {
        required,
        minLength: minLength(4)
      },
      zipcode: {
        required
      },
      address1: {
        required
      },
      address2: {
        required
      }
    }
  },
  
  data () {
    return {
      baseUrl:'',
      form: {
        userid: this.$store.state.member ? this.$store.state.member.userid : '',
        email: this.$store.state.member ? this.$store.state.member.email : '',
        password: '',
        username: this.$store.state.member ? this.$store.state.member.username : '',
        nickname: this.$store.state.member ? this.$store.state.member.nickname : '',
        address1: this.$store.state.member ? this.$store.state.member.address[0] : '',
        address2: this.$store.state.member ? this.$store.state.member.address[1] : '',
        level: this.$store.state.member ? this.$store.state.member.level : 0,
        phone1: this.$store.state.member ? StringUtils.slicePhoneNumber(this.$store.state.member.phone, 0) : '010',
        phone2: this.$store.state.member ? StringUtils.slicePhoneNumber(this.$store.state.member.phone, 1) : '',
        phone3: this.$store.state.member ? StringUtils.slicePhoneNumber(this.$store.state.member.phone, 2) : '',
        zipcode: this.$store.state.member ? this.$store.state.member.zipcode : '',
        homepage: this.$store.state.member ? this.$store.state.member.homepage : '',
        birthday: this.$store.state.member ? this.$store.state.member.birthday : null,
        point: this.$store.state.member ? this.$store.state.member.point : 0,
        photo: this.$store.state.member ? this.$store.state.member.photo : '',
        receive_email: this.$store.state.member ? this.$store.state.member.receive_email : true,
        use_note: this.$store.state.member ? this.$store.state.member.use_note : true,
        receive_sms: this.$store.state.member ? this.$store.state.member.receive_sms : true,
        open_profile: this.$store.state.member ? this.$store.state.member.open_profile : true,
        denied: this.$store.state.member ? this.$store.state.member.denied : false,
        profile_content: this.$store.state.member ? this.$store.state.member.profile_content : '',
        admin_memo: this.$store.state.member ? this.$store.state.member.admin_memo : '',
        file: null,
        groups: this.$store.state.member ? this.$store.state.member.groups : []
      },

      groupList: this.$store.state.memberGroups,

      levelOption: [
        { value: 0, text: '일반 회원', selected: true },
        { value: 1, text: '관리자 회원' }
      ],

      phoneOption: [
        { value: '010', text: '010', selected: true },
        { value: '011', text: '011' },
        { value: '016', text: '016' },
        { value: '017', text: '017' },
        { value: '018', text: '018' },
        { value: '019', text: '019' }
      ],

      deniedOption: [
        { value: false, text: '승인', selected: true},
        { value: true, text: '차단' }
      ],

      daumPostcode: null,

      ko: ko
    }
  },

  

  methods: {
    async onSubmit ( e ) {
      e.preventDefault()
      this.$v.$touch()
      
      if (!this.$v.$invalid) {

        const data = ObjectUtils.clone(this.form)

        if(!this.$store.state.member) {
          try {
            const res = await this.checkOverap( data.userid, data.email )
            if(res.data.error) {
              alert(res.data.error.message)
              if(res.data.error.code == 403)
              {
                this.$store.dispatch('logout').then(() => {
                    this.$router.push('/login')
                })
              }
              return
            }
          } catch ( e ) {
            console.log(e)
            return
          }
        }

        let photo = ''
        if(data.file){
          try {
            const res = await this.uploadFile( data.file )
            photo = res.data.body.filename
          } catch ( e ) {
            console.log(e)
            return
          }
        }
        
        data.phone = data.phone1+'-'+data.phone2+'-'+data.phone3
        data.address = []

        if(data.address1) data.address.push(data.address1)
        if(data.address2) data.address.push(data.address2)

        if(photo) {
          data.photo = '/uploads/member/' + photo
        }

        try {
          let res;
          if(!this.$store.state.member) {
            res = await this.$axios({
                method: 'post',
                url: '/api/admin/member/write',
                data: data,
                headers: { 
                  'x-access-token': this.$store.state.auth.accessToken
                }
            })
          } else {
            res = await this.$axios({
                method: 'post',
                url: '/api/admin/member/update',
                data: data,
                params: {
                  id:this.$store.state.member._id
                },
                headers: { 
                  'x-access-token': this.$store.state.auth.accessToken
                }
            })
          }

          if(res.data.success) {
            if(!this.$store.state.member) {
              alert('회원 가입 성공.')
            } else {
              alert('회원 수정 성공.')
            }
            this.$router.push('/member')
          }
          else {
            alert(res.data.error.message)
            if(res.data.error.code == 403)
            {
              this.$store.dispatch('logout').then(() => {
                  this.$router.push('/login')
              })
            }
          }
        } catch(e) {
          console.log(e)
          return
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
    },

    async uploadFile ( file ) {
      try {
        let formData = new FormData()
        formData.append('action', 'ADD')
        formData.append('file', file)
        
        const res = await this.$axios({
          method: 'post',
          url: '/api/uploads',
          data: formData,
          params: {
            path: 'member',
            fileSize: 5
          },
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        })
        return res
      } catch( e ) {
        throw e
      }
    },

    async checkOverap(userid, email) {
      try {
        const res = await this.$axios({
          method: 'post',
          url: '/api/admin/member/check-overap',
          data: {
            userid: userid,
            email: email
          },
          headers: { 
            'x-access-token': this.$store.state.auth.accessToken 
          }
        })
        return res
      } catch( e ) {
        throw e
      }
    },

    handleAddress ( data ) {
      this.form.zipcode = data.zonecode
      this.form.address1 = data.buildingName ? data.address+' ('+data.buildingName+')' : data.address
      this.$v.form.zipcode.$touch()
      this.$v.form.address1.$touch()
      this.$refs.addressModal.hide()
    },

    showAddressModal () {
      this.daumPostcode = DaumPostcode
    },

    hideAddressModal() {
      this.daumPostcode = null
    }
  }
}
</script>

<style lang="scss"> 
.memeber-write-page {
  input.form-control,
  select.form-control {
    max-width: 200px;
  }

  input[readonly].form-control {
    background-color: #fff;
  }

  select[id*="phone"],
  input[id*="phone"] {
    width: 100px;
    display: inline-block;
    ime-mode: disabled;
  }
  input[id*="zipcode"] {
    display: inline-block;
    vertical-align: middle;
  }
  #address1,
  #address2,
  #homepage,
  #photo,
  textarea {
    max-width: 700px;
  }
  #address2 {
    margin-top: 10px;
  }

  label > span,
  legend > span {
    color: #ff0000;
  }
  .error {
    display: none;
  }
  .form-group-error .error {
    display: block;
  }

  .form-group-error .form-control.is-valid{
    border-color:#c2cfd6 !important;
  }

  .custom-checkbox{
    position:relative;
    top:5px;
  }
}

</style>


