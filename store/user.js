const ADDRESS_KEY = 'address';
const USER_INFO_KEY = 'userInfo';

function getAddress() {
  const addressStr = uni.getStorageSync(ADDRESS_KEY) || '{}';
  
  const address = JSON.parse(addressStr);
  
  return address;
}


function getUserInfo() {
  const userInfoStr = uni.getStorageSync(USER_INFO_KEY) || '{}';
  
  const userInfo = JSON.parse(userInfoStr);
  
  return userInfo;
}

export default {
  namespaced: true,
  
  state: {
    address: getAddress(),
    token: '',
    userInfo: getUserInfo(),
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
    
    updateUserInfo(state, userInfo) {
      state.userInfo = userInfo;
      
      this.commit('user/saveUserInfoToStorage');
    },
    
    saveAddressToStorage(state) {
      uni.setStorageSync(ADDRESS_KEY, JSON.stringify(state.address));
    },
    
    saveUserInfoToStorage(state) {
      uni.setStorageSync(USER_INFO_KEY, JSON.stringify(state.userInfo));
    }
  }
}