<template>
  <div>
    <div class="row">
      <h3>Reconhecer Tokens</h3>
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
        </select>
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
import { mapState } from "vuex";
export default {
  name: "EmmitTokens",
  data: function() {
    return {
      transactions: [],
      descricao: "",
      quemRecebe: null,
      amount: null,
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
        this.descricao !== "" &&
        this.quemRecebe !== null
      ) {
        let payload = {
          toUid: this.quemRecebe.id,
          toName: this.quemRecebe.name,
          amount: this.amount,
          description: this.descricao,
        };
        this.$store.dispatch("emmitTokens", payload);
        this.clearFields();
      } else {
        alert("Faltou preencher algum campo. Tente novamente");
      }
    },
    clearFields() {
      this.quemRecebe = null;
      this.descricao = "";
      this.quemRecebe = null;
      this.amount = null;
    },
  },
};
</script>
