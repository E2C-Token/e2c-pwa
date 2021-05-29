<template>
  <div>
    <table class="table table-hover">
      <thead>
        <tr>          
          <th scope="col">Fui reconhecido / quantos E2C</th>
          <th scope="col">Quem reconheceu</th>
          <th scope="col">Descrição</th>
        </tr>
      </thead>
      <tbody>        
          <tr v-for="(i, index) in tokens" :key="index" v-if="i.uid == userProfile.uid">            
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
    tokens: function() {
      return this.$store.state.tokens;
    },
    userProfile: function() {
      return this.$store.state.userProfile;
    },
  },
};
</script>
