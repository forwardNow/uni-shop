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
    
    <view class="suggest-list" v-if="suggestList.length > 0">
      <view class="suggest-item" v-for="(item, index) in suggestList" :key="index" @click="handleClickSugguestItem(item)">
        <view class="goods-name">{{item.goods_name}}</view>
        <uni-icons type="arrowright" size="16"></uni-icons>
      </view>
    </view>
    
    <view class="history-box" v-else>
      <view class="history-title">
        <text>搜索历史</text>
        <uni-icons type="trash" @click="handleClickCleanButton"></uni-icons>
      </view>
      <view class="history-list">
        <uni-tag class="history-item" :text="item" type="error" inverted v-for="(item, i) in historyList" :key="i" @click="handleClickHistoryItem(item)"></uni-tag>
      </view>
    </view>
    
  </view>
</template>

<script>
  export default {
    onLoad() {
      this.getHistoryList();
    },
    data() {
      return {
        keyword: '',
        suggestList: [],
        historyList: [],
      }
    },
    methods: {
      handleInput(value) {
        clearTimeout(this.timer);
        
        this.timer = setTimeout(() => {
          // console.log(value);
          this.keyword = value.trim();
          
          if (!this.keyword) {
            this.suggestList = [];
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
        
        this.saveKeywordToHistory();
      },
      
      handleClickSugguestItem(item) {
        const { goods_id } = item;
        const url = `/subpkg/goods_detail/goods_detail?goods_id=${goods_id}`;
        
        uni.navigateTo({ url });
      },
      
      getHistoryList() {
        const str = uni.getStorageSync('historyList') || '[]';
        
        this.historyList = JSON.parse(str);
      },
      
      saveKeywordToHistory() {
        const index = this.historyList.indexOf(this.keyword);
        
        if (index !== -1) {
          this.historyList.splice(index, 1);
        }
        
        this.historyList.unshift(this.keyword);
        
        uni.setStorageSync('historyList', JSON.stringify(this.historyList));
      },
      
      handleClickCleanButton() {
        this.historyList = [];
        uni.setStorageSync('historyList', JSON.stringify(this.historyList));
      },
      
      handleClickHistoryItem(item) {
         const url = `/subpkg/goods_list/goods_list?query=${item}`;
         
         uni.navigateTo({ url });
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

.history-box {
  padding: 0 10px;
  .history-title {
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 40px;
    border-bottom: solid 1px #efefef;
    
    font-size: 14px;
  }

  .history-list {
    display: flex;
    flex-wrap: wrap;
    
    .history-item {
      margin-top: 8px;
      margin-right: 8px;;
    }
  }
}


</style>
