<template>
    
</template>
<script>
export default {
    name: "ResetPassword",
    data(){
        return {
            email:null,    
        }
    },
    methods:{
        sendPasswordResetEmail(){
        fb.auth().sendPasswordResetEmail(this.email)
        .then(function() {
            alert('Email enviado com sucesso');
        })
        .catch(function(error) {
            alert('Deu ruim: ' + error);
        });
      }
        
    }
}
</script>