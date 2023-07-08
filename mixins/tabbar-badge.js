import { mapGetters } from 'vuex';

const CART_INDEX = 2;

export default {
  onShow() {
    this.setBadge();
  },
  
  computed: {
    ...mapGetters('cart', ['total']),
  },
  
  watch: {
    total(newTotal) {
      if (!newTotal) {
        this.removeBadge();
        return;
      }
      
      this.setBadge();
    },
  },
  
  methods: {
    setBadge() {
      const text = String(this.total);
      
      uni.setTabBarBadge({ index: CART_INDEX, text });
    },
    
    removeBadge() {
      uni.removeTabBarBadge({ index: CART_INDEX });
    },
  }
}