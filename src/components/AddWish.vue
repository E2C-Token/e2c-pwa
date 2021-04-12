<template>
    <div>
        <h3>Adicionar Desejo de Acesso</h3>
        <label>Título</label>
        <input type="text" v-model="title">
        <label>Deseja acessar</label>
        <textarea cols="30" rows="6" v-model="description"></textarea>
        <button @click="save">Salvar</button>
    </div>
</template>
<script>
export default {
    name: "AddWish",
    data: function() {
        return {
            title: null,
            description: null
        }
    },
    methods:{
        async save() {
            let payload = {
                title: this.title,
                description: this.description
            }
            await this.$store.dispatch("saveWishAccessDb", payload);
            this.clearFields();                  
        },
        clearFields() {
            this.title = null;
            this.description = null;
        }
    }
}
</script>