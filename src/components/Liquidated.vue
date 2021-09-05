<template>
  <div>
    <table class="table table-hover">
      <thead>         
        <tr>
          <th scope="col">ID do Reconhecimento</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(i, index) in liquidated" :key="index">
          <td>{{ i.emissionId }}</td>          
        </tr>
      </tbody>
    </table>
  </div>
</template>
<script>
export default {
  name: "Liquidated",
  computed: {
      liquidated: function() {
          return this.$store.state.liquidations;
      }
  }
};
</script>
