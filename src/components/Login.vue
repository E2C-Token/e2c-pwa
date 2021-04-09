<template>
  <div class="login">
        <!-- Modal -->
        <div class="modal fade" id="login" tabindex="-1" role="dialog" aria-labelledby="loginTitle" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered" role="document">
            <div class="modal-content">

                <div class="modal-body">


                        <ul class="nav nav-fill nav-pills mb-3" id="pills-tab" role="tablist">
                            <li class="nav-item">
                                <a class="nav-link active" id="pills-home-tab" data-toggle="pill" href="#pills-login" role="tab" aria-controls="pills-login" aria-selected="true">Login</a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link" id="pills-register-tab" data-toggle="pill" href="#pills-register" role="tab" aria-controls="pills-register" aria-selected="false">Criar conta</a>
                            </li>
                        </ul>

                        <div class="tab-content" id="pills-tabContent">
                        <div class="tab-pane fade show active" id="pills-login" role="tabpanel" aria-labelledby="pills-login-tab">
                            <center>
                            <!-- <img src="..\assets\default_image.png" width="150px"> -->
                            </center><br>
                            <h5 class="text-center">Login</h5>
                            <div class="form-group">
                                <label for="exampleInputEmail1">Email</label>
                                <input type="email" v-model="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Digite seu email">                                
                            </div>
                            <div class="form-group">
                                <label for="exampleInputPassword1">Senha</label>
                                <input type="password" @keyup.enter="login" v-model="password" class="form-control" id="exampleInputPassword1" placeholder="Senha">
                            </div>

                             <div class="form-group">
                                <button class="btn btn-primary" @click="login">Entrar</button>
                            </div>

                        </div>
                        <div class="tab-pane fade" id="pills-register" role="tabpanel" aria-labelledby="pills-register-tab">
                            
                             <center>
                            <!-- <img src="..\assets\default_image.png" width="150px"> -->
                            </center><br>
                             <h5 class="text-center">Nova Conta</h5>
                             
                            <div class="form-group">
                                <label for="name">Seu nome</label>
                                <input type="text" v-model="name" class="form-control" id="name" placeholder="Digite seu nome">
                            </div>

                            <div class="form-group">
                                <label for="email">Seu email</label>
                                <input type="email"  v-model="email" class="form-control" id="email" aria-describedby="emailHelp" placeholder="Digite seu email">
                            </div>
                            <div class="form-group">
                                <label for="password">Senha</label>
                                <input type="password" v-model="password" class="form-control" id="password" placeholder="Senha">
                            </div>

                            <div class="form-group">
                                <button class="btn btn-primary" @click="register">Cadastrar</button>
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

import {fb,db} from '../firebase'

export default {
  name: "Login",
  props: {
    msg: String
  },
  data(){
      return {
          name:null,
          email:null,
          password:null
      }
  },

  methods:{
      login(){
          fb.auth().signInWithEmailAndPassword(this.email, this.password)
                        .then(() => {
                        $('#login').modal('hide')
                          this.$router.replace('admin/transactions');  
                        })
                        .catch(function(error) {
                            // Handle Errors here.
                            var errorCode = error.code;
                            var errorMessage = error.message;
                            if (errorCode === 'auth/wrong-password') {
                                alert('Wrong password.');
                            } else {
                                alert(errorMessage);
                            }
                            console.log(error);
                    });

      },
      register(){
            fb.auth().createUserWithEmailAndPassword(this.email, this.password)
                .then((user) => {
                    $('#login').modal('hide')
                    
                    db.collection("users").doc(user.user.uid).set({
                        name: this.name,
                        createdAt: new Date()
                    })
                    .then(function() {
                        console.log("Document successfully written!");
                    })
                    .catch(function(error) {
                        console.error("Error writing document: ", error);
                    });

                    db.collection("profiles").doc(user.user.uid).set({
                        name: this.name,
                        createdAt: new Date()
                    })
                    .then(function() {
                        console.log("Document successfully written!");                        
                    })
                    .catch(function(error) {
                        console.error("Error writing document: ", error);
                    });
                    
                    this.$router.replace('admin/profile');
                })
                .catch(function(error) {
                // Handle Errors here.
                var errorCode = error.code;
                var errorMessage = error.message;
                if (errorCode == 'auth/weak-password') {
                    alert('The password is too weak.');
                } else {
                    alert(errorMessage);
                }
                console.log(error);
            });
      }

  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">

</style>
