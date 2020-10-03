<template>
  <div>
    <NavBar class="bar" />
    <v-container class="d-flex flex-column box justify-space-between">
      <v-container class="d-flex flex-column justify-center align-center mt-14">
        <v-text-field
          class="input"
          prepend-icon="mdi-email"
          label="Título"
          required
          autocomplete="off"
          v-model="poem.title"
        />

        <v-textarea
          class="mx-2 input"
          label="Poema"
          prepend-inner-icon="mdi-comment"
          v-model="poem.poem"
        />

        <small>Seja autêntico...*</small>

        <v-btn v-if="!loading" class="button mt-2" @click="sendForm()" dark>Poetizar</v-btn>
        <div v-else class="button alg-txt-c mt-2">
          <v-progress-circular indeterminate dark></v-progress-circular>
        </div>
      </v-container>
    </v-container>
  </div>
</template>

<script>
import NavBar from "@/components/NavBar.vue";
import { mapActions } from "vuex";

export default {
  components: { NavBar },
  data() {
    return {
      loading: false,
      poem: {
        title: "",
        poem: "",
      },
    };
  },
  methods: {
    ...mapActions({
      poetizar: "VuexPoem/poetizar",
    }),
    checkFields() {
      if (
        this.poem.title === "" ||
        this.poem.poem === ""
      ) {
        return false;
      }

      return true;
    },
    async sendForm() {
      this.loading = true;

      if (!this.checkFields()) {
        this.$toast.error("Preencha todos os campos.", "", {
          position: "topCenter",
        });
        this.loading = false;
        return;
      }

      //

      // let poemsParts = this.poem.poem.split('\n')
      // const partsLength = poemsParts.length;

      // for(let i = 0; i < partsLength; i++){
      //   if(poemsParts[i] == '<br>'){
      //     i++
      //   }

      //   poemsParts.splice(i + 1, 0, '<br>')
      // }

      // this.poem.poem = await poemsParts.join('')

      //

      await this.poetizar(this.poem)
        .then((res) => {
          if (res.data.errno) {
            this.$toast.error("Já existe um poema com este titulo.", "", {
              position: "topCenter",
            });

            this.poem.title = "";

            this.loading = false;

            return;
          } else {
            this.$toast.success(res.data.msg, "", { position: "topCenter" });

            this.poem.title = "";
            this.poem.poem = "";

            this.loading = false;
          }
        })
        .catch((error) => {
          alert(error);
        });
    },
  },
};
</script>

<style>
.bar {
  border-radius: 10px;
}

.box {
  max-width: 550px;
}
</style>