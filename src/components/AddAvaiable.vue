<template>
    <div>
       <h3>Disponibilizar</h3>
       <label>Título</label>
       <br />
       <input type="text" v-model="title">
       <br />
       <label>Descrição</label>
       <br />
       <textarea cols="30" rows="3" v-model="description"></textarea>
       <br />
       <button @click="save">Salvar</button>
    </div>
</template>
<script>
export default {
    name: "AddAvaiable",
    data: function() {
        return {
            title: null,
            description: null
        }
    },
    methods: {
        async save() {
            let payload = {
                title: this.title,
                description: this.description
            }
            await this.$store.dispatch("saveAvaiableDb", payload);
            this.clearFields();
        },
        clearFields() {
            this.title = null;
            this.description = null;
        }
    }
}
</script>