<template>
  <v-card class="mx-auto mt-10" max-width="400" dark>
    <v-card-title>
      {{ data.title }}
    </v-card-title>

    <v-card-subtitle>
      criado por <strong>{{ data.user_id.name }}</strong>
    </v-card-subtitle>

    <v-card-actions>
      <vs-button v-if="!liked" @click="dolike(data.id)" danger icon>
        <i class="bx bx-heart"></i>
      </vs-button>

      <vs-button v-else @click="dodislike(data.id)" danger icon>
        <i class="bx bxs-heart"></i>
      </vs-button>

      <v-btn icon @click="show = !show" class="alg-txt-e">
        <v-icon>{{ show ? "mdi-chevron-up" : "mdi-chevron-down" }}</v-icon>
      </v-btn>

      <v-btn v-if="user_id == data.user_id.id" @click="dodelete(data.id)" color="red" class="ml-a" icon>
        <v-icon>mdi-delete</v-icon>
      </v-btn>

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
          {{ data.poem }}
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
      user_id: '',
      liked: false,
      active: false,
      show: false,
    };
  },
  methods: {
    ...mapActions({
      like: "VuexPoem/like",
      dislike: "VuexPoem/dislike",
      getThisUser: "VuexProfile/getThisUser",
      getMyLikes: "VuexProfile/getMyLikes",
      delete: "VuexPoem/delete"
    }),
    async dolike(poem_id) {
      try {
        const response = await this.like(poem_id);

        this.liked = true;
      } catch (error) {
        console.log(error);
      }
    },
    async dodislike(poem_id) {
      try {
        const response = await this.dislike(poem_id);

        console.log("dislike");

        this.liked = false;
      } catch (error) {
        console.log(error);
      }
    },
    async dodelete(poem_id){
      try {
        const response = await this.delete(poem_id);

        console.log(response.data);
        console.log(this.data);

        this.$emit('deleted', this.data);
      } catch (error) {
        console.log(error);
      }
    },
    async index() {
      const response = await this.getMyLikes();
      const likes = response.data;

      this.user_id = this.$store.state.VuexProfile.user.id;

      if (likes == null || likes == undefined) {
        return;
      }

      for (let i = 0; i < likes.length; i++) {
        if (likes[i].poem_id == this.data.id) {
          this.liked = true;
        }
      }
    },
  },
  async created() {
    await this.getThisUser();
    await this.index();
    console.log(this.data.poem.split("\n"));
  },
};
</script>