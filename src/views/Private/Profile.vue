<template>
  <div>
    <NavBar class="bar" />
    <h1 class="alg-txt-c mt-6">Suas informações</h1>
    <v-container class="d-flex flex-column box justify-space-between">
      <v-container class="d-flex flex-column justify-center align-center mt-14">
        <v-text-field
          class="input"
          prepend-icon="mdi-account"
          label="Nome"
          required
          autocomplete="off"
          :disabled="disabled"
          v-model="user.name"
        />

        <v-text-field
          class="input"
          prepend-icon="mdi-email"
          label="E-mail"
          required
          autocomplete="off"
          :disabled="disabled"
          v-model="user.email"
        />

        <v-expansion-panels
          class="mt-2"
          :accordion="accordion"
          :popout="popout"
          :inset="inset"
          :multiple="multiple"
          :focusable="focusable"
          :disabled="disabled"
          :readonly="readonly"
          :flat="flat"
          :hover="hover"
          :tile="tile"
        >
          <v-expansion-panel>
            <v-expansion-panel-header>Senha</v-expansion-panel-header>
            <v-expansion-panel-content>
              <v-text-field
                type="password"
                class="input"
                prepend-icon="mdi-lock"
                label="Nova senha"
                required
                autocomplete="off"
                v-model="newPassword"
              />
              <v-text-field
                type="password"
                class="input"
                prepend-icon="mdi-lock"
                label="Confirme a nova senha"
                required
                autocomplete="off"
                v-model="ConfirmPassword"
              />
            </v-expansion-panel-content>
          </v-expansion-panel>
        </v-expansion-panels>

        <v-btn
          v-if="disabled"
          @click="disabled = false"
          class="button mt-4"
          dark
          max-width="30%"
        >Editar</v-btn>
        <v-btn
          v-else
          @click="disabled = true"
          class="button mt-4"
          color="red"
          max-width="30%"
        >Cancelar</v-btn>
        <v-btn v-if="!disabled && !loading" class="button mt-4" dark max-width="30%" @click="sendForm">Salvar</v-btn>
        <div v-else-if="loading" class="button alg-txt-c mt-2">
          <v-progress-circular indeterminate dark></v-progress-circular>
        </div>


        <h2 class="mt-4">Seus poemas</h2>

        <div v-for="poem in poems" :key="poem.id" class="input">
          <PoemCard :poem="poem" />
        </div>
      </v-container>
    </v-container>
  </div>
</template>

<script>
import NavBar from "@/components/NavBar.vue";
import PoemCard from "@/components/PoemCard.vue";
import { mapActions } from "vuex";

export default {
  components: { NavBar, PoemCard },
  data() {
    return {
      accordion: false,
      popout: true,
      inset: false,
      multiple: false,
      disabled: true,
      readonly: false,
      focusable: false,
      flat: false,
      hover: false,
      tile: false,

      newPassword: "",
      ConfirmPassword: "",

      user: {
        name: "",
        email: "",
      },

      poems: [],
      loading: false,
    };
  },
  methods: {
    ...mapActions({
      getUserInfo: "VuexProfile/getUserInfo",
      getMyPoems: "VuexProfile/getMyPoems",
      edit: "VuexProfile/edit",
    }),
    checkFields() {
      if (this.user.name === "" || this.user.email === "") {
        return false;
      }

      return true;
    },
    async loadInfo() {
      const user = await this.getUserInfo();

      this.user.name = user.data.name;
      this.user.email = user.data.email;

      this.poems = await this.getMyPoems();
    },
    checkNewPassword() {
      if (this.ConfirmPassword == "") {
        return false;
      }

      return true;
    },
    async sendForm() {
      this.loading = true;

      if (!this.checkFields()) {
        this.$toast.error("Verifique se algum campo está vazio.", "", {
          position: "topCenter",
        });
        this.loading = false;
        return;
      }

      if (this.newPassword != "") {
        if (!this.checkNewPassword()) {
          this.$toast.error("Confirme sua senha.", "", {
            position: "topCenter",
          });
          this.loading = false;
          return;
        }

        if (this.newPassword === this.ConfirmPassword) {
          this.user.password = this.newPassword;
        } else {
          this.$toast.error("Confirme sua senha corretamente.", "", {
            position: "topCenter",
          });
          this.loading = false;
          return;
        }
      }

      await this.edit(this.user).then((res) => {
        if (res.errno) {
          this.$toast.error("Esse e-mail já existe.", "", {
            position: "topCenter",
          });

          this.loading = false;

          return;
        } else {
          if (res.error) {
            this.$toast.error(res.error, "", {
              position: "topCenter",
            });
            this.loading = false;
            return;
          }

          this.$toast.success(res.res, "", {
            position: "topCenter",
          });
          this.loading = false;
        }
      });
    },
  },
  created() {
    this.loadInfo();
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