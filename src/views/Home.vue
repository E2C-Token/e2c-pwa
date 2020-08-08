<template>
  <div class="home">
    <Navbar></Navbar>
      <div>
      <table>
        <tr>
        <td width="900px">
          <google-map />
        </td>
        <td width="900px">
          View
        </td>
        </tr>
      </table> </div>     
      <products-list></products-list>

      <div class="container h-100">
        <div class="row p-5 h-100 justify-content-center align-items-center">
          <div class="col-md-6">
            <img src="/img/svg/product.svg" alt="" width="400">
          </div>
          <div class="col-md-6">
            <h3>Learn More About us</h3>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Pariatur quaerat voluptate iusto? Nihil voluptas vitae veritatis magnam reprehenderit, reiciendis ex? Libero quasi natus veniam voluptatum, voluptas exercitationem ratione consectetur et!
            </p>
             <button class="btn custom-btn btn-outline-primary mr-4">Browse Products</button>
          </div>
        </div>
      </div>
      <login></login>

      <mini-cart></mini-cart>

  </div>
</template>

<script>
// @ is an alias to /src
import Hero from "@/components/Hero.vue";
import Products from "@/sections/Products.vue";
import Login from "@/components/Login.vue";
import GoogleMap from "@/components/GoogleMap.vue";

export default {
  name: "home",
  components: {
    Hero,Products,Login,GoogleMap
  }
};
</script>

<style>

</style>

