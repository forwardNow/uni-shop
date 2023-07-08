<template>
  <view class="login-container" >
    
    <uni-icons type="contact-filled" size="100" color="#AFAFAF">></uni-icons>
    
    <button 
      type="primary" 
      class="btn-login" 
      @click="handleLoginBtn"
    >
      一键登录
    </button>
    
    <view class="tips-text">登录后尽享更多权益</view>
    
  </view>
</template>

<script>
  import { mapMutations } from 'vuex';
  
  export default {
    name:"my-login",
    data() {
      return {
        
      };
    },
    methods: {
      ...mapMutations('user', ['updateUserInfo']),
      
      async handleLoginBtn() {
        const [error, res] = await uni.getUserProfile({ desc: '用于完善会员资料' }).catch((e) => e);
        
        if (error && error.errMsg === 'getUserProfile:fail auth deny') {
          uni.$showToast('您取消了登录授权！');
          return;
        }
        
        const { userInfo } = res;
        
        this.updateUserInfo(userInfo);
        
        this.login(res);
      },
      
      async login(info) {
        const [error, result] = await uni.login().catch((e) => e);
        
        if (error || result.errMsg !== 'login:ok') {
          uni.$showToast('登录失败！');
          return;
        }
        
        const data =  {
          code: result.code,
          encryptedData: info.encryptedData,
          iv: info.iv,
          rawData: info.rawData,
          signature: info.signature
        };
        
        // 此 API 登录失败
        const res = await uni.$http.post('/api/public/v1/users/wxlogin', data);
        
        
      },
    },
  }
</script>

<style lang="scss">
.login-container {
  position: relative;
  
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  
  height: 750rpx;
  
  background-color: #f8f8f8;
  
  overflow: hidden;
  
  &::after {
    content: '';
    
    position: absolute;
    bottom: 0;
    left: 0;
    
    width: 100%;
    height: 40px;
    border-radius: 100%;
    background-color: #fff;
    
    transform: translateY(50%);
  }
  
  
  .btn-login {
    width: 90%;
    border-radius: 100px;
    margin: 15px 0;
    background-color: #c00000;
  }
  .tips-text {
    font-size: 12px;
    color: #666;
  }
}
</style>