export default {
  namespaced: true,
  
  state: {
    cart: [],
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