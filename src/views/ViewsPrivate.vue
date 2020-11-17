<template>
  <div class="app_p">
    <NavBar />
    <!-- <ConfirmEmail v-if="user.confirmed == 0" class="mt-10" /> -->
    <router-view />
  </div>
</template>

<script>
import NavBar from "@/components/NavBar.vue";
import ConfirmEmail from "@/components/ConfirmEmail";
import { mapActions } from "vuex";
export default {
  components: { NavBar, ConfirmEmail },
  // methods: {
  //   ...mapActions({
  //     getThisUser: "VuexProfile/getThisUser",
  //   }),
  //   async index() {
  //     await this.getThisUser();
  //   },
  // },
  // computed: {
  //   user() {
  //     return this.$store.state.VuexProfile.user;
  //   },
  // },
};
</script>

<style>
.none{
  display: none;
}
</style>