<template>
  <view class="settle-container">
    
    <label class="radio-box" @click="handleClickRadio">
      <radio :checked="isSelectAll" color="#C00000"></radio>
      <text>全选</text>
    </label>
    
    <view class="amount-box">
      合计：<text class="amount">￥{{ checkedGoodsAmount }}</text>
    </view>
    
    <view class="settle-btn">结算({{ checkedCount }})</view>
  </view>
</template>

<script>
  import { mapGetters, mapMutations } from 'vuex';
  
  export default {
    name:"my-settle",
    data() {
      return {
        
      };
    },
    computed: {
      ...mapGetters('cart', ['total', 'checkedCount', 'checkedGoodsAmount']),
      
      isSelectAll() {
        return this.total === this.checkedCount;
      },
    },
    
    methods: {
      ...mapMutations('cart', ['updateAllGoodsState']),
      
      handleClickRadio() {
        this.updateAllGoodsState(!this.isSelectAll);
      },
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