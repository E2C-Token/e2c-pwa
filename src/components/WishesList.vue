<template>
  <div class="card bg-info">
    <h3 class="ml-3 mr-3 mb-1 mt-1">Desejos de acesso</h3>
    <table class="table table-hover">
      
      <tbody class="bg-white">
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
  name: "WishesList",
  computed: {
    allWishes: function() {
      return this.$store.state.allWishes;
    },
  },
};
</script>