<template>
  <view>
    <my-login v-if="!isLogin"/>
    
    <my-userinfo v-else />
  </view>
</template>

<script>
  import { mapGetters } from 'vuex';
  import tabbarBadge from '@/mixins/tabbar-badge';
  
  export default {
    mixins: [tabbarBadge],
    data() {
      return {
        
      }
    },
    computed: {
      ...mapGetters('user', ['isLogin']),
    },
    methods: {
      
    }
  }
</script>

<style>

</style>
