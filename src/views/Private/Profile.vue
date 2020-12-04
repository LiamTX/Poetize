<template >
  <div>
    <vs-row>
      <vs-row class="mt-20" justify="center" direction="column">
        <!-- Disable -->
        <vs-row v-if="!edit" justify="center" direction="column">
          <div class="ac">
            <vs-avatar disabled size="70" circle class="cp">
              <template v-if="src_avatar == 0" icon>
                <i class="bx bx-user"></i>
              </template>
              <img v-else :src="src_avatar" alt="" />
            </vs-avatar>
          </div>

          <vs-input
            class="mt-2"
            disabled
            dark
            placeholder="Nome/Apelido"
            v-model="user.name"
          >
          </vs-input>

          <vs-input
            disabled
            class="mt-2"
            dark
            placeholder="E-mail"
            v-model="user.email"
          >
          </vs-input>

          <vs-button
            class="ac button mt-2"
            disabled
            border
            dark
            @click="active3 = !active3"
          >
            Senha
          </vs-button>
        </vs-row>
        <!-- Enable -->
        <vs-row v-else justify="center" direction="column">
          <div class="ac">
            <input
              ref="fileInput"
              class="hiden-input"
              type="file"
              @change="onAvatarSelected"
              accept="image/*"
            />
            <vs-avatar
              @click="$refs.fileInput.click()"
              size="70"
              circle
              class="cp"
            >
              <template v-if="src_avatar == 0" icon>
                <i class="bx bx-user"></i>
              </template>
              <img v-else :src="src_avatar" alt="" />
            </vs-avatar>
          </div>

          <vs-input
            class="mt-2"
            dark
            placeholder="Nome/Apelido"
            v-model="user.name"
          >
          </vs-input>

          <vs-input class="mt-2" dark placeholder="E-mail" v-model="user.email">
          </vs-input>

          <vs-button
            class="ac button mt-2"
            dark
            border
            @click="active3 = !active3"
          >
            Senha
          </vs-button>

          <vs-dialog width="300px" not-center v-model="active3">
            <template #header>
              <h4 class="not-margin">Alteração de senha</h4>
            </template>

            <div class="con-content">
              <vs-input
                type="password"
                dark
                v-model="new_password"
                placeholder="Nova senha"
              ></vs-input>
              <vs-input
                type="password"
                dark
                v-model="confirm_password"
                placeholder="Confirme a nova senha"
              ></vs-input>
            </div>

            <template #footer>
              <div class="con-footer">
                <vs-button @click="active3 = false" dark transparent>
                  Ok
                </vs-button>
                <vs-button @click="active3 = false" dark transparent>
                  Cancel
                </vs-button>
              </div>
            </template>
          </vs-dialog>
        </vs-row>

        <vs-row v-if="!edit" class="mt-2" justify="center">
          <vs-button
            class="button"
            @click="edit = !edit"
            dark
            :active="active == 1"
          >
            Editar
          </vs-button>
        </vs-row>

        <vs-row v-else class="mt-2" justify="center">
          <vs-button
            v-if="!loading"
            @click="sendForm"
            class="button_"
            success
            :active="active == 1"
          >
            Salvar
          </vs-button>
          <vs-button
            v-else
            loading
            class="button_"
            success
            :active="active == 1"
          >
            Salvar
          </vs-button>
          <vs-button
            danger
            class="button_"
            @click="edit = false"
            :active="active == 1"
          >
            Cancelar
          </vs-button>
        </vs-row>
      </vs-row>
    </vs-row>
    <v-divider class="mt-5 mb-5"></v-divider>

    <vs-row>
      <vs-select class="ac" dark placeholder="Select" v-model="value">
        <vs-option label="Seus poemas" value="1"> Seus poemas </vs-option>
        <vs-option label="Você curtiu" value="2"> Você curtiu </vs-option>
        <!-- <vs-option label="Mais curtidos" value="3"> Mais curtidos </vs-option> -->
        <!-- <vs-option disabled label="Sass" value="4"> Sass </vs-option>
        <vs-option label="Typescript" value="5"> Typescript </vs-option>
        <vs-option label="Webpack" value="6"> Webpack </vs-option>
        <vs-option label="Nodejs" value="7"> Nodejs </vs-option> -->
      </vs-select>
    </vs-row>

    <div v-if="value == 1">
      <div v-if="poems.length > 0" class="mt-2">
        <v-row no-gutters>
          <v-col
            class="mb-4"
            v-for="poem in poems"
            :key="poem.id"
            cols="12"
            sm="4"
          >
            <PoemCard :data="poem" @deleted="deleted($event)" />
          </v-col>
        </v-row>
      </div>
      <div v-else class="mt-4">
        <h2 class="alg-txt-c">Você ainda não tem poemas cadastrados</h2>
        <vs-button to="/Poem" class="button ac" dark :active="active == 1"
          >Cadastre novo um poema</vs-button
        >
      </div>
    </div>

    <div v-else-if="value == 2">
      <div v-if="myLikes.length > 0" class="mt-2">
        <v-row no-gutters>
          <v-col
            class="mb-4"
            v-for="poem in poemsLiked"
            :key="'a' + poem.id"
            cols="12"
            sm="4"
          >
            <PoemCard :data="poem" @deleted="deleted($event)" />
          </v-col>
        </v-row>
      </div>
      <div v-else class="mt-4">
        <h2 class="alg-txt-c">Você ainda não curtiu nenhum poema.</h2>
        <vs-button to="/Feed" class="button ac" dark :active="active == 1"
          >Explore novos poemas</vs-button
        >
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapMutations } from "vuex";
import PoemCard from "@/components/PoemCard";
// import YourLikes from "@/components/YourLikes";

export default {
  components: { PoemCard },
  data() {
    return {
      value: 1,
      active3: false,
      active: 0,
      loading: false,
      edit: false,
      src_avatar: "",
      user: {
        avatar: "",
        name: "",
        email: "",
        new_pass: "",
      },
      new_password: "",
      confirm_password: "",
      poems: "",
      poemsLiked: [],
    };
  },

  methods: {
    ...mapMutations({
      deletePoem: "VuexProfile/deletePoem",
    }),
    ...mapActions({
      getMyLikes: "VuexProfile/getMyLikes",
      getThisUser: "VuexProfile/getThisUser",
      getMyPoems: "VuexProfile/getMyPoems",
      update: "VuexProfile/update",
      uploadAvatar: "uploadAvatar",
      getPoemById: "VuexProfile/getPoemById",
    }),
    async deleted(poem) {
      this.deletePoem(poem);

      this.$vs.notification({
        progress: "auto",
        color: "success",
        position: "top-center",
        title: `Hey!`,
        text: "Poema deletado com sucesso!",
      });
    },
    async index() {
      await this.getThisUser();
      await this.getMyPoems();
      await this.getMyLikes();

      // console.log(this.myLikes)

      if (this.myLikes.length > 0) {
        for (let i = 0; i < this.myLikes.length; i++) {
          let poem = await this.getPoemById(this.myLikes[i].poem_id);
          this.poemsLiked.push(poem.data);
        }
      }

      // console.log(this.poemsLiked)

      this.src_avatar = this.$store.state.VuexProfile.user.avatar;
      this.user.avatar = this.$store.state.VuexProfile.user.avatar;
      this.user.name = this.$store.state.VuexProfile.user.name;
      this.user.email = this.$store.state.VuexProfile.user.email;

      this.poems = this.$store.state.VuexProfile.poems;
    },
    onAvatarSelected(event) {
      const files = event.target.files;
      let fileName = files[0].name;
      this.imageData = event.target.files[0];

      const fr = new FileReader();
      fr.addEventListener("load", () => {
        this.src_avatar = fr.result;
      });

      fr.readAsDataURL(files[0]);
    },
    async onUploadAvatar() {
      const fd = new FormData();
      fd.append("avatar", this.imageData);

      const response = await this.uploadAvatar(fd);

      return response;
    },
    async sendForm() {
      try {
        this.loading = true;

        if (this.src_avatar != this.user.avatar) {
          const url = await this.onUploadAvatar();

          this.user.avatar = url.data;
        }

        if (this.new_password !== "") {
          if (this.new_password !== this.confirm_password) {
            this.$vs.notification({
              duration: "10000",
              progress: "auto",
              color: "danger",
              position: "top-center",
              title: `Ops!`,
              text: "Confirme a senha corretamente!",
            });

            this.loading = false;
            this.new_password = "";
            this.confirm_password = "";

            this.active3 = true;
            return;
          }

          if (this.confirm_password == "" || this.new_password == "") {
            this.$vs.notification({
              duration: "10000",
              progress: "auto",
              color: "danger",
              position: "top-center",
              title: `Ops!`,
              text: "Preencha todos os campos!",
            });

            this.active3 = true;
            return;
          }

          this.user.new_pass = this.new_password;
        }

        const response = await this.update(this.user);

        if (response.data.token) {
          localStorage.setItem("token", response.data.token);
        }

        this.$vs.notification({
          duration: "8000",
          progress: "auto",
          color: "success",
          position: "top-center",
          title: `Hey!`,
          text: "Atualizado com sucesso.",
        });

        this.loading = false;
        this.edit = false;
      } catch (error) {
        const message = error.message;

        this.loading = false;

        console.log(message);

        return;
      }
    },
  },

  computed: {
    myLikes() {
      return this.$store.state.VuexProfile.myLikes;
    },
    // poemsLiked() {
    //   return this.$store.state.VuexProfile.poemsLiked;
    // },
  },

  async created() {
    const loading = this.$vs.loading({
      text: "Loading...",
      background: "dark",
      color: "#fff",
    });

    try {
      await this.index();
      loading.close();
    } catch (error) {
      loading.close();

      if (error.message == "Request failed with status code 401") {
        this.$router.push("/Login");
      }
    }
  },
};
</script>

<style lang="stylus">
.button_ {
  width: 100px;
}

getColor(vsColor, alpha = 1) {
  unquote('rgba(var(--vs-' + vsColor + '), ' + alpha + ')');
}

getVar(var) {
  unquote('var(--vs-' + var + ')');
}

.con-footer {
  display: flex;
  align-items: center;
  justify-content: flex-end;

  .vs-button {
    margin: 0px;

    .vs-button__content {
      padding: 10px 30px;
    }

    ~ .vs-button {
      margin-left: 10px;
    }
  }
}

.not-margin {
  margin: 0px;
  font-weight: normal;
  padding: 10px;
  padding-bottom: 0px;
}

.con-content {
  width: 100%;

  p {
    font-size: 0.8rem;
    padding: 0px 10px;
  }

  .vs-checkbox-label {
    font-size: 0.8rem;
  }

  .vs-input-parent {
    width: 100%;
  }

  .vs-input-content {
    margin: 10px 0px;
    width: calc(100%);

    .vs-input {
      width: 100%;
    }
  }
}

.footer-dialog {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  width: calc(100%);

  .new {
    margin: 0px;
    margin-top: 20px;
    padding: 0px;
    font-size: 0.7rem;

    a {
      color: getColor('primary') !important;
      margin-left: 6px;

      &:hover {
        text-decoration: underline;
      }
    }
  }

  .vs-button {
    margin: 0px;
  }
}
</style>