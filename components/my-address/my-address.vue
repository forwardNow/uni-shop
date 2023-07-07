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
          <uni-icons type="arrowright" size="16"></uni-icons>
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
  export default {
    name:"my-address",
    data() {
      return {
        address: {},
      };
    },
    
    computed: {
      hasAddress() {
        return this.address && this.address.provinceName;
      },
      
      fullAddr() {
        if (!this.hasAddress) {
          return '';
        }
        
        const { provinceName, cityName, countyName, detailInfo } = this.address;
        
        return provinceName + cityName + countyName + detailInfo;
      },
    },
    
    methods: {
      async handleClickChooseButton() {
        const [ error, result ] = await uni.chooseAddress().catch((e) => e);
        
        if (error) {
          console.error(error);
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
        
        this.address = {
          provinceName,
          cityName,
          countyName,
          detailInfo,
          postalCode,
          telNumber,
          userName,
        };
      },
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
    padding: 10px 10px 0 10px;
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