<template>
    <div>
        <h1>後臺頁面</h1>
      <div id="nav">
        <RouterLink to="/">回到前台</RouterLink> |
      <RouterLink to="/admin/products">後台產品列表</RouterLink> |
      <RouterLink to="/admin/orders">後台訂單</RouterLink> |
      </div>
      <RouterView></RouterView>
    </div>
</template>
<script>
import axios from 'axios';
const {VITE_API} = import.meta.env
export default{
  methods:{
    check(){
            const url = `${VITE_API}api/user/check`;
            axios.post(url)
            .then(()=>{
              // this.getData()
              console.log('驗證成功')
            })
            .catch(()=>{
              this.$router.push('/login')
            })
          },
  },
  mounted(){
    const token = document.cookie.replace(/(?:(?:^|.*;\s*)hexToken\s*=\s*([^;]*).*$)|^.*$/, '$1');
        axios.defaults.headers.common.Authorization = token;
        this.check()
  }
  
}
</script>