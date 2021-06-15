<template>
  <div>
    <h3>Ações sofridas(Feed)</h3>
    <table class="table table-hover">
      <thead>
        <tr>          
          <th scope="col">Fui reconhecido / quantos E2C</th>
          <th scope="col">Quem reconheceu</th>
          <th scope="col">Descrição</th>
        </tr>
      </thead>
      <tbody>        
          <tr v-for="(i, index) in myTokens" :key="index" v-if="i.uid == userProfile.uid">            
              <td>{{ i.amount }}</td>
              <td>{{ i.fromName }}</td>
              <td>{{ i.description }}</td>                         
          </tr>        
      </tbody>
    </table>
  </div>
</template>
<script>
//import { db, fb } from "../firebase";
export default {
  name: "ReceivedActionsTable",
  computed: {
    myTokens: function() {
      return this.$store.state.myTokens;
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
