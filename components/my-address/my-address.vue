<template>
  <view>
    <view v-if="!hasAddress" class="address-choose-box">
      <button type="primary" size="mini" class="btnChooseAddress" @click="handleClickChooseButton">请选择收货地址+</button>
    </view>
    
    <view v-else class="address-info-box">
      <view class="row">
        <view class="row-left"> 
          <view class="username">收货人：<text>{{ address.userName }}</text></view> 
        </view>
        <view class="row-right phone-box"> 
          <view class="phone">电话：<text>{{ address.telNumber }}</text></view>
          <uni-icons type="arrowright" size="16" @click="handleClickArrowRightIcon"></uni-icons>
        </view>
      </view>
      
      <view class="row row2">
        <view class="row-left address">收货地址：</view>
        <view class="row-right">{{ fullAddr }}</view>
      </view>
      
    </view>
    
    
    <image src="/static/cart_border@2x.png" class="address-border"></image>
  </view>
</template>

<script>
  import { mapState, mapGetters, mapMutations } from 'vuex';
  
  export default {
    name:"my-address",
    data() {
      return {
      };
    },
    
    computed: {
      ...mapState('user', ['address']),
      ...mapGetters('user', ['hasAddress', 'fullAddr']),
    },
    
    methods: {
      ...mapMutations('user', ['updateAddress']),
      
      handleClickChooseButton() {
        this.chooseAddress();
      },
    
      handleClickArrowRightIcon() {
        this.chooseAddress();
      },
      
      async chooseAddress() {
        const [ error, result ] = await uni.chooseAddress().catch((e) => e);
        
        if (error) {
          console.error(error);
          // this.reAuth()
          return;
        }
        
        const {
          errMsg,         //  "chooseAddress:ok"
          provinceName,   //  "广东省"
          cityName,       //  "广州市"
          countyName,     //  "海珠区"
          detailInfo,     //  "新港中路397号"
          nationalCode,   //  "510000"
          postalCode,     //  "510000"
          telNumber,      //  "020-81167888"
          userName,       //  "张三"
        } = result;
        
        if (errMsg !== "chooseAddress:ok") {
          return;
        }
        
        const address = {
          provinceName,
          cityName,
          countyName,
          detailInfo,
          postalCode,
          telNumber,
          userName,
        };
        
        this.updateAddress(address);
      },
      
      async reAuth() {
        const [err, confirmResult] = await uni.showModal({
          content: '检测到您没打开地址权限，是否去设置打开？',
          confirmText: "确认",
          cancelText: "取消",
        })
      
        if (err) {
          return
        }
      
        if (confirmResult.cancel) {
          return uni.$showToast('您取消了地址授权！')
        }
      
        uni.openSetting({
          success: (settingResult) => {
            const isAuthAddress = settingResult.authSetting['scope.address'];
      
            if (!isAuthAddress) {
              uni.$showToast('您取消了地址授权！');
              return;
            }
      
            uni.$showToast('授权成功！请选择地址');
          },
        });
      }
    
    },
    
    
  }
</script>

<style lang="scss">
  .address-choose-box {
    display: flex;
    align-items: center;
    justify-content: space-between;
    
    height: 90px;
  }
  .address-info-box {
    display: flex;
    flex-direction: column;
    justify-content: center;
    
    padding: 0 10px;
    height: 90px;
    
    font-size: 14px;
    overflow: hidden;
    
    .row {
      display: flex;
      justify-content: space-between;
    }
    .row2 {
      margin-top: 10px;
      justify-content: flex-start;
    }
    
    .phone-box {
      display: flex;
      justify-content: space-between;
    }
    .phone {
      margin-right: 10px;
    }
    .address {
      white-space: nowrap;
    }
    
  }
  
  .address-border {
    display: block;
    width: 100%;
    height: 5px;
  }
</style>