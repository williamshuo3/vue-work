import{ createApp } from 'https://unpkg.com/vue@3/dist/vue.esm-browser.js';
 
const app = createApp({
    data(){
        return{
            apiUrl: 'https://vue3-course-api.hexschool.io/v2',
            apiPath: 'shuo-api',
            products:[],
            myModal:'',
            temProduct:{imagesUrl: []},
            isNew:false,
        }
    },
    methods:{
        // 驗證登入
        check(){
            const url = `${this.apiUrl}/api/user/check`;
            axios.post(url)
            .then(()=>{
              // this.getData()
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
            // console.log(err)
            alert(err.data.message)
          })
        },
        openModal(isNew,item){
          if(isNew === 'new'){
            this.temProduct={};
            this.isNew = true;
            this.myModal.show();
          }else if(isNew === 'edit'){
            this.temProduct = { ...item};
            this.isNew = false;
            this.myModal.show()
          }else if(isNew === 'del'){
            this.temProduct = { ...item};
            this.delmodel.show();
          }
          // this.isNew = isNew;
        },
        createImages() {
          this.temProduct.imagesUrl = [];
          this.temProduct.imagesUrl.push('');
        },
        delModel(){
          this.delmodel.hide();
        },
        updateProduct(){
          let api = `${this.apiUrl}/api/${this.apiPath}/admin/product`;//建立產品
          let http = 'post';
          //  編輯
          if(!this.isNew) {
            api = `${this.apiUrl}/api/${this.apiPath}/admin/product/${this.temProduct.id}`//更新產品
            http = 'put'
          }
          console.log(this.isNew)
          // 新增
                axios[http](api,{data:this.temProduct}).then((res) =>{
                this.myModal.hide()
                this.getProducts();
              console.log(res);
            }).catch((err) => {
               alert(err.data.message);
               })
          // if(!this.isNew){
          //   // 編輯
          //   axios.put(url).then((res)=>{
          //   alert(res.data.message);
          //   this.myModal.hide()
          //   this.getProducts();
          //  }).catch((err) => {
          //  alert(err.data.message);
          //  })
          // }
           
        },
        dleProduct(){
          const url = `${this.apiUrl}/api/${this.apiPath}/admin/product/${this.temProduct.id}`
          axios.delete(url).then((res)=>{
            this.delModel();
            this.getProducts();
          }).catch((err) => {
            alert(err.data.message);
            })
        },
        // uploadFile() {
        //   const url = `${this.apiUrl}/api/${this.apiPath}/admin/upload`
        //   console.log(url)
        // },
    },
    
    mounted(){
        const token = document.cookie.replace(/(?:(?:^|.*;\s*)hexToken\s*=\s*([^;]*).*$)|^.*$/, '$1');
        axios.defaults.headers.common.Authorization = token;

        this.myModal = new bootstrap.Modal(document.querySelector('#productModal'));
        this.delmodel =  new bootstrap.Modal(document.querySelector('#delProductModal'));
        this.getProducts();
        // this.uploadFile();
     },
    });app.mount('#app');
    
