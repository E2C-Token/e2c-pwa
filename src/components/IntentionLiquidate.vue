<template>
  <div class="container">
    <div class="row">
      <h3>Intenção de liquidação</h3>
      <div class="input-group mb-3">
        <div class="input-group-prepend">
          <label class="input-group-text" for="inputGroupSelect01">Para</label>
        </div>
        <select
          class="custom-select"
          id="inputGroupSelect01"
          v-model="liquidarPara"
        >
          <option selected>Selecione...</option>
          <option v-for="(t, index) in tokens" :key="index" :value="t">{{
            t.ownerName
          }}</option>
        </select>
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
          class="btn btn-primary btn-sm"
          @click="setLiquidateIntention()"
        >
          Enviar
        </button>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "IntentionLiquidate",
  data: function() {
    return {
      descricao: "",
      liquidarPara: null,
      desejoSelecionado: "",
    };
  },
  computed: {
    tokens: function() {
      return this.$store.state.tokens;
    },
  },
  methods: {
    setLiquidateIntention() {
      if (this.descricao !== "" && this.liquidarPara !== null) {
        let payload = {
          tokenId: this.liquidarPara.id,
          toName: this.liquidarPara.ownerName,
          toUid: this.liquidarPara.uid,
          description: this.descricao,
        };
        this.$store.dispatch("setLiquidateIntentionDb", payload);
        this.liquidarPara = null;
        this.descricao = "";
      } else {
        alert("Faltou preencher algum campo.");
      }
    },
  },
};
</script>
