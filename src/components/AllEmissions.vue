<template>
  <div>    
    <table class="table table-hover">
      <thead>
        <button class="btn btn-primary mt-2 mb-2" @click="addEmission()">Reconhecer</button>
        <tr>          
          <th scope="col">Quantidade</th>
          <th scope="col">Quem reconheceu</th>
          <th scope="col">Quem recebeu</th>
          <th scope="col">Descrição</th>
          <th scope="col">Ação</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(i, index) in emissions" :key="index">         
          <td>{{ i.currentAmount }}</td>
          <td>{{ i.fromName }}</td>
          <td>{{ i.name }}</td>
          <td>{{ i.description }}</td>
          <!-- Button trigger modal -->
          <button type="button" class="btn btn-primary mt-2 mb-2" @click="openIntentionModal(i)">
            Liquidar
          </button>
        </tr>
      </tbody>
    </table>
    <!-- Modal -->
    <div class="modal fade" id="intention" data-backdrop="static" data-keyboard="false" tabindex="-1" aria-labelledby="intentionLabel" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="intentionLabel">Enviar intenção de liquidação</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">            
            <p><strong>Nome:</strong> {{ selected.name }}</p>            
            <p><strong>Fez pelo bem comum:</strong> {{ selected.description }}</p>            
            <p><strong>Email:</strong> {{ selected.email }}</p>            
            <h5>Interaja aqui com {{ selected.name }}</h5>
            <div class="input-group">
              <textarea
                v-model="descricao"
                class="form-control"
                aria-label="With textarea"
              ></textarea>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-dismiss="modal">Cancelar</button>
            <button type="button" class="btn btn-primary" @click="save">Salvar</button>
          </div>
        </div>
      </div>
    </div>
        <!--Add Emission Modal -->
    <div class="modal fade" id="addEmission" data-backdrop="static" data-keyboard="false" tabindex="-1" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="emissionLabel">Reconhecer</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">            
           <EmmitTokens />
          </div>
          <!-- <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-dismiss="modal">Cancelar</button>
            <button type="button" class="btn btn-primary" @click="save">Salvar</button>
          </div> -->
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import EmmitTokens from "./EmmitTokens";
export default {
  name: "AllEmissions",
  components: { EmmitTokens },
  data(){
    return { 
      selected: {},
      descricao: ""      
    }
  },  
  computed: {    
    userProfile: function() {
      return this.$store.state.userProfile;
    },
    emissions: function() {
      return this.$store.state.tokens;
    }    
  },
  methods: {
    openIntentionModal(i) {
      $('#intention').modal('show');
      this.selected = i;     
    },
    save() {
      let payload = {
        description: this.descricao,
        emissionId: this.selected.id,
        toName: this.selected.name,
        toUid: this.selected.uid
      }
      this.$store.dispatch('setLiquidateIntentionDb', payload);
      console.log("payload All emissions", payload);
      this.descricao = "";
      this.closeModal();
    },
    closeModal() {      
      $('#intention').modal('hide');
    },
    addEmission() {
      $('#addEmission').modal('show'); 
    }
  }
};
</script>
