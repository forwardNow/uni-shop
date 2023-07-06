export default {
  namespaced: true,
  
  state: {
    cart: [],
  },
  
  getters: {
    total(state) {
      let count = 0;
      
      state.cart.forEach((item) => {
        count += item.goods_count;
      });
      
      return count;
    }
  },
  
  mutations: {
    addToCart(state, goods) {
      const result = state.cart.find((item) => item.goods_id === goods.goods_id)
      
      if (result) {
        result.goods_count++;
        console.log('state', state);
        return;
      }
      
      state.cart.push(goods);
      
      console.log('state', state);
    }
  }
}