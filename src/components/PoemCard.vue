<template>
  <v-card class="mx-auto mt-10" max-width="400" dark>
    <v-card-title>
      {{ data.title }}
    </v-card-title>

    <v-card-subtitle> </v-card-subtitle>

    <v-card-actions>
      <vs-button danger icon>
        <i class="bx bx-heart"></i>
      </vs-button>

      <v-btn icon @click="show = !show" class="alg-txt-e">
        <v-icon>{{ show ? "mdi-chevron-up" : "mdi-chevron-down" }}</v-icon>
      </v-btn>
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
      show: false,
      img:
        "https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/111e155a-5ab6-4f4b-82a1-91da2fe5b9c4/de7nttk-0c8254e0-92bd-4cd0-b190-85d15b0a41c0.jpg/v1/fill/w_1024,h_1308,q_75,strp/blood_bending___illustration_by_adriengonzalez_de7nttk-fullview.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOiIsImlzcyI6InVybjphcHA6Iiwib2JqIjpbW3siaGVpZ2h0IjoiPD0xMzA4IiwicGF0aCI6IlwvZlwvMTExZTE1NWEtNWFiNi00ZjRiLTgyYTEtOTFkYTJmZTViOWM0XC9kZTdudHRrLTBjODI1NGUwLTkyYmQtNGNkMC1iMTkwLTg1ZDE1YjBhNDFjMC5qcGciLCJ3aWR0aCI6Ijw9MTAyNCJ9XV0sImF1ZCI6WyJ1cm46c2VydmljZTppbWFnZS5vcGVyYXRpb25zIl19.3TA-zMfleFCY7bsKbUSSRYcwQGU9cNnLZu5I-rkdcSE",
    };
  },
};
</script>