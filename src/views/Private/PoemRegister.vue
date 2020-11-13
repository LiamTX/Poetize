<template >
  <div>
    <!-- <NavBar /> -->
    <vs-row>
      <vs-row class="mt-20" justify="center" direction="column">
        <vs-input dark placeholder="Titulo" v-model="poem.title"> </vs-input>

        <!-- <div class="ac">
          <v-textarea
            class="mt-2"
            color="black"
            name="input-5-1"
            filled
            label="Poema"
            auto-grow
            v-model="poem.poem"
          ></v-textarea>
        </div> -->

        <v-col class="ac" cols="12" md="3">
          <v-textarea
            color="black"
            filled
            name="input-7-4"
            label="Poema"
            v-model="poem.poem"
            auto-grow
          ></v-textarea>
        </v-col>

        <small class="ac">Seja autêntico...*</small>

        <vs-row class="mt-2" justify="center">
          <vs-button
            v-if="!loading"
            class="button"
            dark
            @click="sendForm()"
            :active="active == 1"
          >
            Poetizar
          </vs-button>
          <vs-button
            v-else
            loading
            class="button"
            dark
            :active="active == 1"
            @click="active = 1"
          >
            Poetizar
          </vs-button>
        </vs-row>
      </vs-row>
    </vs-row>
  </div>
</template>

<script>
import NavBar from "@/components/NavBar.vue";
import { mapActions, mapGetters } from "vuex";

export default {
  components: { NavBar },
  data() {
    return {
      loading: false,
      active: 0,
      poem: {
        title: "",
        poem: "",
      },
    };
  },

  methods: {
    ...mapActions({
      register: "VuexPoem/register",
    }),
    async sendForm() {
      this.loading = true;

      const poem = await this.register(this.poem);

      if (poem.data.name == "SequelizeUniqueConstraintError") {
        this.$vs.notification({
          progress: "auto",
          color: "danger",
          position: "top-center",
          title: "Opa!",
          text: "Já existe um poema com este titulo, tente outro...",
        });

        this.loading = false;

        return;
      }

      this.$vs.notification({
        progress: "auto",
        color: "success",
        position: "top-center",
        title: "Heey, Você é um poeta!",
        text: "O poema foi registrado com sucesso.",
      });

      this.poem.title = "";
      this.poem.poem = "";

      this.loading = false;

      this.$router.push('/Feed')
    },
  },
};
</script>