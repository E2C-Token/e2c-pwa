<template>
  <div class="home">
    <Navbar></Navbar>      

      <div class="container h-100">
        <div class="row p-5 h-100 justify-content-center align-items-center">
          <div>
            <img src="../assets/capa.jpg" alt="" width="1500">
          </div>
          <br />
          <div>
            <img src="../assets/infograf1.jpg" alt="" width="1500">
          </div>
          <br />
          <div>
            <img src="../assets/infograf2.jpg" alt="" width="1500">
          </div>
          
        </div>
      </div>
      <login></login>
    

  </div>
</template>

<script>
// @ is an alias to /src

import Products from "@/sections/Products.vue";
import Login from "@/components/Login.vue";


export default {
  name: "home",
  components: {
    Products,Login
  }
};
</script>

<style>

</style>

