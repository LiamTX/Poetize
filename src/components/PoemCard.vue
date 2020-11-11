<template>
  <v-card class="mx-auto mt-10" max-width="400" dark>
    <v-card-title>
      {{ data.title }}
    </v-card-title>

    <v-card-subtitle>
      criado por <strong>{{ data.user_id.name }}</strong>
    </v-card-subtitle>

    <v-card-actions>
      <vs-button danger icon>
        <i class="bx bx-heart"></i>
      </vs-button>

      <v-btn icon @click="show = !show" class="alg-txt-e">
        <v-icon>{{ show ? "mdi-chevron-up" : "mdi-chevron-down" }}</v-icon>
      </v-btn>

      <div class="ml-a">
        <vs-avatar disabled size="47" circle class="cp">
          <img :src="data.user_id.avatar" alt="" />
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
export default {
  props: ["data"],
  data() {
    return {
      active: false,
      show: false,
    };
  },
  created() {
    console.log(this.data.poem.split("\n"));
  },
};
</script>