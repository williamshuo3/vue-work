import{ createApp } from 'https://unpkg.com/vue@3/dist/vue.esm-browser.js';
let  productModal = null
let delProductModal = null
const app = createApp({
    data(){
        return{
            apiUrl: 'https://vue3-course-api.hexschool.io/v2',
            apiPath: 'shuo-api',
            products:[],
            myModal:'',
            temProduct:{imageUrl: []},
            pagination:{},
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
        getProducts(page=1){
            const url = `${this.apiUrl}/api/${this.apiPath}/admin/products?page=${page}`
          axios.get(url)
          .then((res)=>{
            this.products = res.data.products;
            this.pagination = res.data.pagination
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
            productModal.show();
          }else if(isNew === 'edit'){
            this.temProduct = { ...item};
            this.isNew = false;
            productModal.show()
          }else if(isNew === 'del'){
            this.temProduct = { ...item};
            delProductModal.show();
          }
          // this.isNew = isNew;
        },
        // createImage() {
        //   this.temProduct.imageUrl = [];
        //   this.temProduct.imageUrl.push('');
        // },
        // delModel(){
        //   this.delmodel.hide();
        // },
        // updateProduct(){
        //   let api = `${this.apiUrl}/api/${this.apiPath}/admin/product`;//建立產品
        //   let http = 'post';
        //   //  編輯
        //   if(!this.isNew) {
        //     api = `${this.apiUrl}/api/${this.apiPath}/admin/product/${this.temProduct.id}`//更新產品
        //     http = 'put'
        //   }
        //   console.log(this.isNew)
        //   // 新增
        //         axios[http](api,{data:this.temProduct}).then((res) =>{
        //         this.myModal.hide()
        //         this.getProducts();
        //       console.log(res);
        //     }).catch((err) => {
        //        alert(err.data.message);
        //        })
           
        // },
        // dleProduct(){
        //   const url = `${this.apiUrl}/api/${this.apiPath}/admin/product/${this.temProduct.id}`
        //   axios.delete(url).then((res)=>{
        //     this.delModel();
        //     this.getProducts();
        //   }).catch((err) => {
        //     alert(err.data.message);
        //     })
        // },
    },
    
    mounted(){
        const token = document.cookie.replace(/(?:(?:^|.*;\s*)hexToken\s*=\s*([^;]*).*$)|^.*$/, '$1');
        axios.defaults.headers.common.Authorization = token;

        // this.myModal = new bootstrap.Modal(document.querySelector('#productModal'));
        // this.delmodel =  new bootstrap.Modal(document.querySelector('#delProductModal'));
        this.getProducts();
     },
    });
    // 分頁元件
    app.component('pagination',{
        template:'#pagination',
        props:['page'],
        methods:{
            updatePage(page){
                this.$emit('emit-pages',page)
            }
        },
    })
    // 編輯元件
    app.component('productModal',{
        template:'#productModal',
        props:['product','isNew'],
        data(){
            return{
                apiUrl: 'https://vue3-course-api.hexschool.io/v2',
                apiPath: 'shuo-api',
                temProduct:{imageUrl: []},
            }
        },
        mounted(){
            productModal = new bootstrap.Modal(document.querySelector('#productModal'));
        },
        methods:{
            updateProduct(){
                let api = `${this.apiUrl}/api/${this.apiPath}/admin/product`;//建立產品
                let http = 'post';
                //  編輯
                if(!this.isNew) {
                  api = `${this.apiUrl}/api/${this.apiPath}/admin/product/${this.product.id}`//更新產品
                  http = 'put'
                }
                console.log(this.isNew)
                // 新增
                      axios[http](api,{data:this.temProduct}).then((res) =>{
                        this.hideModal()
                        this.$emit('update');
                    console.log(res);
                  }).catch((err) => {
                     alert(err.data.message);
                     })
                 
              },
              createImage() {
                this.product.imageUrl = [];
                this.product.imageUrl.push('');
              },
              openModal() {
                productModal.show();
              },
              hideModal() {
                productModal.hide();
              },
        },
    });
    // 刪除元件
    app.component('delProductModal',{
        template:"#delProductModal",
        props:['item'],
        data(){
            return{
                apiUrl: 'https://vue3-course-api.hexschool.io/v2',
                apiPath: 'shuo-api',
            }
        },
        mounted(){
            delProductModal =  new bootstrap.Modal(document.querySelector('#delProductModal'));
        },
        methods:{
            dleProduct(){
                const url = `${this.apiUrl}/api/${this.apiPath}/admin/product/${this.item.id}`
                axios.delete(url).then((res)=>{
                  this.hideModal();
                  this.$emit('update')
                }).catch((err) => {
                  alert(err.data.message);
                  })
              },
              openModal() {
                delProductModal.show();
              },
              hideModal() {
                delProductModal.hide();
              },
        },
    })
    app.mount('#app');
    
