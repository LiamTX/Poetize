<template>
  <v-container class="d-flex flex-column box mt-7 justify-space-between">
    <v-container class="d-flex flex-column justify-center align-center mt-14">
      <v-text-field
        class="input"
        prepend-icon="mdi-email"
        v-model="user.email"
        label="E-mail"
        required
        autocomplete="off"
      />

      <v-text-field
        class="input"
        prepend-icon="mdi-lock"
        v-model="user.password"
        label="Senha"
        required
        type="password"
        autocomplete="off"
      />

      <v-btn v-if="!loading" class="button mt-2" @click="sendForm()" dark>Entrar</v-btn>
      <div v-else class="button alg-txt-c mt-2">
        <v-progress-circular indeterminate dark />
      </div>
  
      <v-btn class="button mt-2" @click="pushSignup()" dark>Cadastre-se</v-btn>
    </v-container>
  </v-container>
</template>

<script>
import { mapActions } from "vuex";
export default {
  name: "Login",
  data() {
    return {
      loading: false,
      user: {
        email: "",
        password: "",
      },
    };
  },
  methods: {
    ...mapActions({
      login: "VuexLogin/login",
    }),
    checkFields() {
      if (this.user.email === "" || this.user.password === "") {
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

      await this.login(this.user).then((res) => {
        if (res.data.status != 200) {
          this.$toast.error(res.data.error, "", {
            position: "topCenter",
          });

          this.user.email = "";
          this.user.password = "";

          this.loading = false;
        } else {
          localStorage.token = res.data.token;

          this.$toast.success("Bem-Vindo!", "Hey", { position: "topCenter" });
          this.$router.push("/Feed");
        }
      });
    },
    pushSignup(){
      this.$router.push('/Signup');
    }
  },
};
</script>

<style>
.box {
  max-width: 550px;
}
</style>