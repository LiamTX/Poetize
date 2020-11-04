<template>
  <vs-row class="mt-20" justify="center" direction="column">
    <vs-input icon-after dark v-model="user.email" placeholder="E-mail">
      <template #icon>
        <i class="bx bx-user"></i>
      </template>
    </vs-input>

    <vs-input
      dark
      class="mt-2"
      type="password"
      v-model="user.pass"
      placeholder="Senha"
      :visiblePassword="hasVisiblePassword"
      icon-after
      @click-icon="hasVisiblePassword = !hasVisiblePassword"
    >
      <template #icon>
        <i v-if="!hasVisiblePassword" class="bx bx-show-alt"></i>
        <i v-else class="bx bx-hide"></i>
      </template>
    </vs-input>

    <vs-col class="alg-txt-c">
      <Prompt />
    </vs-col>

    <!-- <a href="">Esqueceu sua senha?</a> -->

    <vs-row class="mt-1" justify="center">
      <vs-button
        v-if="!loading"
        class="button"
        dark
        :active="active == 1"
        @click="sendForm()"
      >
        Entrar
      </vs-button>
      <vs-button
        v-else
        loading
        class="button"
        dark
        :active="active == 1"
        @click="active = 1"
      >
        Entrar
      </vs-button>
    </vs-row>

    <vs-row justify="center">
      <vs-button to="/Signup" class="button" dark :active="active == 1">
        Cadastrar
      </vs-button>
    </vs-row>
  </vs-row>
</template>

<script>
import { mapActions } from "vuex";
import NavBar from "../../components/NavBar";
import Prompt from "../../components/PassRecovery";

export default {
  components: { NavBar, Prompt },
  data() {
    return {
      user: {
        email: "",
        pass: "",
      },
      active: 0,
      loading: false,
      hasVisiblePassword: false,
    };
  },
  methods: {
    ...mapActions({
      auth: "VuexLogin/auth",
    }),
    async sendForm() {
      try {
        this.loading = true;

        const response = await this.auth(this.user);

        await localStorage.setItem("token", response.data.token);

        this.$vs.notification({
          progress: "auto",
          color: "success",
          position: "top-center",
          title: "Hey!",
          text: "Seja bem-vindo(a).",
        });

        this.loading = false;

        this.$router.push("/Feed");
      } catch (error) {
        const { status } = error.response;

        if (status == 401) {
          this.$vs.notification({
            progress: "auto",
            color: "danger",
            position: "top-center",
            title: "Não autorizado.",
            text: "E-mail ou senha incorretos!",
          });
          this.loading = false;
        }
        if (status == 404) {
          this.$vs.notification({
            progress: "auto",
            color: "danger",
            position: "top-center",
            title: "Usuario não encontrado.",
            text: "Acesse a pagina de signup e efetue o cadastro!",
          });
          this.loading = false;
        }
      }
    },
  },
};
</script>