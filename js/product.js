import { createApp } from 'https://unpkg.com/vue@3/dist/vue.esm-browser.js';
  const url = "https://ec-course-api.hexschool.io";
  const apiPath = "vue3-lxokine-api";

  createApp({
    data(){
      return {
        products:[],
        tempProduct:null
      }
    },
    methods:{
        check(){
            axios.post(`${url}/v2/api/user/check`)
            .then((res)=>{
                this.getProducts();
            })
            .catch((err) => {
                alert(err.data.message);
                window.location = 'login.html';
            });
        },
        getProducts(){
            axios.get(`${url}/v2/api/${apiPath}/admin/products`)
            .then((res)=>{
                this.products = res.data.products;
            })
            .catch((err)=>{
                alert(err);
            })
        }
    },
    mounted(){
        const token = document.cookie.replace(/(?:(?:^|.*;\s*)hexVueToken\s*\=\s*([^;]*).*$)|^.*$/, "$1");
        axios.defaults.headers.common['Authorization'] = token;
        this.check();
    }
  }).mount('#app');