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
          <tr v-for="(i, index) in transactions" :key="index" v-if="i.toUid == userProfile.uid && i.type == 'emissão'">            
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
    transactions: function() {
      return this.$store.state.transactions;
    },
    userProfile: function() {
      return this.$store.state.userProfile;
    },
  },
};
</script>
