<template>
  <view class="goods-item" @click="handleClickGoodsItem(goods)">

    <view class="goods-item-left">
      <radio v-if="radio" :checked="goods.goods_state" color="#C00000"></radio>
      <image class="goods-img" :src="goods.goods_small_logo"></image>
    </view>

    <view class="goods-item-right">

      <view class="goods-name">{{ goods.goods_name }}</view>

      <view class="goods-info-box">
        <text class="goods-price">{{ goods.goods_price ? `￥${goods.goods_price}` : '' }}</text>
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
      }
    },
    data() {
      return {

      };
    },
    methods: {
      handleClickGoodsItem(goods) {
        this.$emit('click', goods);
      }
    }
  }
</script>

<style lang="scss">
  .goods-item {
    display: flex;
    padding: 12px 10px;
    border-bottom: solid 1px #efefef;
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
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }

  .goods-name {
    font-size: 14px;
  }

  .goods-info-box {}

  .goods-price {
    font-size: 16px;
    color: #c00000;
  }
</style>