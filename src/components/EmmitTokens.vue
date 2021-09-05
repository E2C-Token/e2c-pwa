<template>
  <div>
    <div class="row">
      <div class="input-group mb-3">
        <div class="input-group-prepend">
          <label class="input-group-text" for="inputGroupSelect01">Para</label>
        </div>        
        <select
          class="custom-select"
          id="inputGroupSelect01"
          v-model="quemRecebe"
        >
          <option selected>Selecione...</option>
          <option v-for="(u, index) in users" :key="index" :value="u">{{
            u.name
          }}</option>
          <option value="outro">Pessoa não cadastrada...</option>
        </select>
      </div>
      <div class="input-group mb-3" v-if="quemRecebe === 'outro'">
        <div class="input-group-prepend">
          <label class="input-group-text" for="email">Enviar convite por Email</label>
          <input type="email" v-model="email" />
        </div>      
      </div>    
      <div class="input-group mb-3">
        <div class="input-group-prepend">
          <span class="input-group-text">Quantitativo</span>
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
          <span class="input-group-text">Descrição</span>
        </div>
        <textarea
          v-model="descricao"
          class="form-control"
          aria-label="With textarea"
        ></textarea>
      </div>
      <br />
      <div v-if="quemRecebe != 'outro'">
        <button
          type="button"
          class="btn btn-primary btn-sm mt-2 mb-2"
          @click="emitirTokens()"
        >
          Reconhecer
        </button>
      </div>
      <div v-if="quemRecebe == 'outro'">
        <button
          type="button"
          class="btn btn-primary btn-sm mt-2 mb-2"
          @click="enviarEmail()"
        >
          Enviar convite por email
        </button>
      </div>
    </div>
  </div>
</template>
<script>
import { mapState } from "vuex";
export default {
  name: "EmmitTokens",
  data: function() {
    return {
      transactions: [],
      descricao: null,
      quemRecebe: null,
      amount: null,
      email: null
    };
  },
  computed: {
    ...mapState(["userProfile"]),
    users: function() {
      return this.$store.state.users;
    },
  },
  methods: {
    emitirTokens() {
      if (
        this.amount !== null &&
        this.descricao !== null &&
        this.quemRecebe !== null
      ) {
        let payload = {
          toUid: this.quemRecebe.id,
          toName: this.quemRecebe.name,
          amount: this.amount,
          description: this.descricao,
          email: this.email
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
