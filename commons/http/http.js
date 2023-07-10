import uniAjax from 'uni-ajax'

export function createHttp( store ) {
  const config = {
    baseURL: 'https://api-hmugo-web.itheima.net'
  };
  
  const http = uniAjax.create(config);
  
  // 添加请求拦截器
  http.interceptors.request.use(
    (config) => {
      uni.showLoading({
        title: '数据加载中...'
      })
      
      // 给需要 token 的 API 添加 header
      if (config.url.indexOf('/api/public/v1/my') !== -1) {
        config.header.authorization = store.state.user.token;
      }
      
      return config;
    },
    (error) => {
      return Promise.reject(error)
    }
  );
  
  // 添加响应拦截器
  http.interceptors.response.use(
    (response) => {
      uni.hideLoading();
      return response.data;
    },
    (error) => {
      return Promise.reject(error)
    }
  );
  
  return http;
}
