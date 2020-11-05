<template >
  <div>
    <vs-row>
      <vs-row class="mt-20" justify="center" direction="column">
        <vs-row v-if="!edit" justify="center" direction="column">
          <vs-input
            disabled
            dark
            placeholder="Nome/Apelido"
            v-model="user.name"
          >
          </vs-input>

          <vs-input
            disabled
            class="mt-2"
            dark
            placeholder="E-mail"
            v-model="user.email"
          >
          </vs-input>
        </vs-row>

        <vs-row v-else justify="center" direction="column">
          <vs-input dark placeholder="Nome/Apelido" v-model="user.name">
          </vs-input>

          <vs-input class="mt-2" dark placeholder="E-mail" v-model="user.email">
          </vs-input>
        </vs-row>

        <vs-row v-if="!edit" class="mt-2" justify="center">
          <vs-button
            class="button"
            @click="edit = !edit"
            dark
            :active="active == 1"
          >
            Editar
          </vs-button>
        </vs-row>

        <vs-row v-else class="mt-2" justify="center">
          <vs-button class="button_" success :active="active == 1">
            Salvar
          </vs-button>
          <vs-button
            danger
            class="button_"
            @click="edit = false"
            :active="active == 1"
          >
            Cancelar
          </vs-button>
        </vs-row>
      </vs-row>
    </vs-row>
  </div>
</template>

<script>
import { mapActions } from "vuex";
export default {
  data() {
    return {
      active: 0,
      loading: false,
      edit: false,
      user: {
        name: "",
        email: "",
      },
    };
  },

  methods: {
    ...mapActions({
      getThisUser: "VuexProfile/getThisUser",
    }),
    async index() {
      const loading = this.$vs.loading({
        text: 'Loading...',
        background: "dark",
        color: "#fff",
      });

      await this.getThisUser();

      this.user.name = this.$store.state.VuexProfile.user.name;
      this.user.email = this.$store.state.VuexProfile.user.email;

      loading.close();
    },
  },

  created() {
    this.index();
  },
};
</script>

<style lang="stylus" scoped>
.button_ {
  width: 100px;
}
</style>