import { createApp } from 'https://unpkg.com/vue@3/dist/vue.esm-browser.js';

// 全部規則
Object.keys(VeeValidateRules).forEach(rule => {
  if (rule !== 'default') {
      VeeValidate.defineRule(rule, VeeValidateRules[rule]);
  }
});

// 讀取外部的資源
VeeValidateI18n.loadLocaleFromURL('./zh_TW.json');
// 套用
VeeValidate.configure({
  generateMessage: VeeValidateI18n.localize('zh_TW'),
  validateOnInput: true, // 調整為：輸入文字時，就立即進行驗證
});

const apiUrl = 'https://vue3-course-api.hexschool.io/v2'
const apiPath = 'shuo-api'

const app = createApp({
  data() {
    return {
      products: [],
      temProduct:{},
      status:{
        cartLoading:'',
        cartQtyLoading:'',
      },
      carts:{},
      form: {
        user: {
          name: '',
          email: '',
          tel: '',
          address: '',
        },
        message:'',
      },  
    }
  },
  methods: {
    getProducts(){
      axios.get(`${apiUrl}/api/${apiPath}/products/all`)
      .then(res =>{
        // console.log(res)
        this.products = res.data.products
      })
    },
    openModal(product){
      this.temProduct = product;
      this.$refs.userModal.open();
    },
    addToCart(product_id,qty = 1){
      const order = {
        product_id,
          qty,
      };
      this.status.cartLoading = product_id
      // loading
      axios.post(`${apiUrl}/api/${apiPath}/cart`,{data:order})
      .then(res =>{
        console.log(res)
        this.status.cartLoading = '';
        this.getCart()
        this.$refs.userModal.close();
      })
    },
    changeCartQty(item,qty = 1){
      const order = {
        product_id:item.product_id,
          qty,
      };
      console.log(order)
      this.status.cartQtyLoading = item.id
      // loading
      axios.put(`${apiUrl}/api/${apiPath}/cart/${item.id}`,{data:order})
      .then(res =>{
        console.log(res)
        this.status.cartQtyLoading = '';
        this.getCart()
      })
    },
    delCart(id){
      this.status.cartQtyLoading =id
      axios.delete(`${apiUrl}/api/${apiPath}/cart/${id}`)
      .then(res =>{
        // this.status.cartQtyLoading = '';
        this.getCart()
      })
    },
    getCart(){
      axios.get(`${apiUrl}/api/${apiPath}/cart`)
      .then((res) =>{
        this.carts = res.data.data;
      })
    },
    onSubmit(){
      console.log('hello')
      const order = this.form;
      axios.post(`${apiUrl}/api/${apiPath}/order`, { data: order }).then((res) => {
        alert(res.data.message);
        this.$refs.form.resetForm();
        this.getCart();
      })
    },
    isPhone(value) {
      const phoneNumber = /^(09)[0-9]{8}$/
      return phoneNumber.test(value) ? true : '需要正確的電話號碼'
    }
  },
  components:{
    userProductModal,
  },
  mounted() {
    this.getProducts();
    this.getCart();
  },
});

// Modal元件
app.component('userModal',{
  props:['temProduct','addCart'],
  data(){
    return {
      productModal:null,
      qty:1,
      status:{
        cartLoading:'',
      },
    }
  },
  methods:{
    open(){
      this.productModal.show()
    },
    close(){
      this.productModal.hide()
    }
  },
  watch: {
    temProduct() {
      this.qty = 1
    }
  },
  template:'#userProductModal',
  mounted(){
    this.productModal = new bootstrap.Modal(this.$refs.modal)
  }
});
app.component('VForm', VeeValidate.Form);
app.component('VField', VeeValidate.Field);
app.component('ErrorMessage', VeeValidate.ErrorMessage);
app.mount('#app')