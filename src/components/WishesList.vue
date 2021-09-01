<template>
  <div>
    <div class="card bg-info">
      <h3 class="ml-3 mr-3 mb-1 mt-1">Desejos de acesso</h3>
      <table class="table table-hover">
        <tbody class="bg-white" :v-model="wishDetails">
          <tr v-for="(g, index) in allWishes" :key="index" @click="details(g)">
            <td>{{ g.fromName }}</td>            
            <td>{{ g.title }}</td>            
          </tr>
        </tbody>
      </table>
    </div>
        <!-- Modal -->
    <div
      class="modal fade"
      id="wish"
      data-backdrop="static"
      data-keyboard="false"
      tabindex="-1"
      aria-labelledby="wishDetailsLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="wishDetailsLabel">
             {{ wishDetails.fromName }}
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
            <p><strong>Deseja acessar:</strong> {{ wishDetails.title }}</p>            
            <p><strong>Descrição:</strong> {{ wishDetails.description }}</p>                      
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
  name: "WishesList",
  data() {
    return {
      wishDetails: {}
    }
  },
  computed: {
    allWishes: function() {
      return this.$store.state.allWishes;
    },
  },
  methods: {
    details(g) {
      $('#wish').modal('show');
      this.wishDetails = g;
    }
  }
};
</script>
