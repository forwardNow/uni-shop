<template>
  <view class="my-search" @click="handleClick">
    
    <view class="my-search-box">
      <uni-icons type="search" size="17"></uni-icons>
      <text class="placeholder">搜索</text>
    </view>
    
  </view>
</template>

<script>
  export default {
    name:"my-search",
    
    props: {
      bgcolor: {
        type: String,
        default: '#c00000',
      },
      radius: {
        type: Number,
        default: 15,
      },
    },
    
    data() {
      return {
        
      };
    },
    
    methods: {
      handleClick() {
        this.$emit('click');
      },
    },
  }
</script>

<style lang="scss">
.my-search {
  display: flex;
  align-items: center;
  
  padding: 0 10px;
  
  height: 50px;
  background-color: #c00000;
}
.my-search-box {
  display: flex;
  justify-content: center;
  align-items: center;
  
  width: 100%;
  height: 36px;
  border-radius: 15px;;
  background-color: #fff;
}
.placeholder {
  margin-left: 4px;
  font-size: 14px;
}
</style>