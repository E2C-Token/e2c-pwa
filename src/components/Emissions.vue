<template>
  <div>
    <table class="table table-hover">
      <thead>
        <button class="btn btn-primary mb-3" @click="addEmission()">
          Reconhecer
        </button>
        <tr>
          <th scope="col">Quem reconheceu</th>
          <th scope="col">Quem recebeu</th>
          <th scope="col">Descrição</th>
          <th scope="col">Contato</th>
          <th scope="col">Quantidade</th>
          <th scope="col">Ação</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="(i, index) in emissions"
          :key="index"          
        >
          <td>{{ i.fromName }}</td>
          <td>{{ i.toName || i.name }}</td>
          <td>{{ i.description }}</td>
          <td>{{ i.contact }}</td>
          <td>{{ i.currentAmount }}</td>
          <!-- Button trigger modal -->
          <button
            v-if="i.currentAmount > 0"
            type="button"
            class="btn btn-primary mt-2 mb-2"
            @click="openLiquidationModal(i)"            
          >
            Liquidar
          </button>
        </tr>
      </tbody>
    </table>
    <!-- Modal -->
    <div
      class="modal fade"
      id="liquidationModal"
      tabindex="-1"
      aria-labelledby="liquidationModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-dialog-centered modal-xl">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="liquidationModalLabel">Liquidar</h5>            
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
              <p><strong>Token emitido por: </strong> {{ selected.fromName }}</p>
              <p><strong>Descrição: </strong> {{ selected.description }}</p>                                      
            </div>
            <div class="input-group mb-3">
                <div class="input-group-prepend">
                    <label class="input-group-text" for="description">Quem liquida</label>
                </div>
                <input
                    v-model="fromName"
                    type="text"
                    class="form-control"                    
                />
            </div>
            <div class="input-group mb-3">
                <div class="input-group-prepend">
                    <label class="input-group-text" for="description">Como a liquidação ocorreu</label>
                </div>
                <textarea
                    v-model="how"
                    type="text"
                    class="form-control"                    
                />
            </div>
            <div class="input-group mb-3">
                <div class="input-group-prepend">
                    <label class="input-group-text" for="description">Comentários</label>
                </div>
                <textarea
                    v-model="comments"
                    type="text"
                    class="form-control"                    
                />
            </div>
            <div class="input-group mb-3">
                <div class="input-group-prepend">
                    <label class="input-group-text" for="amount">Quantidade</label>
                </div>
                <input
                    v-model="amount"
                    type="number"
                    class="form-control"                    
                />
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
            <button type="button" class="btn btn-primary" @click="liquidar()">Salvar</button>          
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
      <div class="modal-dialog modal-dialog-centered modal-xl">
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
      fromName: "",
      descricao: "",
      how: "",
      amount: null,
      comments: "",
    };
  },
  computed: {
    userProfile: function() {
      return this.$store.state.userProfile;
    },
    emissions: function() {
      return this.$store.state.tokens
      //.filter(el => el.currentAmount != 0);
    }   
  },
  methods: {
    openLiquidationModal(i) {
      $("#liquidationModal").modal("show");
      this.selected = i;
      //console.log(this.selected);
    },
    liquidar() {
      let payload = {
        description: this.descricao,
        fromName: this.fromName,
        amount: this.amount,
        how: this.liquidationMethod,
        selected: this.selected,
        toName: this.selected.toName,
        currentAmount: this.selected.currentAmount,
        comments: this.comments  
      };  
      this.$store.dispatch('liquidateTokens', payload);   
      this.fromName = "", 
      this.how = "",
      this.amount = null,
      this.descricao = "";  
      this.selected = {};
      this.comments = "";
      this.closeModal();
    },
    closeModal() {
      $("#liquidationModal").modal("hide");
    },
    addEmission() {
      $("#addEmission").modal("show");
    },
  },
};
</script>
