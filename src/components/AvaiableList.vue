<template>
  <div>
    <div class="card bg-warning">
      <h6 class="ml-3 mr-3 mb-1 mt-1">Para usufruto comum
      <button @click="addAvaiable()">+</button>
      </h6>
      <table class="table table-hover">
        <tbody class="bg-white" :v-model="selectedAvaiable">
          <tr v-for="(o, index) in avaiable" :key="index" @click="details(o)">
            <td>{{ o.title }}</td>
          </tr>
        </tbody>
      </table>
    </div>
    <!-- Details Modal -->
    <div
      class="modal fade"
      id="avaiableDetails"
      data-backdrop="static"
      data-keyboard="false"
      tabindex="-1"
      aria-labelledby="avaiableDetailsLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="avaiableDetailsLabel">
              {{ selectedAvaiable.title }}
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
            <p><strong>Disponibilizado por:</strong> {{ selectedAvaiable.fromName }}</p>            
            <p><strong>Descrição:</strong> {{ selectedAvaiable.description }}</p>                      
          </div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-secondary"
              data-dismiss="modal"
            >
              Fechar
            </button>          
          </div>
        </div>
      </div>
    </div>
                <!-- Add Avaiable Modal -->
    <div
      class="modal fade bg-warning"
      id="addavaiable"
      data-backdrop="static"
      data-keyboard="false"
      tabindex="-1"
      aria-labelledby="addAvaiableLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="addAvaiableLabel">
             Disponibilizar para usufruto Comum
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
            <AddAvaiable />  
          </div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-secondary"
              data-dismiss="modal"
            >
              Fechar
            </button>          
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import AddAvaiable from "./AddAvaiable";
export default {
  name: "AvaiableList",
  components: {
    AddAvaiable
  },
  data() {
    return {
      selectedAvaiable: {},
    };
  },
  computed: {
    avaiable: function() {
      return this.$store.state.avaiableActive;
    },
  },
  methods: {
    details(o) {
      $('#avaiableDetails').modal('show');
      this.selectedAvaiable = o;
    },
    addAvaiable() {
      $('#addavaiable').modal('show');      
    }
  },
};
</script>
