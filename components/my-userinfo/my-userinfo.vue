<template>
  <view class="my-userinfo-container">
    <view class="top-box">
      <image class="avatar" :src="userInfo.avatarUrl"></image>
      <view class="nickname">{{ userInfo.nickName }}</view>
    </view>

    <!-- 面板的列表区域 -->
    <view class="panel-list">

      <view class="panel">
        <view class="panel-body">
          <view class="cont-item">
            <text>8</text>
            <text>收藏的店铺</text>
          </view>
          <view class="cont-item">
            <text>14</text>
            <text>收藏的商品</text>
          </view>
          <view class="cont-item">
            <text>18</text>
            <text>关注的商品</text>
          </view>
          <view class="cont-item">
            <text>84</text>
            <text>足迹</text>
          </view>
        </view>
      </view>

      <!-- 第二个面板 -->
      <view class="panel">
        <view class="panel-title">我的订单</view>
        <view class="panel-body">
          <view class="cont-item">
            <image src="/static/my-icons/icon1.png" class="icon"></image>
            <text>待付款</text>
          </view>
          <view class="cont-item">
            <image src="/static/my-icons/icon2.png" class="icon"></image>
            <text>待收货</text>
          </view>
          <view class="cont-item">
            <image src="/static/my-icons/icon3.png" class="icon"></image>
            <text>退款/退货</text>
          </view>
          <view class="cont-item">
            <image src="/static/my-icons/icon4.png" class="icon"></image>
            <text>全部订单</text>
          </view>
        </view>
      </view>


      <view class="panel">
        <view class="list-item">
          <text>收货地址</text>
          <uni-icons type="arrowright" size="15"></uni-icons>
        </view>
        <view class="list-item">
          <text>联系客服</text>
          <uni-icons type="arrowright" size="15"></uni-icons>
        </view>
        <view class="list-item">
          <text>退出登录</text>
          <uni-icons type="arrowright" size="15"></uni-icons>
        </view>
      </view>

    </view>

  </view>
</template>

<script>
  import {
    mapState
  } from 'vuex';

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

  .panel-list {
    padding: 0 10px;
    position: relative;
    top: -10px;

    .panel {
      background-color: white;
      border-radius: 3px;
      margin-bottom: 8px;

      .panel-title {
        line-height: 45px;
        padding-left: 10px;
        font-size: 15px;
        border-bottom: 1px solid #f4f4f4;
      }

      .panel-body {
        display: flex;
        justify-content: space-around;

        .cont-item {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: space-around;
          font-size: 13px;
          padding: 10px 0;

          .icon {
            width: 35px;
            height: 35px;
          }
        }
      }
    }

    .list-item {
      height: 45px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      font-size: 15px;
      padding: 0 10px;
    }
  }
</style>