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
          <td v-if="i.uid == userProfile.uid">{{ i.emissionId }}</td>          
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
      userProfile: function() {
        return this.$store.state.userProfile;
      },
      emissions: function() {
        return this.$store.state.emissions;
      }
  }
};
</script>
