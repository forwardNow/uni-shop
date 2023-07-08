const ADDRESS_KEY = 'address';

function getAddress() {
  const addressStr = uni.getStorageSync(ADDRESS_KEY) || '{}';
  
  const address = JSON.parse(addressStr);
  
  return address;
}

export default {
  namespaced: true,
  
  state: {
    address: getAddress(),
    token: '',
  },
  
  getters: {
    hasAddress(state) {
      return state.address && state.address.provinceName;
    },
    
    fullAddr(state, getters) {
      if (!getters.hasAddress) {
        return '';
      }
      
      const { provinceName, cityName, countyName, detailInfo } = state.address;
      
      return provinceName + cityName + countyName + detailInfo;
    },
    
    isLogin(state) {
      return Boolean(state.token);
    }
  },
  
  mutations: {
    updateAddress(state, address) {
      state.address = address;
      
      this.commit('user/saveAddressToStorage');
    },
    
    saveAddressToStorage(state) {
      uni.setStorageSync(ADDRESS_KEY, JSON.stringify(state.address));
    },
  }
}