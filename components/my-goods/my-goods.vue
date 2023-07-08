<template>
  <view class="goods-item" @click="handleClickGoodsItem(goods)">

    <view class="goods-item-left">
      <radio v-if="radio" :checked="goods.goods_state" color="#C00000" @click="handleClickRadio"></radio>
      <image class="goods-img" :src="goods.goods_small_logo"></image>
    </view>

    <view class="goods-item-right">

      <view class="goods-name">{{ goods.goods_name }}</view>

      <view class="goods-info-box">
        <text class="goods-price">{{ formatPrice(goods.goods_price) }}</text>
        <uni-number-box v-if="numBox" :min="1" :value="goods.goods_count" @change="handleNumBoxChange"></uni-number-box>
      </view>

    </view>

  </view>
</template>

<script>
  export default {
    name: "my-goods",
    props: {
      goods: {
        type: Object,
        default: {},
      },
      radio: {
        type: Boolean,
        default: false,
      },
      numBox: {
        type: Boolean,
        default: false,
      },
    },
    data() {
      return {

      };
    },
    methods: {
      formatPrice(price) {
        if (!price) {
          return '';
        }
        
        return `￥${ Number(price).toFixed(2) }`
      },
      handleClickGoodsItem(goods) {
        this.$emit('click', goods);
      },
      
      handleClickRadio() {
        const { goods_id, goods_state } = this.goods;
        
        const data = {
          goods_id,
          goods_state: !goods_state,
        };
        this.$emit('radio-change', data);
      },
      
      handleNumBoxChange(num) {
        this.$emit('num-change', {
          goods_id: this.goods.goods_id,
          goods_count: num,
        });
      },
    }
  }
</script>

<style lang="scss">
  .goods-item {
    display: flex;
    padding: 12px 10px;
    width: 750rpx;
    border-bottom: solid 1px #efefef;
    box-sizing: border-box;
  }

  .goods-item-left {
    display: flex;
    justify-content: space-between;
    align-items: center;
    
    margin-right: 4px;
  }

  .goods-img {
    display: block;
    width: 100px;
    height: 100px;
    background-color: #efefef;
  }

  .goods-item-right {
    flex: 1;
    
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }

  .goods-name {
    font-size: 14px;
  }

  .goods-info-box {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .goods-price {
    font-size: 16px;
    color: #c00000;
  }
</style>