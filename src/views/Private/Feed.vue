<template>
  <div>
    <NavBar class="bar" />
    <v-row no-gutters>
      <v-col v-for="poem in poems" :key="poem.id" cols="12" sm="4">
        <PoemCard :poem="poem" />
      </v-col>
    </v-row>
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
      poems: [],
    };
  },
  methods: {
    ...mapActions({
      getPoems: "VuexFeed/getPoems",
    }),
    async load() {
      this.poems = await this.getPoems();
    },
  },
  created() {
    this.load();
  },
};
</script>

<style>
.bar {
  border-radius: 10px;
}
</style>