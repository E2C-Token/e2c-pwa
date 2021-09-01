<template>
  <div class="container">
    <div>
      <!-- <h3>Aguardando liquidação</h3>-->
      <div class="row">
        <div
          class="card ml-3 mr-3 mt-2 mb-2"
          v-for="(i, index) in intentions"
          :key="index"
          :value="i"
        >
          <div
            class="card-item ml-3 mr-3 mt-2 mb-2"            
          >
            <h4>{{ i.fromName }}</h4>
            <p>Quer liquidar tokens para você!</p>
            <p><strong>Mensagem:</strong></p>
            <p>{{ i.description }}</p>                  
            <button
              @click="infoToken(i)"
              type="button"
              class="btn btn-primary"
              data-toggle="modal"
              data-target="#liquidationModal"
            >
              Aceitar
            </button>
          </div>
        </div>
      </div>
    </div>
    <!-- Modal -->
    <div
      class="modal fade"
      id="liquidationModal"
      tabindex="-1"
      aria-labelledby="liquidationModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="liquidationModalLabel">Liquidar quantos tokens?</h5>            
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
            <div>
              <p><strong>Token emitido por: </strong> {{ fromName }}</p>
              <p><strong>Descrição: </strong> {{ description }}</p>                          
            </div>
            <div class="input-group mb-3">
            <div>
              <p><strong>Liquidar por algo disponível?</strong></p>
              <select name="wishSelected" id="wishSelected" v-model="wishSelected">
                <option v-for="av in avaiable" :value="av.id" :key="av.id">{{av.title}}</option>
              </select>
            </div>
          </div>
            <p><strong>Vai liquidar quantos tokens?</strong></p>
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
      user: null,
      tokenId: null,
      currentAmount: {},
      amount: null,      
      fromName: null,
      description: null,
      allIntentions: null,
      wishSelected: null   
    };
  },
  mounted() {
    this.user = this.$store.state.userProfile.uid;
    this.allIntentions = this.$store.state.intentionLiquidation;
  }, 
  computed: {
    tokens: function() {
      return this.$store.state.tokens;
    },    
    intentions: function() {
      return this.allIntentions;
    },
    wishes: function() {
      return this.$store.state.allWishes;
    },
    avaiable: function() {
      return this.$store.state.avaiable;
    }  
  },
  methods: {
    infoToken(i) {     
      this.tokenId = i.emissionId;     
      this.fromName = i.fromName;
      this.description = i.description;
      let emission = this.tokenId;
      this.getAmount(emission);      
    },
    getAmount(emission) {
      let selected = this.$store.state.tokens.filter( el => el.id == emission);
      this.currentAmount = selected[0].currentAmount;      
    },
    liquidar() {
      let payload = {
        tokenId: this.tokenId,
        currentAmount: this.currentAmount,       
        amount: this.amount,
        wishSelected: this.wishSelected
      }      
      this.$store.dispatch("liquidateTokens", payload);
      this.clearAndHideModal();          
    },
    clearAndHideModal() {
      this.amount = null;
      $('#liquidationModal').modal('hide');
    } 
  },
};
</script>
