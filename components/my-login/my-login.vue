<template>
  <view class="login-container" >
    
    <uni-icons type="contact-filled" size="100" color="#AFAFAF">></uni-icons>
    
    <button 
      type="primary" 
      class="btn-login" 
      open-type="getUserInfo"
      @getuserinfo="handleGetUserInfo"
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
      
      handleGetUserInfo(e) {
        const { 
          detail: {
            errMsg,
            userInfo,
          },
        } = e;
        
        if (errMsg === 'getUserInfo:fail auth deny') {
          uni.$showToast('您取消了登录授权！');
          return;
        }
        
        this.updateUserInfo(userInfo);
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