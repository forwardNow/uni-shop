<template>
  <view>
    <view class="scroll-view-box">
      
      <scroll-view scroll-y class="left-scroll-view" :style="{ height: `${windowHeight}px` }">

        <template v-for="(item, index) in cateList">
          <view 
            class="scroll-view-item" 
            :class="{ active: active === index }"
            :key="index" 
            @click="handleClickLeftScrollViewItem(index)"
          >
            {{ item.cat_name }}
          </view>
        </template>
      </scroll-view>
      
      <scroll-view scroll-y class="right-scroll-view" :style="{ height: `${windowHeight}px` }">
        <view class="scroll-view-item" v-for="i in 100">yyyyy</view>
      </scroll-view>
      
    </view>
  </view>
</template>

<script>
  export default {
    onLoad() {
      this.getWindowHeight();
      this.getCateList();
    },
    
    data() {
      return {
        windowHeight: 0,
        cateList: [],
        active: 0,
      }
    },
    methods: {
      getWindowHeight() {
        // 减去 导航条 和 tabBar 后的高度
        const { windowHeight } = uni.getSystemInfoSync();
        this.windowHeight = windowHeight;
      },
      
      async getCateList() {
        const { message: list, meta: { status, msg } } = await uni.$http.get('/api/public/v1/categories');
        
        if (status !== 200) {
          uni.$showToast('数据请求失败');
          return;
        }
        
        this.cateList = list;
      },
      
      handleClickLeftScrollViewItem(index) {
        this.active = index;
      },
      
    }
  }
</script>

<style lang="scss">
.scroll-view-box {
  display: flex;
  
  .left-scroll-view {
    width: 120px;
    
    .scroll-view-item {
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
    
  }
}
</style>
