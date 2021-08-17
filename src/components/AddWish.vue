<template>
    <div class="container">
        <div class="row mb-3">
            <h3>Adicionar Desejo de Acesso</h3>
            <div class="input-group mb-3">
                <div class="input-group-prepend">
                    <label class="input-group-text" for="addWish">Título</label>
                </div>
                <input
                    v-model="title"
                    type="text"
                    class="form-control"
                    aria-label="O que você deseja acessar..."
                    />
            </div>
            <div class="input-group mb-3">
                <div class="input-group-prepend">
                    <span class="input-group-text">Descrição</span>
                </div>
                <textarea
                    v-model="description"
                    class="form-control"
                    aria-label="With textarea"
                ></textarea>
            </div>
            <div>
                <button
                type="button"
                class="btn btn-primary btn-sm"
                @click="save()"
                >
                Salvar
                </button>
            </div>
        </div>        
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