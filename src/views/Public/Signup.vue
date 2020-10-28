<template>
  <vs-row>
    <vs-row class="mt-20" justify="center" direction="column">
      <vs-input icon-after dark v-model="user.name" placeholder="Nome">
        <template #icon>
          <i class="bx bx-user"></i>
        </template>
      </vs-input>

      <vs-input
        icon-after
        dark
        class="mt-2"
        v-model="user.email"
        placeholder="E-mail"
      >
        <template #icon>
          <i class="bx bx-mail-send"></i>
        </template>
        <template v-if="validEmail" #message-success> E-mail valido </template>
        <template v-if="!validEmail && user.email !== ''" #message-danger>
          E-mail invalido
        </template>
      </vs-input>

      <vs-input
        dark
        class="mt-2"
        type="password"
        v-model="user.pass"
        placeholder="Senha"
        :progress="getProgress"
        :visiblePassword="hasVisiblePassword"
        icon-after
        @click-icon="hasVisiblePassword = !hasVisiblePassword"
      >
        <template #icon>
          <i v-if="!hasVisiblePassword" class="bx bx-show-alt"></i>
          <i v-else class="bx bx-hide"></i>
        </template>

        <template v-if="getProgress >= 100" #message-success>
          Secure password
        </template>
      </vs-input>

      <vs-row class="mt-2" justify="center">
        <vs-button
          v-if="!loading"
          class="button"
          dark
          :active="active == 1"
          @click="sendForm"
        >
          Cadastrar
        </vs-button>
        <vs-button
          v-else
          loading
          class="button"
          dark
          :active="active == 1"
          @click="active = 1"
        >
          Cadastrar
        </vs-button>
      </vs-row>
    </vs-row>
  </vs-row>

  <!-- <vs-row class="mt-20" justify="center" direction="column">
    <i class="bx bx-arrow-back"></i>
    
  </vs-row> -->
</template>

<script>
import { mapActions } from "vuex";
import NavBar from "../../components/NavBar";

export default {
  components: { NavBar },
  data() {
    return {
      user: {
        name: "",
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
      signup: "VuexSignup/signup",
    }),
    async sendForm() {
      try {
        this.loading = true;

        const user = await this.signup(this.user);

        this.$vs.notification({
          duration: "none",
          progress: "auto",
          color: "success",
          position: "top-center",
          title: `Hey, ${user.data.user.name}!`,
          text:
            "Seja bem-vindo(a), enviamos um email de verificação para o seu e-mail...por favor, quando puder efetue a confirmação! Agradecemos pelo cadastro.",
        });

        this.loading = false;

        this.$router.push("/Login");
      } catch (error) {
        const message = error.message;

        this.loading = false;

        if (message == "Cannot read property 'name' of undefined") {
          this.$vs.notification({
            duration: "8000",
            progress: "auto",
            color: "danger",
            position: "top-center",
            title: `Opá!`,
            text: "Este e-mail já está sendo usado, tente outro.",
          });
        }
      }
    },
  },
  computed: {
    validEmail() {
      return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(
        this.user.email
      );
    },
    getProgress() {
      let progress = 0;

      // at least one number

      if (/\d/.test(this.user.pass)) {
        progress += 20;
      }

      // at least one capital letter

      if (/(.*[A-Z].*)/.test(this.user.pass)) {
        progress += 20;
      }

      // at menons a lowercase

      if (/(.*[a-z].*)/.test(this.user.pass)) {
        progress += 20;
      }

      // more than 5 digits

      if (this.user.pass.length >= 6) {
        progress += 20;
      }

      // at least one special character

      if (/[^A-Za-z0-9]/.test(this.user.pass)) {
        progress += 20;
      }

      return progress;
    },
  },
};
</script>