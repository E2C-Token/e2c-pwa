<template>
  <div class="container">
    <div class="row">
      <div class="input-group mb-3">
        <div class="input-group-prepend">
            <label class="input-group-text" for="quemLiquida">Quem reconheceu</label>
        </div>
        <input
            v-model="quemReconhece"
            type="text"
            class="form-control"                    
        />
      </div>         
      <div class="input-group mb-3">
        <div class="input-group-prepend">
            <label class="input-group-text" for="quemLiquida">Quem recebe</label>
        </div>
        <input
            v-model="quemRecebe"
            type="text"
            class="form-control"                    
        />
      </div>         
      <div class="input-group mb-3">
        <div class="input-group-prepend">
          <span class="input-group-text">Quantidade</span>
        </div>
        <input
          v-model.number="amount"
          type="number"
          class="form-control"
          aria-label="Amount (to the nearest dollar)"
        />
        <div class="input-group-append">
          <span class="input-group-text">E2C</span>
        </div>
      </div>

      <div class="input-group">
        <div class="input-group-prepend">
          <span class="input-group-text">Micronarrativa</span>
        </div>
        <textarea
          v-model="descricao"
          class="form-control"
          aria-label="With textarea"
        ></textarea>
      </div>
      <div class="input-group mb-3 mt-3">
        <div class="input-group-prepend">
          <span class="input-group-text">Quem recebe tem desejo de liquidação</span>
        </div>
        <textarea
          v-model="preLiquiWish"        
          class="form-control"          
        />        
      </div>
      <div class="input-group mb-3">
        <div class="input-group-prepend">
          <span class="input-group-text">Contato</span>
        </div>
        <input
          type="text"
          v-model="contact"        
          class="form-control"          
        />        
      </div>
      <br />
      <div>
        <button
          type="button"
          class="btn btn-primary btn-sm mt-2 mb-2"
          @click="emitirTokens()"
        >
          Reconhecer
        </button>
      </div>      
    </div>
  </div>
</template>
<script>
export default {
  name: "EmmitTokens",
  data: function() {
    return {
      transactions: [],
      descricao: null,
      quemReconhece: null,
      quemRecebe: null,
      amount: null,
      preLiquiWish: null,
      contact: null  
    };
  },  
  methods: {
    emitirTokens() {
      if (
        this.amount !== null &&
        this.descricao !== null &&
        this.quemRecebe !== null &&
        this.quemReconhece !== null
      ) {
        let payload = {
          fromName: this.quemReconhece,
          toName: this.quemRecebe,
          amount: this.amount,
          description: this.descricao,
          preLiquiWish: this.preLiquiWish,
          contact: this.contact
          
        };
        this.$store.dispatch("emmitTokens", payload);
        this.clearFields();
      } else {
        alert("Faltou preencher algum campo. Tente novamente");
      }
    },
    enviarEmail() {
      if (
        this.amount !== null &&
        this.descricao !== "" &&
        this.email !== null
      ) {
        let payload = {  
          amount: this.amount,
          description: this.descricao,
          email: this.email
        };
        this.$store.dispatch("sendInviteEmail", payload);
        this.clearFields();
      } else {
        alert("Faltou preencher algum campo. Tente novamente");
      }
    },    
    clearFields() {
      this.quemRecebe = null;
      this.descricao = null;      
      this.amount = null;
      this.email = null;
    },
  },
};
</script>
