<template>
  <div>   
    <table class="table table-hover">
      <thead>
        <tr>
          <th scope="col">#</th>
          <th scope="col">Nome</th>
          <th scope="col">Last</th>
          <th scope="col">Handle</th>
        </tr>
      </thead>
      <tbody v-if="transactions">
        <tr v-for="(i,index) in transactions" :key="index">
          <th scope="row">{{i.uid}}</th>
          <td>{{i.toName}}</td>
          <td>Otto</td>
          <td>@mdo</td>
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
      return this.$store.state.userProfile
    }
  }
  
};
</script>
