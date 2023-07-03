<template>
  <view >
    <view class="search-box">
      <uni-search-bar 
        radius="16" 
        focus
        placeholder="请输入关键词" 
        clearButton="auto" 
        cancelButton="none" 
        @input="handleInput" 
        bgColor="#fff"
      />
    </view>
    
    <view class="suggest-list">
      <view class="suggest-item" v-for="(item, index) in suggestList" :key="index">
        <view class="goods-name">{{item.goods_name}}</view>
        <uni-icons type="arrowright" size="16"></uni-icons>
      </view>
    </view>
    
  </view>
</template>

<script>
  export default {
    data() {
      return {
        keyword: '',
        suggestList: [],
      }
    },
    methods: {
      handleInput(value) {
        clearTimeout(this.timer);
        
        this.timer = setTimeout(() => {
          // console.log(value);
          this.keyword = value;
          
          if (!value) {
            return;
          }
          
          this.getSuggestList();
        }, 500)
      },
      
      async getSuggestList() {
        const { message: { goods }, meta: { status, msg } } = await uni.$http.get('/api/public/v1/goods/search', { query: this.keyword });
        
        if (status !== 200) {
          uni.$showToast('数据请求失败');
          return;
        }
        
        this.suggestList = goods;
      },
    }
  }
</script>

<style lang="scss">
.search-box {
  z-index: 999;
  position: sticky;
  top: 0;
  background-color: #c00000;
}

.suggest-list {
  padding: 0 10px;
}
.suggest-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  
  padding: 12px 0;
  border-bottom: solid 1px #efefef;
  font-size: 12px;
}
.goods-name {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>
