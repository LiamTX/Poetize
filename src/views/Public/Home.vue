<template>
  <v-container class="d-flex flex-column justify-center align-center box mt-15">

    <img alt="Vue logo" src="../../assets/logo.png" width="360" height="200">

    <v-container class="d-flex flex-column justify-center align-center">

    <v-btn class="button" dark to="/Login" block>Entrar</v-btn>

    <v-btn class="button" dark to="/Signup" block>Cadastro</v-btn>

    </v-container>

  </v-container>
</template>

<script>

export default {

  name: 'Home'

}
</script>

<style scoped>

.button {

  margin-top: 10px;

}

.box {
  max-width: 550px;
}

</style>
