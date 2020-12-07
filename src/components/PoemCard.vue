<template>
  <v-card class="mx-auto mt-10 this-card mb-1" dark>
    <v-card-title>
      {{ data.title }}
    </v-card-title>

    <v-card-subtitle>
      criado por <strong>{{ data.user_id.name }}</strong>
    </v-card-subtitle>

    <v-card-actions>
      <vs-button
        v-if="!liked"
        :loading="apiLoading"
        @click="dolike(data.id)"
        danger
        icon
      >
        <i v-if="likesLength > 0" class="bx bx-heart">{{ likesLength }}</i>
        <i v-else class="bx bx-heart"></i>
      </vs-button>

      <vs-button
        v-else
        @click="dodislike(data.id)"
        :loading="apiLoading"
        danger
        icon
      >
        <i v-if="likesLength > 0" class="bx bxs-heart">{{ likesLength }}</i>
        <i v-else class="bx bxs-heart"></i>
      </vs-button>

      <v-btn icon @click="show = !show" class="alg-txt-e">
        <v-icon>{{ show ? "mdi-chevron-up" : "mdi-chevron-down" }}</v-icon>
      </v-btn>

      <vs-tooltip v-if="user_id == data.user_id.id">
        <v-btn @click="active1 = true" color="red" class="ml-a" icon>
          <v-icon>mdi-delete</v-icon>
        </v-btn>
        <template #tooltip> Deletar </template>
      </vs-tooltip>

      <vs-dialog width="550px" not-center v-model="active1">
        <template #header>
          <h4 class="not-margin">
            Olá <b>{{ data.user_id.name }}</b>
          </h4>
        </template>

        <div class="con-content">
          <p>Você tem certeza que deseja excluir este poema?</p>
        </div>

        <template #footer>
          <div class="con-footer">
            <vs-button
              dark
              v-if="!loading"
              @click="dodelete(data.id)"
              transparent
            >
              Sim
            </vs-button>
            <vs-button dark v-else loading transparent> Sim </vs-button>
            <vs-button dark @click="active1 = false" transparent>
              Não
            </vs-button>
          </div>
        </template>
      </vs-dialog>

      <div class="ml-a">
        <vs-avatar disabled size="47" circle class="cp">
          <template v-if="data.user_id.avatar == 0" icon>
            <i class="bx bx-user"></i>
          </template>
          <img v-else :src="data.user_id.avatar" alt="" />
        </vs-avatar>
      </div>
    </v-card-actions>

    <v-expand-transition>
      <div v-show="show">
        <v-divider></v-divider>

        <v-card-text class="pre-formatted" style="line-height=150%">
          <span v-html="data.poem"></span>
        </v-card-text>
      </div>
    </v-expand-transition>
  </v-card>
</template>

<script>
import { mapActions } from "vuex";
export default {
  props: ["data"],
  data() {
    return {
      user_id: "",
      liked: false,
      active: false,
      active1: false,
      show: false,
      loading: false,
      likesLength: 0,
    };
  },
  methods: {
    ...mapActions({
      like: "VuexPoem/like",
      dislike: "VuexPoem/dislike",
      getThisUser: "VuexProfile/getThisUser",
      getMyLikes: "VuexProfile/getMyLikes",
      delete: "VuexPoem/delete",
      getThisLikes: "VuexPoem/getThisLikes",
    }),
    async dolike(poem_id) {
      try {
        this.$store.commit("setApiLoading", true);
        const response = await this.like(poem_id);

        this.likesLength += 1;
        this.liked = true;
        this.$store.commit("setApiLoading", false);
      } catch (error) {
        console.log(error);
      }
    },
    async dodislike(poem_id) {
      try {
        this.$store.commit("setApiLoading", true);
        const response = await this.dislike(poem_id);

        this.likesLength -= 1;
        this.liked = false;
        this.$store.commit("setApiLoading", false);
      } catch (error) {
        console.log(error);
      }
    },
    async dodelete(poem_id) {
      try {
        this.loading = true;

        const response = await this.delete(poem_id);

        this.$emit("deleted", this.data);

        this.loading = false;
        this.active1 = false;
      } catch (error) {
        console.log(error);
        this.loading = false;
      }
    },
    async index() {
      this.$store.commit("setApiLoading", true);
      const response = await this.getMyLikes();
      const likes = response.data;
      await this.getThisLikes(this.data.id);

      this.user_id = this.$store.state.VuexProfile.user.id;

      if (likes == null || likes == undefined) {
        return;
      }

      for (let i = 0; i < likes.length; i++) {
        if (likes[i].poem_id == this.data.id) {
          this.liked = true;
        }
      }

      this.likesLength = this.thisLikes.length;

      let filtred = this.data.poem.split("\n");
      this.data.poem = await filtred.join(" <br/> ");

      this.$store.commit("setApiLoading", false);
    },
  },
  async created() {
    await this.getThisUser();
    await this.index();
  },
  computed: {
    apiLoading() {
      return this.$store.state.apiLoading;
    },
    thisLikes() {
      return this.$store.state.VuexPoem.likes;
    },
  },
};
</script>

<style lang="scss" >
.this-card {
  max-width: 400px !important;

  @media screen and (max-width: 1210px) {
    max-width: 330px !important;
  }
}

// getColor(vsColor, alpha = 1) {
//   unquote('rgba(var(--vs-' + vsColor + '), ' + alpha + ')');
// }

// getVar(var) {
//   unquote('var(--vs-' + var + ')');
// }

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
      color: getColor("primary") !important;
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