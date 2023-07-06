<template>
  <view v-if="isLoaded" class="goods-detail">
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
    
    
    <!-- 商品详情信息 -->
    <rich-text :nodes="goodsDetail.goods_introduce"></rich-text>
    
    <!-- 商品导航区域-->
    <uni-goods-nav 
      class="goods-nav"
      :fill="true"  
      :options="goodsNavConfig.options" 
      :buttonGroup="goodsNavConfig.buttonGroup"  
      @click="handleClickIcons" 
      @buttonClick="handleClickButtons" 
    />
  </view>
</template>

<script>
  import { mapState, mapGetters, mapMutations } from 'vuex';
  
  export default {
    onLoad(options) {
      const { goods_id } = options;
      
      this.getGoodsDetail(goods_id);
    },
    data() {
      return {
        isLoaded: false,
        goodsDetail: {},
        goodsNavConfig: {
          options: [
            {
              icon: 'shop',
              text: '店铺',
            }, 
            {
              icon: 'cart',
              text: '购物车',
              info: 0
            },
          ],
          buttonGroup: [
            {
              text: '加入购物车',
              backgroundColor: '#ff0000',
              color: '#fff'
            },
            {
              text: '立即购买',
              backgroundColor: '#ffa200',
              color: '#fff'
            }
          ]
        }
      }
    },
    
    computed: {
      ...mapState('cart', ['cart']),
      ...mapGetters('cart', ['total']),
    },
    
    watch: {
      total(newVal) {
        const cartOption = this.goodsNavConfig.options.find((item) => item.text === '购物车');
        
        cartOption.info = newVal;
      }
    },
    
    methods: {
      ...mapMutations('cart', ['addToCart']),
      
      async getGoodsDetail(goods_id) {
        const { message: detail, meta: { status, msg } } = await uni.$http.get('/api/public/v1/goods/detail', { goods_id });
        
        if (status !== 200) {
          uni.$showToast('数据请求失败');
          return;
        }
        
        detail.goods_introduce = detail.goods_introduce.replace(/<img /gi, '<img style="display: block" ');
        
        this.goodsDetail = detail;
        this.isLoaded = true;
      },
      
      preview(i) {
        const { pics } = this.goodsDetail;
        const urls = pics.map((pic) => pic.pics_big);
        
        uni.previewImage({
          current: i,
          urls,
        });
      },
      
      handleClickIcons(e) {
        // e: {"index":1,"content":{"icon":"cart","text":"购物车","info":2}}
        if (e.index === 1) {
          uni.switchTab({
            url: '/pages/cart/cart'
          })
        }
      },
      
      handleClickButtons(e) {
        // e: {"index":0,"content":{"text":"加入购物车","backgroundColor":"#ff0000","color":"#fff"}}
        if (e.index === 0) {
          const { goods_id, goods_name, goods_price, goods_small_logo } = this.goodsDetail;
          const goods = {
            goods_id,         // 商品的Id
            goods_name,       // 商品的名称
            goods_price,      // 商品的价格
            goods_count: 1,   // 商品的数量
            goods_small_logo, // 商品的图片
            goods_state: true // 商品的勾选状态
          };
          this.addToCart(goods);
        }
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

.goods-detail {
  padding-bottom: 50px;
}
.goods-nav {
  z-index: 999;
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100%;
}
</style>
