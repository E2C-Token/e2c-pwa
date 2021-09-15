<template>
  <div class="products">
    <div class="container">
      <div class="intro h-100">
        <div class="row h-100 align-items-center">
          <div class="col-md-6 ml-3">
            <h3>Editar perfil</h3>
            <p>
              Altere seus dados aqui
            </p>
          </div>
          <div class="col-md-5">
            <img
              src="/img/svg/profile.svg"
              width="300"
              alt=""
              class="img-fluid"
            />
          </div>
        </div>
      </div>

      <div class="profile-content">
        <ul class="nav nav-pills ml-3" id="myTab" role="tablist">
          <li class="nav-item">
            <a
              class="nav-link active"
              id="profile-tab"
              data-toggle="tab"
              href="#profile"
              role="tab"
              aria-controls="profile"
              aria-selected="true"
              >Perfil</a
            >
          </li>          
        </ul>

        <div class="tab-content" id="myTabContent">
          <div
            class="tab-pane fade show active pt-3"
            id="profile"
            role="tabpanel"
            aria-labelledby="profile-tab"
          >
            <div class="container">
              <div class="row">
                <div class="col-md-6">
                  <div class="form-group">
                    <label>Nome</label>
                    <input
                      type="text"
                      name=""
                      v-model="profile.name"                      
                      class="form-control"
                    />
                  </div>
                </div>

                 <div class="col-md-8">
                  <div class="form-group">
                    <label>Cep</label>
                    <input
                      type="text"
                      v-model="profile.postCode"                     
                      class="form-control"
                    />
                  </div>
                </div>

                <div class="col-md-6">
                  <div class="form-group">
                    <label>Celular</label>
                    <input
                      type="text"
                      v-model="profile.phone"
                      
                      class="form-control"
                    />
                  </div>
                </div>

                <div class="col-md-6">
                  <div class="form-group">
                    <label>Endereço</label>
                    <input
                      type="text"
                      v-model="profile.address"                      
                      class="form-control"
                    />
                  </div>
                </div>

                <div class="col-md-6">
                  <div class="form-group">
                    <label>Bairro</label>
                    <input
                      type="text"
                      v-model="profile.neighborhood"                                            
                      
                      class="form-control"
                    />
                  </div>
                </div>              

                <div class="col-md-4">
                  <div class="form-group">
                    <input
                      type="submit"
                      @click="updateProfile"
                      value="Salvar"
                      class="btn btn-primary w-100"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>         
        </div>
      </div>
    </div>    
  </div>
</template>

<script>
import { VueEditor } from "vue2-editor";
import { fb, db } from "../firebase";

const that = this;

export default {
  name: "profile",
  components: {
    VueEditor,
  },
  props: {
    msg: String,
  },

  data() {
    return {
      profile: {
        name: null,
        phone: null,
        address: null,
        neighborhood: null,
        postCode: null
      },    
    };
  },  
  firestore() {
    const user = fb.auth().currentUser;
    return {
      profile: db.collection("profiles").doc(user.uid),
      
    };
  },
  methods: {  
    updateProfile() { 
       this.$firestore.profile.update(this.profile);     
      alert("Perfil atualizado");
      this.$router.replace("overview");           
    },    
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss"></style>
