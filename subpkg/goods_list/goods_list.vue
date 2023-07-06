<template>
  <view>
    <view class="goods-list">
      <template v-for="(item, i) in goodsList">
        <my-goods :goods="item" @click="handleClickGoodsItem(item)" />
        
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
    
    onReachBottom() {
      if (this.isLoading) {
        return;
      }
      
      const { pagenum: currPageIndex, pagesize: pageSize } = this.requestParams;
      
      if (currPageIndex * pageSize >= this.total) {
        return;
      }
      
      this.requestParams.pagenum += 1;
      
      this.getGoodsList();
    },
    
    onPullDownRefresh() {
      this.requestParams.pagenum = 1;
      this.goodsList = [];
      
      this.getGoodsList().finally(() => {
        uni.stopPullDownRefresh();
      });
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
        
        isLoading: false,
      }
    },
    methods: {
      initRequestParam(options) {
        const { query, cid } = options;
        
        this.requestParams.query = query || '';
        this.requestParams.cid = cid || '';
      },
      
      async getGoodsList() {
        this.isLoading = true;
        
        const { message, meta: { status, msg } } = await uni.$http.get('/api/public/v1/goods/search', this.requestParams);
        
        this.isLoading = false;
        
        if (status !== 200) {
          uni.$showToast('数据请求失败');
          return;
        }
        
        const { total, pagenum, goods } = message;
        
        this.goodsList = this.goodsList.concat(goods);
        this.total = total;
        this.requestParams.pagenum = Number(pagenum);
      },
      
      handleClickGoodsItem(item) {
        const { goods_id } = item;
        const url = `/subpkg/goods_detail/goods_detail?goods_id=${goods_id}`;
        
        uni.navigateTo({ url });
      },
    }
  }
</script>

<style lang="scss">
.goods-list {
  
  
}
</style>
