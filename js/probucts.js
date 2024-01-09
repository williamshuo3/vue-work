import { createApp } from 'https://unpkg.com/vue@3/dist/vue.esm-browser.js';

createApp({
    data() {
      return {
        apiUrl: 'https://vue3-course-api.hexschool.io/v2',
        apiPath: 'shuo-api',
        products: [],// products 陣列存取外部回傳的產品資料
        tempProduct: {}// temp 物件存取要渲染的產品細節
      }
    },
    // 流程：
// 1. 抓到 input 帳密
// 2. 點擊按鈕後，發請求 post 到資料庫
// 3. 把token跟expired存到cookie
// 4. 確認已有 token 進入到產品列表
// 5. index.html 要在created 驗證是否有token存在cookie中
    methods: {
      // 驗證是否有登入
      check(){
        const url = `${this.apiUrl}/api/user/check`;
        axios.post(url)
        .then(()=>{
          this.getData()
        })
        .catch((err)=>{
          alert(err.data.message)
        })
      },
      // 取得產品api
      getData(){
        const url = `${this.apiUrl}/api/${this.apiPath}/admin/products`
        axios.get(url)
        .then((res)=>{
          this.products = res.data.products
        })
        .catch((err)=>{
          console.log(err)
          alert(err.data.message)
        })
      },
      // 查看細節
      openProduct(item){
        this.tempProduct = item
      }
      },
      mounted() {
        // 取出 Token
        const token = document.cookie.replace(/(?:(?:^|.*;\s*)hexToken\s*=\s*([^;]*).*$)|^.*$/, '$1');
        axios.defaults.headers.common.Authorization = token;
        this.getData()
      }
    }).mount('#app');