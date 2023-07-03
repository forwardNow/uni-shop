<template>
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
</template>

<script>
  export default {
    data() {
      return {
        keyword: '',
      }
    },
    methods: {
      handleInput(value) {
        clearTimeout(this.timer);
        
        this.timer = setTimeout(() => {
          // console.log(value);
          this.keyword = value;
        }, 500)
      }
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
</style>
