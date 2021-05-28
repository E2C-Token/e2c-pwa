<template>
  <div>
    <table class="table table-hover">
      <thead>
        <tr>          
          <th scope="col">Nome</th>
          <th scope="col">Deseja Acessar</th>          
        </tr>
      </thead>
      <tbody>
        <tr  v-for="(o, index) in allWishes" :key="index">          
          <td>{{ o.fromName }}</td>
          <td>{{ o.description }} </td>          
        </tr>      
      </tbody>
    </table>
  </div>
</template>
<script>
export default {
  name: "WishesTable",
  computed: {
    allWishes: function() {
      return this.$store.state.allWishes;
    },
  },
};
</script>