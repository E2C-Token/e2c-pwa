<template>
  <div>
    <table class="table table-hover">
      
      <tbody>
        <tr v-for="(i, index) in liquidated" :key="index">
          <td><strong>{{ i.fromName }}</strong> liquidou <strong>{{ i.amount }}</strong> token E2C para <strong>{{ i.toName }}</strong> em troca de <strong>{{ i.liquidationMethod }}</strong></td>          
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
      },
      emissions: function() {
        return this.$store.state.emissions;
      }
  }
};
</script>
