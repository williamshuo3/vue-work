import{ createApp } from 'https://unpkg.com/vue@3/dist/vue.esm-browser.js';
 
createApp({
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
          this.isNew = isNew;
        },
        // closeModal(){
        //     this.myModal.hide()
        // },
        delModel(){
          this.delmodel.hide();
        },
        updateProduct(){
          const url = `${this.apiUrl}/api/${this.apiPath}/admin/product/${this.temProduct.id}`//更新產品
          const api = `${this.apiUrl}/api/${this.apiPath}/admin/product`;//建立產品
          // 新增
              axios.post(api).then((res) =>{
                this.myModal.hide()
                this.getData();
              console.log(res);
            })
          if(!this.isNew){
            // 編輯
            axios.put(url,{data:this.temProduct}).then((res)=>{
              console.log(`data:this.temProduct`)
            alert(res.data.message);
            // this.openModal()
            this.myModal.hide()
            // this.getData();
           }).catch((err) => {
           alert(err.data.message);
           })
          }
           
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
    },
    
    mounted(){
        const token = document.cookie.replace(/(?:(?:^|.*;\s*)hexToken\s*=\s*([^;]*).*$)|^.*$/, '$1');
        axios.defaults.headers.common.Authorization = token;

        this.myModal = new bootstrap.Modal(document.querySelector('#productModal'));
        this.delmodel =  new bootstrap.Modal(document.querySelector('#delProductModal'));
        this.getProducts();
        this.updateProduct();
     },
    }).mount('#app');
// 流程：
// 1.先使用prors將外層資料傳送到內層
// 2.在出發emit事件將內層的資料傳出去