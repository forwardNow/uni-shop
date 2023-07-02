import uniAjax from 'uni-ajax'

const config = {
  baseURL: 'https://api-hmugo-web.itheima.net/api/public/v1'
};

const http = uniAjax.create(config);

// 添加请求拦截器
http.interceptors.request.use(
  (config) => {
    uni.showLoading({
      title: '数据加载中...'
    })
    return config;
  },
  (error) => {
    return Promise.reject(error)
  }
);

// 添加响应拦截器
instance.interceptors.response.use(
  (response) => {
    uni.hideLoading();
    return response.data;
  },
  (error) => {
    return Promise.reject(error)
  }
)

export default http;