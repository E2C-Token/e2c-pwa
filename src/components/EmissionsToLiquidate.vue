<template>
  <div>
    <h3>Reconhecidos por praticar o bem comum</h3>
    <table class="table table-hover">
      <thead>
        <tr>
          <th scope="col">Nome</th>
          <th scope="col">Foi reconhecido por</th>
          <th scope="col">Descrição</th>
          <th scope="col">Quantitativo</th>         
        </tr>
      </thead>
      <tbody>
        <tr v-for="(i, index) in allEmissions" :key="index" @click="openModal()" :v-model="selected" :value="i">
          <td>{{ i.ownerName }}</td>
          <td>{{ i.fromName }}</td>
          <td>{{ i.description }}</td>          
          <td>{{ i.amount }}</td>                
        </tr>
      </tbody>
    </table>
    <!-- Modal -->
    <div
      class="modal fade"
      id="intentionModal"
      tabindex="-1"
      aria-labelledby="intentionModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="intentionModalLabel">Intenção de liquidação</h5>
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
            <!-- <h5>{{ selected.ownerName }}</h5>
            <h4>{{ selected.description }}</h4> -->
            <label>Descrição</label>            
            <input type="number" v-model="description"/>
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
  name: "EmissionsToLiquidate",
  data() {
    return {
      description: null,
      selected: null
    }
  }, 
  computed: {
    allEmissions: function() {
      return this.$store.state.allEmissions;
    },
    currentUserId: function() {
      return this.$store.state.userProfile.uid;
    }
  },
  methods: {
    openModal(i) {      
      this.selected = i;
      $('#intentionModal').modal('show');
    }
  }
};
</script>