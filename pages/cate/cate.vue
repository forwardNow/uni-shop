<template>
  <view>
    <my-search @click="handleClickSearch"></my-search>
    
    <view class="scroll-view-box">
      
      <scroll-view scroll-y class="left-scroll-view" :style="{ height: `${scrollViewHeight}px` }">

        <template v-for="(cateLevel1Item, index) in cateList">
          <view 
            class="cate-level1-item" 
            :class="{ active: active === index }"
            :key="index" 
            @click="handleClickLeftScrollViewItem(index)"
          >
            {{ cateLevel1Item.cat_name }}
          </view>
        </template>
      </scroll-view>
      
      <scroll-view scroll-y class="right-scroll-view" :style="{ height: `${scrollViewHeight}px` }" :scroll-top="rightScrollTop">
        <view class="cate-level2-item" v-for="(cateLevel2Item, index) in cateLevel2List" :key="index">
          
          <view class="cate-level2-title"> / {{ cateLevel2Item.cat_name }} / </view>
          
          <view class="cate-level3-list">
            <view class="cate-level3-item" v-for="(cateLevel3Item, level3Index) in cateLevel2Item.children" :key="level3Index" @click="handleClickCateLevel3Item(cateLevel3Item)">
              <image :src="cateLevel3Item.cat_icon"></image>
              <text>{{ cateLevel3Item.cat_name }}</text>
            </view>
          </view>
          
        </view>
        
      </scroll-view>
      
    </view>
  </view>
</template>

<script>
  import tabbarBadge from '@/mixins/tabbar-badge';
  
  export default {
    mixins: [tabbarBadge],
    onLoad() {
      this.getWindowHeight();
      this.getCateList();
    },
    
    data() {
      return {
        scrollViewHeight: 0,
        active: 0,
        cateList: [],
        cateLevel2List: [],
        rightScrollTop: 0,
      }
    },
    methods: {
      getWindowHeight() {
        // 减去 导航条 和 tabBar 后的高度
        const { windowHeight } = uni.getSystemInfoSync();
        this.scrollViewHeight = windowHeight - 50;
      },
      
      async getCateList() {
        const { message: list, meta: { status, msg } } = await uni.$http.get('/api/public/v1/categories');
        
        if (status !== 200) {
          uni.$showToast('数据请求失败');
          return;
        }
        
        this.cateList = list;
        
        this.updateCateLevel1ActiveIndex(this.active);
      },
      
      handleClickLeftScrollViewItem(index) {
        this.updateCateLevel1ActiveIndex(index);
      },
      
      updateCateLevel1ActiveIndex(index) {
        this.active = index;
        this.updateCateLevel2List(index);
        this.resetRightScrollTop();
      },
      
      updateCateLevel2List(cateLevel1Index) {
        this.cateLevel2List = this.cateList[cateLevel1Index].children;
      },
      
      resetRightScrollTop() {
        this.rightScrollTop = this.rightScrollTop ? 0 : 1;
      },
      
      handleClickCateLevel3Item(cateLevel3Item) {
        const { cat_id } = cateLevel3Item;
        
        const url = `/subpkg/goods_list/goods_list?cid=${cat_id}`;
        
        uni.navigateTo({ url });
      },
      
      handleClickSearch() {
        uni.navigateTo({
          url: '/subpkg/search/search'
        })
      },
    }
  }
</script>

<style lang="scss">
.scroll-view-box {
  display: flex;
  
  .left-scroll-view {
    width: 120px;
    
    .cate-level1-item {
      line-height: 60px;
      background-color: #f7f7f7;
      text-align: center;
      font-size: 12px;
      // 激活项的样式
      &.active {
        background-color: #ffffff;
        position: relative;
        // 渲染激活项左侧的红色指示边线
        &::before {
          content: ' ';
          display: block;
          width: 3px;
          height: 30px;
          background-color: #c00000;
          position: absolute;
          left: 0;
          top: 50%;
          transform: translateY(-50%);
        }
      }
    }
  }
  .right-scroll-view {
    font-size: 12px;
    
  }
  
  .cate-level2-item {
  }
  
  .cate-level2-title {
    padding: 16px 0;
    font-weight: bold;
    text-align: center;
  }
  
  .cate-level3-list {
    display: flex;
    flex-wrap: wrap;
  }
  .cate-level3-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    
    margin-bottom: 12px;
    width: 33.33%;
    
    image {
      width: 60px;
      height: 60px;
    }
    text {
      
    }
  }
}
</style>
