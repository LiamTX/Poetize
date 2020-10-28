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
        <vs-input v-model="email" placeholder="E-mail"></vs-input>
      </div>

      <template #footer>
        <div class="con-footer">
          <vs-button @click="active3 = false" transparent> Enviar </vs-button>
          <vs-button @click="active3 = false" dark transparent>
            Cancel
          </vs-button>
        </div>
      </template>
    </vs-dialog>
  </div>
</template>
  <script>
export default {
  data: () => ({
    active3: false,
    email: "",
  }),
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