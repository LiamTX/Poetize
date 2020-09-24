<template>
  <div class="toolBardiv">
    <v-app-bar dark class="ac">
      <div class="d-flex flex-row justify-space-between mw-w-100">
        <v-app-bar-nav-icon @click="drawer = true"></v-app-bar-nav-icon>
      </div>
      <div>
        <v-toolbar-title>Poetize</v-toolbar-title>
      </div>
    </v-app-bar>

    <v-navigation-drawer class="" dark v-model="drawer" absolute temporary>
      <v-list nav dense>
        <v-list-item-group v-model="group" active-class="text--accent-4">
          <v-list-item exact to="/Feed">
            <v-list-item-icon>
              <v-icon>mdi-home</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Feed</v-list-item-title>
          </v-list-item>

          <v-list-item exact to="/Poem">
            <v-list-item-icon>
              <v-icon>mdi-book-plus</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Novo poema</v-list-item-title>
          </v-list-item>

          <v-list-item exact to="/Profile">
            <v-list-item-icon>
              <v-icon>mdi-account</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Perfil</v-list-item-title>
          </v-list-item>

          <div class="alg-txt-c mt-10">
            <v-btn class="button red" @click="logOff()">SAIR</v-btn>
          </div>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>
  </div>
</template>

<script>
export default {
  name: "NavBar",
  data() {
    return {
      drawer: false,
      group: null,
    };
  },
  methods: {
    async logOff(){
      await localStorage.clear();

      this.$router.push('/Login');
    }
  }
};
</script>