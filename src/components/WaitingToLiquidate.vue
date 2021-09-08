<template>
  <div>
    <div>      
      <table class="table table-hover">
      <thead>
        <tr>         
          <th scope="col">Quem liquida</th>
          <th scope="col">Liquidar para</th>
          <th scope="col">Descrição</th>
          <th scope="col">Ação</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(i, index) in intentions" :key="index" v-if="i.name == user.name">
          <td >{{ i.fromName }}</td>
          <td >{{ i.name }}</td>
          <td >{{ i.description }}</td>
          <!-- Button trigger modal -->
          <button   type="button" class="btn btn-primary mt-2 mb-2" @click="infoToken(i)">
            Aceitar
          </button>
        </tr>          
      </tbody>
    </table>
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
            <h5 class="modal-title" id="liquidationModalLabel">Aceitar liquidação</h5>            
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
              <select name="avaiableSelected" id="avaiableSelected" v-model="avaiableSelected">
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
      // user: null,
      tokenId: null,
      currentAmount: {},
      amount: null,      
      fromName: null,
      description: null,
      waitingToLiquidate: null,
      avaiableSelected: null,
      intentionId: null  
    };
  },
  // async mounted() {
  //   this.user = await this.$store.state.userProfile;  
  // }, 
  computed: {
    user: function() {
      return this.$store.state.userProfile;
    },
    tokens: function() {
      return this.$store.state.tokens;
    },    
    intentions: function() {
      return this.$store.state.waitingToLiquidate;
    },
    wishes: function() {
      return this.$store.state.allWishes;
    },
    avaiable: function() {
      return this.$store.state.avaiableActive;
    },  
  },
  methods: {
    infoToken(i) {     
      this.tokenId = i.emissionId;
      this.intentionId = i.id;    
      this.fromName = i.fromName;
      this.description = i.description;
      let emission = this.tokenId;
      this.getAmount(emission);  
      $('#liquidationModal').modal('show');
      this.selected = i;      
    },
    getAmount(emission) {
      let selected = this.$store.state.tokens.filter( el => el.id == emission);
      this.currentAmount = selected[0].currentAmount;      
    },
    liquidar() {
      let payload = {
        tokenId: this.tokenId,
        intentionId: this.intentionId,
        currentAmount: this.currentAmount,       
        amount: this.amount,
        avaiableSelected: this.avaiableSelected
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
