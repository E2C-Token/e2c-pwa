<template>
  <div>
    <div class="card" v-for="(i, index) in transactions" :key="index" v-model="user">
      
        <div
          class="card"          
          @click="liquidate()"
          v-if="i.toUid == userProfile.uid && i.type == 'intenção-liquidação'"
        >
          <h4>{{ i.fromName }}</h4>
          <p>{{ i.description }}</p>
        </div>
      
    </div>
  </div>
</template>
<script>
export default {
  name: "WaitingToLiquidate",
  data: function() {
    return {
      user: {},
    };
  },
  computed: {
    transactions: function() {
      return this.$store.state.transactions;
    },
    userProfile: function() {
      return this.$store.state.userProfile;
    },
  },
  methods: {
    liquidate() {
      console.log("liquidar");
    },
  },
};
</script>
