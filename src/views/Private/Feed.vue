<template >
  <div>
    <NavBar />
    <div class="mt-5">
      <div v-for="data in poemsData" :key="data.id">
        <PoemCard :data="data" />
      </div>
    </div>
  </div>
</template>

<script>
import NavBar from "@/components/NavBar.vue";
import PoemCard from "@/components/PoemCard.vue";
import { mapActions, mapGetters } from "vuex";

export default {
  components: { NavBar, PoemCard },
  data() {
    return {};
  },
  methods: {
    ...mapActions({
      getPoems: "VuexFeed/getPoems",
    }),
    teste(){
        console.log(this.poemsData)
    }
  },
  async created() {
    await this.getPoems();
  },
  computed: {
    poemsData(){
        return this.$store.state.VuexFeed.poems
    }
  },
};
</script>