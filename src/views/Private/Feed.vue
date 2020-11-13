<template >
  <div>
    <!-- <NavBar /> -->
    <!-- <Loading/> -->

    <vs-row class="mt-15 ml-12">
      <vs-select dark placeholder="Select" v-model="value">
        <vs-option label="Mais novos" value="1"> Mais novos </vs-option>
        <vs-option label="Mais antigos" value="2"> Mais antigos </vs-option>
        <vs-option label="Mais curtidos" value="3"> Mais curtidos </vs-option>
        <!-- <vs-option disabled label="Sass" value="4"> Sass </vs-option>
        <vs-option label="Typescript" value="5"> Typescript </vs-option>
        <vs-option label="Webpack" value="6"> Webpack </vs-option>
        <vs-option label="Nodejs" value="7"> Nodejs </vs-option> -->
      </vs-select>
    </vs-row>

    <!-- <v-divider class="mt-7"></v-divider> -->

    <v-row class="" no-gutters>
      <v-col v-for="data in poemsData" :key="data.id" cols="12" sm="4" class="">
        <PoemCard :data="data" @deleted="deleted($event)" />
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
    return {
      value: "1",
    };
  },
  methods: {
    ...mapMutations({
      deletePoem: "VuexFeed/deletePoem",
      olderPoems: "VuexFeed/olderPoems",
      youngerPoems: "VuexFeed/youngerPoems"
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
    async deleted(poem) {
      this.deletePoem(poem);
    },
    older() {
      this.olderPoems();
    },
  },
  async created() {
    await this.index();
  },
  watch: {
    value: function (val) {
      if (val == 2) {
        this.olderPoems();
      }else if(val == 1){
        this.youngerPoems()
      }
    },
  },
  computed: {
    poemsData() {
      return this.$store.state.VuexFeed.poems;
    },
  },
};
</script>