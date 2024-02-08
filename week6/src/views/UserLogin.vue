<!-- eslint-disable no-unused-vars -->
<template>
        <div class="container">
          <div class="row justify-content-center">
            <h1 class="h3 mb-3 font-weight-normal">
              請先登入
            </h1>
            <div class="col-8">
              <form id="form" class="form-signin" @submit.prevent="login">
                <div class="form-floating mb-3">
                  <input type="email" class="form-control" id="username"
                    placeholder="name@example.com" required autofocus v-model="user.username">
                  <label for="username">Email address</label>
                </div>
                <div class="form-floating">
                  <input type="password" class="form-control" id="password"
                    placeholder="Password" required v-model="user.password">
                  <label for="password">Password</label>
                </div>
                <button class="btn btn-lg btn-primary w-100 mt-3" type="submit">
                  登入
                </button>
              </form>
            </div>
          </div>
          <p class="mt-5 mb-3 text-muted">
            &copy; 2021~∞ - 六角學院
          </p>
        </div>
</template>
<script>
import axios from 'axios';

const {VITE_API} = import.meta.env
export default{
  data() {
      return {
        user:{
            // username: '',
            // password: ''
        }
      }
    },
    methods: {
      login(){
        const api = `${VITE_API}admin/signin`;
        axios.post(api,this.user)
        .then((res) =>{
            const {token , expired} = res.data;
            document.cookie = `hexToken=${token};expires=${new Date(expired)};`
            this.$router.push('/admin/products')
        })
        .catch(() =>{
            alert('重新登入');
        })
      }
    },
}
</script>
<style>
html,
    body {
      height: 100%;
      text-align: center;
    }

    body {
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .form-signin {
      width: 100%;
      max-width: 330px;
      padding: 15px;
      margin: auto;
    }
</style>