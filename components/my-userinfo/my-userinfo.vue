<template>
  <view class="my-userinfo-container">
    <view class="top-box">
      <image class="avatar" :src="userInfo.avatarUrl"></image>
      <view class="nickname">{{ userInfo.nickName }}</view>
    </view>
  </view>
</template>

<script>
  import { mapState } from 'vuex';
  
  export default {
    name: "my-userinfo",
    data() {
      return {

      };
    },
    computed: {
      ...mapState('user', ['userInfo']),
    },
  }
</script>

<style lang="scss">
.my-userinfo-container {
  height: 100%;
  background-color: #f4f4f4;
  
  .top-box {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    
    height: 400rpx;
    
    background-color: #c00000;
  }
  .avatar {
    display: block;
    width: 90px;
    height: 90px;
    border-radius: 45px;
    border: 2px solid white;
    box-shadow: 0 1px 5px #000;
  }
  .nickname {
    margin-top: 10px;
    color: #fff;
    font-weight: bold;
    font-size: 16px;
  }
}
</style>