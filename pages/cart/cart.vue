<template>
  <view>
    <view class="cart-title">
      <uni-icons type="shop" size="18"></uni-icons>
      <text class="cart-title-text">购物车</text>
    </view>
    
    <template v-for="(goods, i) in cart" >
      <my-goods :goods="goods" :radio="true" :num-box="true" @radio-change="handleRadioChange" @num-change="handleNumChange" :key="i"></my-goods>
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
      ...mapMutations('cart', ['updateGoodsState', 'updateGoodsCount']),
      
      handleRadioChange(goods) {
        this.updateGoodsState(goods);
      },
      
      handleNumChange({ goods_id, goods_count }) {
        this.updateGoodsCount({ goods_id, goods_count });
      },
    },
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