<template>
  <view class="settle-container">

    <label class="radio-box" @click="handleClickRadio">
      <radio :checked="isSelectAll" color="#C00000"></radio>
      <text>全选</text>
    </label>

    <view class="amount-box">
      合计：<text class="amount">￥{{ checkedGoodsAmount }}</text>
    </view>

    <view class="settle-btn" @click="handleClickSettleBtn">结算({{ checkedCount }})</view>
  </view>
</template>

<script>
  import {
    mapGetters,
    mapMutations
  } from 'vuex';

  export default {
    name: "my-settle",
    data() {
      return {

      };
    },
    computed: {
      ...mapGetters('cart', ['total', 'checkedCount', 'checkedGoodsAmount']),
      ...mapGetters('user', ['hasAddress', 'isLogin']),

      isSelectAll() {
        return this.total === this.checkedCount;
      },

      isCheckedGoods() {
        return this.checkedCount > 0;
      },
    },

    methods: {
      ...mapMutations('cart', ['updateAllGoodsState']),
      ...mapMutations('user', ['updateRedirectInfo']),

      handleClickRadio() {
        this.updateAllGoodsState(!this.isSelectAll);
      },

      handleClickSettleBtn() {
        if (!this.isCheckedGoods) {
          uni.$showToast('请选择要结算的商品！');
          return;
        }

        if (!this.hasAddress) {
          uni.$showToast('请选择收货地址！');
          return;
        }

        if (!this.isLogin) {
          this.delayNavToLogin(3);
        }
      },

      delayNavToLogin(delaySecondes) {
        this.showTips(delaySecondes);

        this.timer = setInterval(() => {
          delaySecondes -= 1;

          if (delaySecondes <= 0) {
            clearInterval(this.timer);
            
            uni.switchTab({ 
              url: '/pages/my/my',
              success: () => {
                this.updateRedirectInfo({
                  openType: 'switchTab',
                  from: '/pages/cart/cart',
                });
              }
            });
            
            
            return;
          }

          this.showTips(delaySecondes)
        }, 1000)
      },

      showTips(num) {
        uni.showToast({
          icon: 'none',
          title: `请先登录, ${num}秒后跳转登录`,
          mask: true,
          duration: 1500
        });
      }
    },
  }
</script>

<style lang="scss">
  .settle-container {
    display: flex;
    align-items: center;
    justify-content: space-between;

    z-index: 999;
    position: fixed;
    left: 0;
    bottom: 0;

    padding-left: 10px;
    width: 100%;
    height: 50px;

    background-color: #fff;

    font-size: 14px;

    .radio-box {
      display: flex;
      align-items: center;
      width: 90px;
    }

    .amount-box {
      flex: 1;
    }

    .amount {
      font-weight: bold;
      color: #c00000;
      font-size: 16px;
    }

    .settle-btn {
      padding: 0 10px;
      min-width: 100px;
      height: 50px;
      line-height: 50px;
      text-align: center;
      color: #fff;
      background-color: #c00000;
      font-size: 16px;
    }
  }
</style>