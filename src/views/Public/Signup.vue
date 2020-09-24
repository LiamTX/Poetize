<template>
  <v-container class="d-flex flex-column box mt-7 justify-space-between">
    <v-btn to="/" class text fab small>
      <v-icon>mdi-arrow-left</v-icon>
    </v-btn>
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
        prepend-icon="mdi-account"
        v-model="user.name"
        label="Nome"
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
      />

      <v-btn v-if="!loading" class="button mt-2" @click="sendForm()" dark>Cadastrar</v-btn>
      <div v-else class="button alg-txt-c mt-2">
        <v-progress-circular indeterminate dark></v-progress-circular>
      </div>
    </v-container>
  </v-container>
</template>

<script>
import { mapActions } from "vuex";

export default {
  name: "Signup",
  data() {
    return {
      loading: false,
      user: {
        email: "",
        name: "",
        password: "",
      },
    };
  },
  methods: {
    ...mapActions({
      register: "VuexSignup/register",
    }),
    checkFields(){
      if(this.user.email === "" || this.user.name === "" || this.user.password === ""){
        return false;
      };

      return true;
    },
    async sendForm() {
      this.loading = true;

      if(!this.checkFields()){
        this.$toast.error("Preencha todos os campos.", "", {
            position: "topCenter",
        });
        this.loading = false;
        return;
      }
      
      await this.register(this.user).then(res => {
        if (res.data.errno) {
          this.$toast.error("O e-mail informado já existe.", "", {
            position: "topCenter",
          });

          this.user.email = "";
          this.user.name = "";
          this.user.password = "";

          this.loading = false;
        } else {
          this.$toast.success(res.data, "", { position: "topCenter" });
          this.$router.push("/Login");
        }
      }).catch(error => {
        alert('Algo de errado tente novamente!')
      });
    },
  },
};
</script>

<style>
.box {
  max-width: 550px;
}

.btn-signup {
  height: 10em;
  position: relative;
}

.btn-signup v-progress-circular {
  position: absolute;
  left: 50%;
}
</style>