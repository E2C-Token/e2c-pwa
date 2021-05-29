<template>
  <div>
    <div
      class="card"
      v-for="(i, index) in transactions"
      :key="index"
      :value="i"
    >
      <div
        class="card-item"
        v-if="i.toUid == userProfile.uid && i.type == 'intenção-liquidação'"
      >
        <h4>{{ i.fromName }}</h4>
        <p>{{ i.description }}</p>
        <button
          @click="infoToken(i)"
          type="button"
          class="btn btn-primary"
          data-toggle="modal"
          data-target="#exampleModal"
        >
          Liquidar
        </button>
      </div>
    </div>
    
    <!-- Modal -->
    <div
      class="modal fade"
      id="exampleModal"
      tabindex="-1"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">Liquidar quantos tokens?</h5>
            <button
              type="button"
              class="close"
              data-dismiss="modal"
              aria-label="Close"
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <label>Quantidade</label>            
            <input type="number" v-model="amount"/>
          </div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-secondary"
              data-dismiss="modal"
            >
              Cancelar
            </button>
            <button type="button" class="btn btn-primary" @click="liquidar()">Salvar</button>
          </div>
        </div>
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
      tokenInfo: null,
      amount: null      
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
    infoToken(i) {     
      this.tokenInfo = i;
      // console.log("liquidar", this.tokenInfo);
    },
    liquidar() {
      let payload = {
        tokenId: this.tokenInfo.tokenId,
        amount: this.amount
      }      
      this.$store.dispatch("liquidateTokens", payload); 
    }
  },
};
</script>
