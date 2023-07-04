<template>
  <view>
    <view class="goods-list">
      <template v-for="(item, i) in goodsList">
        <view class="goods-item" :key="i">
          
          <view class="goods-item-left">
            <image class="goods-img" :src="item.goods_small_logo"></image>
          </view>
          
          <view class="goods-item-right">
            
            <view class="goods-name">{{ item.goods_name }}</view>
            
            <view class="goods-info-box">
              <text class="goods-price">{{ item.goods_price ? `￥${item.goods_price}` : '' }}</text>
            </view>
            
          </view>
          
        </view>
      </template>
    </view>
  </view>
</template>

<script>
  export default {
    onLoad(options) {
      this.initRequestParam(options);
      this.getGoodsList();
    },
    
    data() {
      return {
        requestParams: {
          query: '',
          cid: '',
          pagenum: 1,
          pagesize: 10,
        },
        
        goodsList: [],
        
        total: 0,
      }
    },
    methods: {
      initRequestParam(options) {
        const { query, cid } = options;
        
        this.requestParams.query = query || '';
        this.requestParams.cid = cid || '';
      },
      
      async getGoodsList() {
        const { message, meta: { status, msg } } = await uni.$http.get('/api/public/v1/goods/search', this.requestParams);
        
        if (status !== 200) {
          uni.$showToast('数据请求失败');
          return;
        }
        
        const { total, pagenum, goods } = message;
        
        this.goodsList = goods;
        this.total = total;
        this.requestParams.pagenum = pagenum;
      }
    }
  }
</script>

<style lang="scss">
.goods-list {
  
  .goods-item {
    display: flex;
    padding: 12px 10px;
    border-bottom: solid 1px #efefef;
  }
  .goods-item-left {
    margin-right: 4px;
  }
  .goods-img {
    display: block;
    width: 100px;
    height: 100px;
  }
  .goods-item-right {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }
  .goods-name {
    font-size: 14px;
  }
  .goods-info-box {
    
  }
  .goods-price {
    font-size: 16px;
    color: #c00000;
  }
}
</style>
