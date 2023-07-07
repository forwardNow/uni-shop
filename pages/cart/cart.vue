<template>
  <view>
    
    <my-address />
    
    <view class="cart-title">
      <uni-icons type="shop" size="18"></uni-icons>
      <text class="cart-title-text">购物车</text>
    </view>
    
    <uni-swipe-action ref="swipe">
      <template v-for="(goods, i) in cart">
        
        <uni-swipe-action-item :right-options="swiperActionOptions" @click="handleClickSwipeButton(goods)">
          <my-goods
            :key="i"
            :goods="goods" 
            :radio="true" 
            :num-box="true"
            @radio-change="handleRadioChange" 
            @num-change="handleNumChange" 
          />
        </uni-swipe-action-item>
        
      </template>
    </uni-swipe-action>
    
  </view>
</template>

<script>
  import { mapState, mapMutations } from 'vuex'
  import tabbarBadge from '@/mixins/tabbar-badge';

  export default {
    mixins: [tabbarBadge],
    
    onHide() {
      this.$refs.swipe.closeAll();
    },
    
    data() {
      return {
        swiperActionOptions: [
          {
            text: '删除',
            style: {
              backgroundColor: '#C00000'
            }
          }
        ],
      };
    },
    computed: {
      ...mapState('cart', ['cart']),
    },
    methods: {
      ...mapMutations('cart', ['updateGoodsState', 'updateGoodsCount', 'deleteGoods']),
      
      handleRadioChange(goods) {
        this.updateGoodsState(goods);
      },
      
      handleNumChange({ goods_id, goods_count }) {
        this.updateGoodsCount({ goods_id, goods_count });
      },
      handleClickSwipeButton(goods) {
        this.deleteGoods(goods);
      }
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