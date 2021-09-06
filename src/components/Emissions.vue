<template>
  <div>    
    <table class="table table-hover">
      <thead>
        <button class="btn btn-primary mb-3" @click="addEmission()">Reconhecer</button>
        <tr>          
          <th scope="col">Quantidade</th>
          <th scope="col">Quem reconheceu</th>
          <th scope="col">Quem recebeu</th>
          <th scope="col">Descrição</th>
          <th scope="col">Ação</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(i, index) in emissions" :key="index" v-if="i.uid !== userProfile.uid">         
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
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="intentionLabel">Liquidar para {{ selected.name }}?</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <label><strong>Detalhes do reconhecimento:</strong></label>           
            <p>{{ selected.name }} foi reconhecido por {{ selected.fromName }}</p>            
            <p>e o motivo foi: ''{{ selected.description }}...'' </p>            
            <!-- <p><strong>Email:</strong> {{ selected.email }}</p>             -->
            <p>Digite algo legal para {{ selected.name }}. Uma intenção de liquidação será enviada junto com a sua mensagem <strong>;)</strong></p>
            
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
            <button type="button" class="btn btn-primary" @click="save">Enviar</button>
          </div>
        </div>
      </div>
    </div>
        <!--Add Emission Modal -->
    <div class="modal fade" id="addEmission" data-backdrop="static" data-keyboard="false" tabindex="-1" aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered">
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
  name: "Emissions",
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
