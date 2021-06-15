<template>
  <div>
    <h3>Tokens Emitidos</h3>
    <table class="table table-hover">
      <thead>
        <tr>
          <th scope="col">Quantidade</th>
          <th scope="col">Quem reconheceu</th>
          <th scope="col">Quem recebeu</th>
          <th scope="col">Descrição</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(i, index) in allTokens" :key="index">
          <td>{{ i.amount }}</td>
          <td>{{ i.fromName }}</td>
          <td>{{ i.ownerName }}</td>
          <td>{{ i.description }}</td>
          <button v-show="intentions.toUid == i.uid">Liquidar</button>
        </tr>
      </tbody>
    </table>
  </div>
</template>
<script>
export default {
  name: "AllEmissions",
  computed: {
    allTokens: function() {
      return this.$store.state.tokens;
    },
    userProfile: function() {
      return this.$store.state.userProfile;
    },
    intentions: function() {
      return this.$store.state.intentionLiquidation;
    }
  },
};
</script>
