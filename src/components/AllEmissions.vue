<template>
  <div>
    <h3>Todas as Emissões</h3>
    <table class="table table-hover">
      <thead>
        <tr>
          <th scope="col">Nome</th>
          <th scope="col">Foi reconhecido por</th>
          <th scope="col">Descrição</th>
          <th scope="col">E2C</th>         
        </tr>
      </thead>
      <tbody>
        <tr v-for="(i, index) in allTokens" :key="index">
          <td>{{ i.ownerName }}</td>
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
  name: "AllEmissions",  
  computed: {
    allTokens: function() {
      return this.$store.state.tokens;
    },
    currentUserId: function() {
      return this.$store.state.userProfile.uid;
    }
  }
};
</script>
