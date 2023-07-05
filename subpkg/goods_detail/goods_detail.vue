<template>
  <view>
    <swiper class="swiper" :indicator-dots="true" :autoplay="false" :duration="500" :circular="true">
      <swiper-item class="swiper-item" v-for="(item, i) in goodsDetail.pics" :key="i" @click="preview(i)">
        <image class="swiper-image" :src="item.pics_big"></image>
      </swiper-item>
    </swiper>
    
    <view class="goods-info">
      <view class="price">￥{{ goodsDetail.goods_price }}</view>
      <view class="goods-info-body">
        <view class="goods-name">{{ goodsDetail.goods_name }}</view>
        <view class="favi">
          <uni-icons type="star" size="16"></uni-icons>
          <text>收藏</text>
        </view>
      </view>
      <view class="express">快递：免运费</view>
    </view>
    
  </view>
</template>

<script>
  export default {
    onLoad(options) {
      const { goods_id } = options;
      
      this.getGoodsDetail(goods_id);
    },
    data() {
      return {
        goodsDetail: {},
      }
    },
    methods: {
      async getGoodsDetail(goods_id) {
        const { message: detail, meta: { status, msg } } = await uni.$http.get('/api/public/v1/goods/detail', { goods_id });
        
        if (status !== 200) {
          uni.$showToast('数据请求失败');
          return;
        }
        
        this.goodsDetail = detail;
      },
      
      preview(i) {
        const { pics } = this.goodsDetail;
        const urls = pics.map((pic) => pic.pics_big);
        
        uni.previewImage({
          current: i,
          urls,
        });
      },
      
    }
  }
</script>

<style lang="scss">
.swiper {
  height: 750rpx;
  
  .swiper-item {
    
  }
  .swiper-image {
    display: block;
    width: 100%;
    height: 100%;
  }
}

.goods-info {
  padding: 10px;
  padding-right: 0;
  
  .price {
    margin: 10px 0;
    font-size: 18px;
    color: #c00000;
  }
  .goods-info-body {
    display: flex;
    justify-content: space-between;
  }
  .goods-name {
    font-size: 14px;
  }
  .favi {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    
    width: 120px;
    border-left: solid 1px #efefef;
    color: #666;
    font-size: 12px;
  }
  .express {
    margin-top: 12px;
    font-size: 12px;
    color: #666;
  }
}
</style>
