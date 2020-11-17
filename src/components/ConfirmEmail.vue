<template>
  <v-footer dark padless id="footer">
    <v-card class="flex" flat tile>
      <v-card-text class="py-2 white--text text-center">
        <!-- {{ new Date().getFullYear() }} — <strong>Vuetify</strong> -->
        Olá, <strong>{{ user.name }}</strong
        >! Precisamos confirmar seu endereço de e-mail.
        <a class="link" @click="active = !active">Confirmar</a> |
        <a class="link" @click="rememberLater()">Lembrar mais tarde</a>
      </v-card-text>

      <vs-dialog width="550px" not-center v-model="active">
        <template #header>
          <!-- <h4 class="not-margin">Welcome to <b>Vuesax</b></h4> -->
        </template>

        <div class="con-content">
          O email cadastrado existe?
        </div>

        <template #footer>
          <div class="con-footer">
            <vs-button @click="active = false" dark transparent> Sim </vs-button>
            <vs-button @click="active = false" dark transparent> Não </vs-button>
          </div>
        </template>
      </vs-dialog>
    </v-card>
  </v-footer>
</template>

<script>
import { mapActions } from "vuex";
export default {
  data: () => ({
    icons: ["mdi-facebook", "mdi-twitter", "mdi-linkedin", "mdi-instagram"],
    active: false,
  }),
  methods: {
    rememberLater() {
      const footer = document.querySelector("footer");
      footer.classList.add("none");
    },
  },
  computed: {
    user() {
      return this.$store.state.VuexProfile.user;
    },
  },
};
</script>

<style lang="stylus">
.link:hover {
  text-decoration: underline;
}

.none {
  display: none;
}

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