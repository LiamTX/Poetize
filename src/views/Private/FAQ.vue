<template >
  <div>
    <!-- <NavBar /> -->
    <vs-row>
      <vs-row class="mt-20" justify="center" direction="column">
        <div class="ac">
          <h3 class="alg-txt-c">
            Olá, você poderia deixar seu feedback aqui? <br />
          </h3>
          <h4 class="alg-txt-c">
            Nos envie suas sugestões de melhoria ou bugs que você encontrou.
            <br />
            Desde já agradecemos pela sua colaboração!
          </h4>
        </div>

        <small class="ac">Tente ser o mais explicativo possivel *</small>

        <v-col class="ac" cols="12" md="3">
          <v-textarea
            color="black"
            filled
            name="input-7-4"
            label=""
            v-model="faq.text"
            auto-grow
          ></v-textarea>
        </v-col>

        <vs-row class="mt-2" justify="center">
          <vs-button
            v-if="!loading"
            class="button"
            dark
            @click="sendForm"
            :active="active == 1"
          >
            Enviar
          </vs-button>
          <vs-button
            v-else
            loading
            class="button"
            dark
            :active="active == 1"
            @click="active = 1"
          >
            Enviar
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
      faq: {
        text: "",
      },
    };
  },
  methods: {
    ...mapActions({
      sendFaq: "VuexFAQ/sendFaq",
    }),
    async sendForm() {
      try {
        this.loading = true;

        if (this.faq.text == "") {
          this.$vs.notification({
            progress: "auto",
            color: "danger",
            position: "top-center",
            title: "Ops!",
            text: "Preencha o campo abaixo.",
          });

          this.loading = false;
          return;
        }

        await this.sendFaq(this.faq).then(() => {
          this.$vs.notification({
            progress: "auto",
            color: "success",
            position: "top-center",
            title: "Heey!",
            text: "Muito obrigado pela colaboração.",
          });

          this.faq.text = "";

          this.loading = false;
        });
      } catch (error) {
        this.$vs.notification({
          progress: "auto",
          color: "danger",
          position: "top-center",
          title: "Ops!",
          text: "Tente novamente.",
        });

        this.faq.text = "";
        this.loading = false;
      }
    },
  },
};
</script>