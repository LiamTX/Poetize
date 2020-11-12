<template >
  <div>
    <!-- <NavBar /> -->
    <!-- <Loading/> -->
    <v-row class="mt-7" no-gutters>
      <v-col v-for="data in poemsData" :key="data.id" cols="12" sm="4">
        <PoemCard :data="data" @deleted="deleted($event)"/>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import PoemCard from "@/components/PoemCard.vue";
// import Loading from '@/components/Loading.vue'
import { mapActions, mapGetters, mapMutations } from "vuex";

export default {
  components: { PoemCard },
  data() {
    return {};
  },
  methods: {
    ...mapMutations({
      deletePoem: "VuexFeed/deletePoem"
    }),
    ...mapActions({
      getPoems: "VuexFeed/getPoems",
    }),
    async index() {
      const loading = this.$vs.loading({
        text: "Loading...",
        background: "dark",
        color: "#fff",
      });

      await this.getPoems();

      loading.close();
    },
    async deleted(poem){
      this.deletePoem(poem);
    }
  },
  async created() {
    await this.index();
  },
  computed: {
    poemsData() {
      return this.$store.state.VuexFeed.poems;
    },
  },
};
</script>