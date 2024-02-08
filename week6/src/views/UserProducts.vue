<template>
            <div class="container">
          <div class="row py-3">
            <div class="col-md-6">
              <h2>產品列表</h2>
              <table class="table table-hover mt-4">
                <thead>
                  <tr>
                    <th width="150">產品名稱</th>
                    <th width="120">
                      原價
                    </th>
                    <th width="120">
                      售價
                    </th>
                    <th width="150">
                      是否啟用
                    </th>
                    <th width="120">
                      查看細節
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(item) in products" :key="item.id">
                    <td width="150">{{ item.title }}</td>
                    <td width="120">
                      {{ item.origin_price }}
                    </td>
                    <td width="120">
                      {{ item.price }}
                    </td>
                    <td width="150">
                      <span v-if="item.is_enabled" class="text-success">啟用</span>
                      <span v-else>未啟用</span>
                    </td>
                    <td width="120">
                      <button type="button" class="btn btn-primary" @click="openProduct(item)">查看細節</button>
                    </td>
                  </tr>
                </tbody>
              </table>
              <p>目前有 <span>{{ products.length }}</span> 項產品</p>
            </div>
            <div class="col-md-6">
              <h2>單一產品細節</h2>
              <template v-if="tempProduct.title">
                <div class="card mb-3">
                  <img :src="tempProduct.imageUrl" class="card-img-top primary-image" alt="主圖">
                  <div class="card-body">
                    <h5 class="card-title">
                      {{ tempProduct.title }}
                      <span class="badge bg-primary ms-2">{{ tempProduct.category }}</span>
                    </h5>
                    <p class="card-text">商品描述：{{ tempProduct.description }}</p>
                    <p class="card-text">商品內容：{{ tempProduct.content }}</p>
                    <div class="d-flex">
                      <p class="card-text me-2">{{ tempProduct.price }}</p>
                      <p class="card-text text-secondary"><del>{{ tempProduct.origin_price }}</del></p>
                      {{ tempProduct.unit }} / 元
                    </div>
                  </div>
                </div>
                <template v-for="(image, key) in tempProduct.imagesUrl" :key="key">
                  <img v-if="image" :src="image" :alt="`多圖 ${key+1}`" class="images m-2">
                </template>
              </template>
              <p v-else class="text-secondary">請選擇一個商品查看</p>
            </div>
          </div>
        </div>
</template>
<script>
import axios from 'axios';
const {VITE_API} = import.meta.env
const {VITE_PATH} = import.meta.env
export default{
    data() {
      return {
        // apiUrl: 'https://vue3-course-api.hexschool.io/v2',
        // apiPath: 'shuo-api',
        products: [],// products 陣列存取外部回傳的產品資料
        tempProduct: {}// temp 物件存取要渲染的產品細節
      }
    },
    methods: {
      // 驗證是否有登入
      check(){
        const url = `${VITE_API}/api/user/check`;
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
        const url = `${VITE_API}/api/${VITE_PATH}/admin/products`
        axios.get(url)
        .then((res)=>{
          this.products = res.data.products
        })
        // .catch((err)=>{
        //   console.log(err)
        //   alert(err.data.message)
        // })
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
}
</script>
