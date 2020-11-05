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
      <template #right>
        <h2>Poetize</h2>
      </template>
    </vs-navbar>
    <vs-sidebar
      background="dark"
      textWhite
      absolute
      v-model="active"
      :open.sync="activeSidebar"
    >
      <template #logo>
        <img src="" alt="" />
        Poetize
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
            <img
              src="https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/111e155a-5ab6-4f4b-82a1-91da2fe5b9c4/de7nttk-0c8254e0-92bd-4cd0-b190-85d15b0a41c0.jpg/v1/fill/w_1024,h_1308,q_75,strp/blood_bending___illustration_by_adriengonzalez_de7nttk-fullview.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOiIsImlzcyI6InVybjphcHA6Iiwib2JqIjpbW3siaGVpZ2h0IjoiPD0xMzA4IiwicGF0aCI6IlwvZlwvMTExZTE1NWEtNWFiNi00ZjRiLTgyYTEtOTFkYTJmZTViOWM0XC9kZTdudHRrLTBjODI1NGUwLTkyYmQtNGNkMC1iMTkwLTg1ZDE1YjBhNDFjMC5qcGciLCJ3aWR0aCI6Ijw9MTAyNCJ9XV0sImF1ZCI6WyJ1cm46c2VydmljZTppbWFnZS5vcGVyYXRpb25zIl19.3TA-zMfleFCY7bsKbUSSRYcwQGU9cNnLZu5I-rkdcSE"
              alt="avatar"
            />
          </vs-avatar>
        </vs-row>
      </template>
    </vs-sidebar>
  </div>
</template>
  <script>
export default {
  data: () => ({
    active: "",
    activeSidebar: false,
  }),
};
</script>