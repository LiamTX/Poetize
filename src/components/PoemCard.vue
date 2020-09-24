<template>
  <!-- <v-card class="mx-auto mt-10" dark max-width="400" max-height="175">
    <v-card-title>
      <span class="title font-weight-light">{{poem.title}}</span>
    </v-card-title>

    <v-card-text
      class="headline"
    >{{poem.poem}}</v-card-text>

    <v-card-actions>
      <v-list-item class="grow">
        <v-list-item-content>
          <v-list-item-title>{{poem.created_by.name}}</v-list-item-title>
        </v-list-item-content>

        <v-row align="center" justify="end">
          <v-icon class="mr-1" style="cursor: pointer">mdi-heart</v-icon>
          <span class="subheading mr-2">{{poem.likes}}</span>
          <span class="mr-1">·</span>
          <v-icon class="mr-1">mdi-share-variant</v-icon>
          <span class="subheading">45</span>
        </v-row>
      </v-list-item>
    </v-card-actions>
  </v-card>-->

  <v-card class="mx-auto mt-10" max-width="400" dark>
    <v-card-title>{{poem.title}}</v-card-title>

    <v-card-subtitle>Por {{poem.created_by.name}}</v-card-subtitle>

    <v-card-actions>
      <v-icon
        v-if="!liked"
        @click="dolike()"
        class="mr-1 ml-2 mr-3"
        style="cursor: pointer"
      >mdi-heart</v-icon>
      <v-icon
        v-else
        @click="dodislike()"
        class="mr-1 ml-2 mr-3"
        style="cursor: pointer"
        color="black"
      >mdi-heart</v-icon>

      <v-card-text class="card-text" v-if="qtdeLikes > 0" text>{{qtdeLikes}} curtidas</v-card-text>

      <v-spacer></v-spacer>

      <v-btn icon @click="show = !show">
        <v-icon>{{ show ? 'mdi-chevron-up' : 'mdi-chevron-down' }}</v-icon>
      </v-btn>
    </v-card-actions>

    <v-expand-transition>
      <div v-show="show">
        <v-divider></v-divider>

        <v-card-text style="line-height: 150%;">{{poem.poem}}</v-card-text>
      </div>
    </v-expand-transition>
  </v-card>
</template>

<script>
import { mapActions } from "vuex";

export default {
  props: ["poem"],
  data() {
    return {
      show: false,
      liked: false,
      qtdeLikes: this.poem.likes
    };
  },
  methods: {
    ...mapActions({
      like: "VuexFeed/like",
      dislike: "VuexFeed/dislike",
      getMyLikes: "VuexFeed/getMyLikes",
    }),
    async dolike() {
      let res = await this.like(this.poem.id);
      this.liked = true;
      this.qtdeLikes += 1
    },
    async dodislike() {
      let res = await this.dislike(this.poem.id);
      this.liked = false;
      this.qtdeLikes -= 1;
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
    this.MyLikes();
  },
};
</script>

<style>

.card-text{
  padding: 0;
}

</style>