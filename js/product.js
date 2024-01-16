import{ createApp } from 'https://unpkg.com/vue@3/dist/vue.esm-browser.js';
 
createApp({
    data(){
        return{
            apiUrl: 'https://vue3-course-api.hexschool.io/v2',
            apiPath: 'shuo-api',
            products:[],
            myModal:'',
            temProduct:{},
        }
    },
    methods:{
        // 驗證登入
        check(){
            const url = `${this.apiUrl}/api/user/check`;
            axios.post(url)
            .then(()=>{
              this.getData()
            })
            .catch((err)=>{
              alert(err.data.message)
              window.location = 'login.html';
            })
          },
        //   取得商品列表
        getProducts(){
            const url = `${this.apiUrl}/api/${this.apiPath}/admin/products/all`
        axios.get(url)
        .then((res)=>{
          this.products = res.data.products;
        })
        .catch((err)=>{
          console.log(err)
          alert(err.data.message)
        })
        },
        openModal(){
            this.myModal.show()
        },
        closeModal(){
            this.myModal.hide()
        }
    },
    mounted(){
        const token = document.cookie.replace(/(?:(?:^|.*;\s*)hexToken\s*=\s*([^;]*).*$)|^.*$/, '$1');
        axios.defaults.headers.common.Authorization = token;

        this.myModal = new bootstrap.Modal(document.querySelector('#productModal'))
        this.getProducts()
     },
    }).mount('#app');
// 流程：
// 1.先使用prors將外層資料傳送到內層
// 2.在出發emit事件將內層的資料傳出去