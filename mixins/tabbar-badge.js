import { mapGetters } from 'vuex';

export default {
  onShow() {
    this.setBadge();
  },
  
  computed: {
    ...mapGetters('cart', ['total']),
  },
  
  watch: {
    total() {
      this.setBadge();
    },
  },
  
  methods: {
    setBadge() {
      uni.setTabBarBadge({
        index: 2, // 索引
        text: String(this.total) // 注意：text 的值必须是字符串，不能是数字
      });
    }
  }
}