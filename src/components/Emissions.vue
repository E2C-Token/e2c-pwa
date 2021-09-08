<template>
  <div>
    <table class="table table-hover">
      <thead>
        <button class="btn btn-primary mb-3" @click="addEmission()">
          Reconhecer
        </button>
        <tr>
          <th scope="col">Quantidade</th>
          <th scope="col">Quem reconheceu</th>
          <th scope="col">Quem recebeu</th>
          <th scope="col">Descrição</th>
          <th scope="col">Ação</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="(i, index) in emissions"
          :key="index"          
        >
          <td>{{ i.currentAmount }}</td>
          <td>{{ i.fromName }}</td>
          <td>{{ i.name }}</td>
          <td>{{ i.description }}</td>
          <!-- Button trigger modal -->
          <button
            type="button"
            class="btn btn-primary mt-2 mb-2"
            @click="openIntentionModal(i)"
            v-if="i.name !== userProfile.name"
          >
            Interagir
          </button>
        </tr>
      </tbody>
    </table>
    <!-- Modal -->
    <div
      class="modal fade"
      id="intention"
      data-backdrop="static"
      data-keyboard="false"
      tabindex="-1"
      aria-labelledby="intentionLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="intentionLabel">
              Liquidar para {{ selected.name }}?
            </h5>
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
              <label><strong>Detalhes do reconhecimento:</strong></label>
              <p>
                {{ selected.name }} foi reconhecido por {{ selected.fromName }}
              </p>
              <p>e o motivo foi: ''{{ selected.description }}...''</p>
              <!-- <p><strong>Email:</strong> {{ selected.email }}</p> -->
            </div>
            <div class="input-group mb-3">
              <div class="input-group-prepend">
                <label class="input-group-text" for="wishSelect"
                  >Liquidar por desejo de acesso</label
                >
              </div>
              <select
                class="custom-select"
                id="wishSelect"
                v-model="selectedWish"
              >
                <option v-for="(w, index) in wishes" :key="index" :value="w.id">
                  {{ w.fromName }} - {{ w.title }}
                </option>               
              </select>
            </div>

            <p>
              Digite algo legal para {{ selected.name }}. Uma intenção de
              liquidação será enviada junto com a sua mensagem
              <strong>;)</strong>
            </p>
            <div class="input-group">
              <textarea
                v-model="descricao"
                class="form-control"
                aria-label="With textarea"
              ></textarea>
            </div>
          </div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-secondary"
              data-dismiss="modal"
            >
              Cancelar
            </button>
            <button type="button" class="btn btn-primary" @click="save">
              Enviar
            </button>
          </div>
        </div>
      </div>
    </div>
    <!--Add Emission Modal -->
    <div
      class="modal fade"
      id="addEmission"
      data-backdrop="static"
      data-keyboard="false"
      tabindex="-1"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="emissionLabel">Reconhecer</h5>
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
            <EmmitTokens />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import EmmitTokens from "./EmmitTokens";
export default {
  name: "Emissions",
  components: { EmmitTokens },
  data() {
    return {
      selected: {},
      selectedWish: null,
      descricao: "",
    };
  },
  computed: {
    userProfile: function() {
      return this.$store.state.userProfile;
    },
    emissions: function() {
      return this.$store.state.tokens;
    },
    wishes: function() {
      return this.$store.state.allWishes;
    },
  },
  methods: {
    openIntentionModal(i) {
      $("#intention").modal("show");
      this.selected = i;
    },
    save() {
      let payload = {
        description: this.descricao,
        emissionId: this.selected.id,
        toName: this.selected.name,
        toUid: this.selected.uid,
        wishId: this.selectedWish,
      };  
      this.$store.dispatch('setLiquidateIntentionDb', payload);
      this.descricao = "";
      this.selectedWish = null;
      this.selected = {};
      this.closeModal();
    },
    closeModal() {
      $("#intention").modal("hide");
    },
    addEmission() {
      $("#addEmission").modal("show");
    },
  },
};
</script>
