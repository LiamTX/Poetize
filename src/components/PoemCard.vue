<template>
  <v-card class="mx-auto mt-10" max-width="400" dark>
    <v-card-title>{{ poem.title }}</v-card-title>

    <v-card-subtitle>Por {{ poem.created_by.name }}</v-card-subtitle>

    <v-card-actions>
      <v-icon
        v-if="!liked"
        @click="dolike()"
        class="mr-1 ml-2 mr-3"
        style="cursor: pointer"
        >mdi-heart</v-icon
      >
      <v-icon
        v-else
        @click="dodislike()"
        class="mr-1 ml-2 mr-3"
        style="cursor: pointer"
        color="black"
        >mdi-heart</v-icon
      >

      <v-card-text class="card-text" v-if="qtdeLikes > 0" text
        >{{ qtdeLikes }} curtidas</v-card-text
      >

      <v-card-text v-else class="card-text" text>Nenhuma curtida</v-card-text>

      <v-icon v-if="my" class="pointer" color="red" @click="dodelete()"
        >mdi-delete</v-icon
      >

      <v-btn icon @click="show = !show">
        <v-icon>{{ show ? "mdi-chevron-up" : "mdi-chevron-down" }}</v-icon>
      </v-btn>
    </v-card-actions>

    <v-expand-transition>
      <div v-show="show">
        <v-divider></v-divider>

        <v-card-text class="pre-formatted" style="line-height: 150%">{{
          poem.poem
        }}</v-card-text>
      </div>
    </v-expand-transition>
  </v-card>
</template>

<script>
import { mapActions } from "vuex";
import axios from "../util/axios";

export default {
  props: ["poem", "my"],
  data() {
    return {
      show: false,
      liked: false,
      qtdeLikes: this.poem.likes,
      trash: false,
    };
  },
  methods: {
    ...mapActions({
      like: "VuexFeed/like",
      dislike: "VuexFeed/dislike",
      getMyLikes: "VuexFeed/getMyLikes",
      delete: "VuexFeed/delete",
    }),
    async dolike() {
      let res = await this.like(this.poem.id);
      this.liked = true;
      this.qtdeLikes += 1;
    },
    async dodislike() {
      let res = await this.dislike(this.poem.id);
      this.liked = false;
      this.qtdeLikes -= 1;
    },
    async dodelete() {
      const deleted = await this.delete(this.poem.id);

      if (deleted != 1) {
        this.$toast.error("Algo de errado, tente novamente.", "", {
          position: "topCenter",
        });
      } else {
        this.$emit("delete", this.poem.id);
      }
    },
    async MyLikes() {
      const likes = await this.getMyLikes();

      for (let i = 0; i < likes.length; i++) {
        if (likes[i].poem_Id === this.poem.id) {
          this.liked = true;
        }
      }

      return;
    },
  },
  created() {
    // this.trashIcon();
    this.MyLikes();
  },
};
</script>

<style>
.card-text {
  padding: 0;
}

.pre-formatted {
  white-space: pre-wrap;
}

.pointer {
  cursor: pointer;
}
</style>