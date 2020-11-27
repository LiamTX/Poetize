<template>
  <div class="hidden">
    <vs-navbar dark square center-collapsed>
      <template #left>
        <vs-button @click="activeSidebar = !activeSidebar" flat icon>
          <i class="bx bx-menu"></i>
        </vs-button>
      </template>
      <!-- <vs-navbar-item :active="active == 'guide'" id="guide">
        Guide
      </vs-navbar-item>
      <vs-navbar-item :active="active == 'docs'" id="docs">
        Documents
      </vs-navbar-item>
      <vs-navbar-item :active="active == 'components'" id="components">
        Components
      </vs-navbar-item>
      <vs-navbar-item :active="active == 'license'" id="license">
        license
      </vs-navbar-item> -->
    </vs-navbar>
    <vs-sidebar
      background="dark"
      textWhite
      v-model="active"
      :open.sync="activeSidebar"
    >
      <template #logo>
        <img src="../assets/images/logo.png" alt="Poetize" class="cp">
        
      </template>
      <vs-sidebar-item id="feed" to="/Feed">
        <template #icon>
          <i class="bx bx-home"></i>
        </template>
        Feed
      </vs-sidebar-item>
      <vs-sidebar-item id="new_poem" to="/Poem">
        <template #icon>
          <i class="bx bx-book-add"></i>
        </template>
        Novo poema
      </vs-sidebar-item>
      <vs-sidebar-item id="profile" to="/Profile">
        <template #icon>
          <i class="bx bxs-user"></i>
        </template>
        Perfil
      </vs-sidebar-item>
      <vs-sidebar-item id="faq" to="/Help">
        <template #icon>
          <i class="bx bx-info-circle"></i>
        </template>
        Ajude-nos
      </vs-sidebar-item>
      <!-- <vs-sidebar-item id="Music">
        <template #icon>
          <i class="bx bxs-music"></i>
        </template>
        Music
      </vs-sidebar-item>
      <vs-sidebar-group>
        <template #header>
          <vs-sidebar-item arrow>
            <template #icon>
              <i class="bx bx-group"></i>
            </template>
            Social media
          </vs-sidebar-item>
        </template>

        <vs-sidebar-item id="Instagram">
          <template #icon>
            <i class="bx bxl-instagram"></i>
          </template>
          Instagram
        </vs-sidebar-item>
        <vs-sidebar-item id="twitter">
          <template #icon>
            <i class="bx bxl-twitter"></i>
          </template>
          Twitter
        </vs-sidebar-item>
        <vs-sidebar-item id="Facebook">
          <template #icon>
            <i class="bx bxl-facebook"></i>
          </template>
          Facebook
        </vs-sidebar-item>
      </vs-sidebar-group>
      <vs-sidebar-group>
        <template #header>
          <vs-sidebar-item arrow>
            <template #icon>
              <i class="bx bx-code-alt"></i>
            </template>
            Coding
          </vs-sidebar-item>
        </template>

        <vs-sidebar-item id="github">
          <template #icon>
            <i class="bx bxl-github"></i>
          </template>
          Github
        </vs-sidebar-item>
        <vs-sidebar-item id="codepen">
          <template #icon>
            <i class="bx bxl-codepen"></i>
          </template>
          Codepen
        </vs-sidebar-item>
        <vs-sidebar-item id="discord">
          <template #icon>
            <i class="bx bxl-discord"></i>
          </template>
          Discord
        </vs-sidebar-item>
        <vs-sidebar-item id="Javascript">
          <template #icon>
            <i class="bx bxl-javascript"></i>
          </template>
          Javascript
        </vs-sidebar-item>
        <vs-sidebar-item id="git">
          <template #icon>
            <i class="bx bxl-git"></i>
          </template>
          Git
        </vs-sidebar-item>
      </vs-sidebar-group>
      <vs-sidebar-item id="donate">
        <template #icon>
          <i class="bx bxs-donate-heart"></i>
        </template>
        Donate
      </vs-sidebar-item>
      <vs-sidebar-item id="drink">
        <template #icon>
          <i class="bx bx-drink"></i>
        </template>
        Drink
      </vs-sidebar-item>
      <vs-sidebar-item id="shopping">
        <template #icon>
          <i class="bx bxs-shopping-bags"></i>
        </template>
        Shopping
      </vs-sidebar-item>
      <vs-sidebar-item id="chat">
        <template #icon>
          <i class="bx bx-chat"></i>
        </template>
        Chat
      </vs-sidebar-item> -->
      <template #footer>
        <vs-row justify="space-between">
          <vs-avatar class="cp">
            <template v-if="avatar == 0" icon>
              <i class="bx bx-user"></i>
            </template>
            <img v-else :src="avatar" alt="avatar" />
          </vs-avatar>
          <vs-button @click="logOff" danger class="">SAIR</vs-button>
        </vs-row>
      </template>
    </vs-sidebar>
  </div>
</template>
  <script>
import { mapActions } from "vuex";

export default {
  data: () => ({
    avatar: "",
    active: "",
    activeSidebar: false,
    url: ""
  }),

  watch: {
    $route(to, from){
      let path = to.path;

      if(path == '/Feed') this.active = 'feed';
      if(path == '/Poem') this.active = 'new_poem';
      if(path == '/Profile') this.active = 'profile';
      if(path == '/Help') this.active = 'faq';
    }
  },

  methods: {
    ...mapActions({
      getThisUser: "VuexProfile/getThisUser",
    }),
    async index() {
      await this.getThisUser();
      this.avatar = this.$store.state.VuexProfile.user.avatar;
    },
    async logOff() {
      await localStorage.removeItem("token");
      this.$router.push("/Login");
    },
  },
  async created() {
    await this.index();
  },
};
</script>