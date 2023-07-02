<template>
  <view>
    Home
  </view>
</template>

<script>
  export default {
    onLoad() {
      this.getSwiperList();
    },
    
    data() {
      return {
        swiperList: [],
      };
    },
    
    methods: {
      async getSwiperList() {
        const { message: swiperList } = await uni.$http.get('/home/swiperdata');
        
        this.swiperList = swiperList;
      },
    },
  }
</script>

<style lang="scss">

</style>
