<template>
  <div>
    <h3>Emitidos para mim</h3>
    <table class="table table">
      <thead>
        <tr>          
          <th scope="col">Quem reconheceu</th>
          <th scope="col">Descrição</th>
          <th scope="col">E2C</th>
        </tr>
      </thead>
      <tbody>        
          <tr v-for="(i, index) in allEmissions" :key="index" v-if="i.uid == userProfile.uid">           
            <td>{{ i.fromName }}</td>
            <td>{{ i.description }}</td>
            <td>{{ i.amount }}</td>
          </tr>        
      </tbody>
    </table>
  </div>
</template>
<script>
export default {
  name: "ReceivedActionsTable",
  computed: {
    allEmissions: function() {
      return this.$store.state.allEmissions;
    },
    userProfile: function() {
      return this.$store.state.userProfile;
    }
  }
};
</script>
