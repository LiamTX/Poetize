<template>
  <div class="center">
    <!-- <a @click="active3 = !active3" class="mr-3"> Esqueceu sua senha? </a> -->

    <vs-col class="mt-1">
      <a
        class="mr-4 cp clr-primary"
        style="font-size: 14px"
        @click="active3 = !active3"
        >Esqueceu sua senha?</a
      >
    </vs-col>

    <vs-dialog width="300px" not-center v-model="active3">
      <template #header>
        <h4 class="not-margin">Digite o e-mail cadastrado.</h4>
      </template>

      <div class="con-content">
        <vs-input v-model="user_forgot.email" placeholder="E-mail"></vs-input>
      </div>

      <a
        class="ml-3"
        @click="
          () => {
            active3 = false;
            active4 = true;
          }
        "
        >Já tenho o código.</a
      >

      <template #footer>
        <div class="con-footer">
          <vs-button v-if="!loading" @click="forgotPassword()" transparent>
            Enviar
          </vs-button>
          <vs-button v-else dark loading transparent> Enviar </vs-button>
          <vs-button @click="active3 = false" dark transparent>
            Cancel
          </vs-button>
        </div>
      </template>
    </vs-dialog>
    <!--  -->
    <vs-dialog width="300px" not-center v-model="active4">
      <template #header>
        <h4 class="not-margin">Digite o código enviado para o seu e-mail.</h4>
      </template>

      <div class="con-content">
        <vs-input v-model="user_reset.token" placeholder="Código"></vs-input>
        <vs-input
          type="password"
          v-model="user_reset.new_password"
          placeholder="Nova senha"
        ></vs-input>
        <vs-input
          type="password"
          v-model="confirm_password"
          placeholder="Confirme a senha"
        ></vs-input>
      </div>

      <template #footer>
        <div class="con-footer">
          <vs-button v-if="!loading" @click="resetPassword()" transparent>
            Enviar
          </vs-button>
          <vs-button v-else dark loading transparent> Enviar </vs-button>
          <vs-button @click="active4 = false" dark transparent>
            Cancel
          </vs-button>
        </div>
      </template>
    </vs-dialog>
  </div>
</template>
  <script>
import { mapActions, mapMutations } from "vuex";
export default {
  data: () => ({
    loading: false,
    active3: false,
    active4: false,
    user_forgot: {
      email: "",
    },
    user_reset: {
      email: "",
      token: "",
      new_password: "",
    },
    confirm_password: "",
  }),
  methods: {
    ...mapActions({
      forgot_password: "VuexLogin/forgot_password",
      reset_password: "VuexLogin/reset_password",
    }),
    async forgotPassword() {
      try {
        this.loading = true;

        if (this.user_forgot.email == "") {
          return;
        }

        const response = await this.forgot_password(this.user_forgot);

        if (response.data) {
          this.$vs.notification({
            duration: "15000",
            progress: "auto",
            color: "success",
            position: "top-center",
            title: "Hey!",
            text:
              "Enviamos o código de recuperação para o seu e-mail, verifique-o, por gentileza.",
          });

          localStorage.setItem(
            "password_recovery_email",
            this.user_forgot.email
          );
        }

        this.active3 = false;
        this.active4 = true;
        this.loading = false;
      } catch (error) {
        const { status } = error.response;

        if (status == 404) {
          this.$vs.notification({
            duration: "8000",
            progress: "auto",
            color: "danger",
            position: "top-center",
            title: "Ops!",
            text:
              "O e-mail informado não está cadastrado no nosso banco de dados...",
          });
        }

        this.loading = false;
      }
    },
    async resetPassword() {
      try {
        this.loading = true;

        if (this.user_reset.new_password !== this.confirm_password) {
          this.$vs.notification({
            progress: "auto",
            color: "danger",
            position: "top-center",
            title: "Ops!",
            text: "Confirme a senha corretamente.",
          });

          this.confirm_password = "";
          this.loading = false;
          return;
        }

        this.user_reset.email = localStorage.getItem("password_recovery_email");

        const response = await this.reset_password(this.user_reset);

        this.$vs.notification({
          progress: "auto",
          color: "success",
          position: "top-center",
          title: "Yeah!",
          text: "Senha alterada com sucesso!",
        });

        localStorage.removeItem("password_recovery_email");

        this.loading = false;
        this.active4 = false;
      } catch (error) {
        const { data } = error.response;

        let message = data.error;

        this.loading = false;

        if (message == "Token invalid!") {
          this.$vs.notification({
            progress: "auto",
            color: "danger",
            position: "top-center",
            title: "Ops!",
            text: "Código invalido!",
          });
        } else if (message == "Token expired!") {
          this.$vs.notification({
            progress: "auto",
            color: "danger",
            position: "top-center",
            title: "Ops!",
            text: "Código expirado, gere outro!",
          });
        } else if (message == "User not found!") {
          this.$vs.notification({
            progress: "auto",
            color: "danger",
            position: "top-center",
            title: "Ops!",
            text: "Usuario não cadastrado!",
          });
        }
      }
    },
  },
};
</script>
  <style lang="stylus">
  getColor(vsColor, alpha = 1) {
    unquote('rgba(var(--vs-' + vsColor + '), ' + alpha + ')');
  }

  getVar(var) {
    unquote('var(--vs-' + var + ')');
  }

  .con-footer {
    display: flex;
    align-items: center;
    justify-content: flex-end;

    .vs-button {
      margin: 0px;

      .vs-button__content {
        padding: 10px 30px;
      }

      ~ .vs-button {
        margin-left: 10px;
      }
    }
  }

  .not-margin {
    margin: 0px;
    font-weight: normal;
    padding: 10px;
    padding-bottom: 0px;
  }

  .con-content {
    width: 100%;

    p {
      font-size: 0.8rem;
      padding: 0px 10px;
    }

    .vs-checkbox-label {
      font-size: 0.8rem;
    }

    .vs-input-parent {
      width: 100%;
    }

    .vs-input-content {
      margin: 10px 0px;
      width: calc(100%);

      .vs-input {
        width: 100%;
      }
    }
  }

  .footer-dialog {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    width: calc(100%);

    .new {
      margin: 0px;
      margin-top: 20px;
      padding: 0px;
      font-size: 0.7rem;

      a {
        color: getColor('primary') !important;
        margin-left: 6px;

        &:hover {
          text-decoration: underline;
        }
      }
    }

    .vs-button {
      margin: 0px;
    }
  }
</style>