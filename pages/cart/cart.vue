<template>
  <view>
    <view class="cart-title">
      <uni-icons type="shop" size="18"></uni-icons>
      <text class="cart-title-text">购物车</text>
    </view>
    
    <template v-for="(goods, i) in cart" >
      <my-goods :goods="goods" :radio="true" @radio-change="handleRadioChange" :key="i"></my-goods>
    </template>
  </view>
</template>

<script>
  import { mapState, mapMutations } from 'vuex'
  import tabbarBadge from '@/mixins/tabbar-badge';

  export default {
    mixins: [tabbarBadge],
    data() {
      return {

      }
    },
    computed: {
      ...mapState('cart', ['cart']),
    },
    methods: {
      ...mapMutations('cart', ['updateGoodsState']),
      
      handleRadioChange(goods) {
        this.updateGoodsState(goods);
      },
    }
  }
</script>

<style lang="scss">
  .cart-title {
    height: 40px;
    display: flex;
    align-items: center;
    font-size: 14px;
    padding-left: 5px;
    border-bottom: 1px solid #efefef;

    .cart-title-text {
      margin-left: 10px;
    }
  }
</style>