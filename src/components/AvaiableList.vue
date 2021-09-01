<template>
  <div>
    <div class="card bg-warning">
      <h3 class="ml-3 mr-3 mb-1 mt-1">Para usufruto comum</h3>
      <table class="table table-hover">
        <tbody class="bg-white" :v-model="selectedAvaiable">
          <tr v-for="(o, index) in avaiable" :key="index" @click="details(o)">
            <td>{{ o.title }}</td>
          </tr>
        </tbody>
      </table>
    </div>
    <!-- Modal -->
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
  </div>
</template>
<script>

export default {
  name: "AvaiableList",  
  data() {
    return {
      selectedAvaiable: {},
    };
  },
  computed: {
    avaiable: function() {
      return this.$store.state.avaiable;
    },
  },
  methods: {
    details(o) {
      $('#avaiableDetails').modal('show');
      this.selectedAvaiable = o;
    },
  },
};
</script>
