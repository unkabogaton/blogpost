<template>
  <div class="forgot-password">
    <v-card
      elevation="2"
      shaped
      max-width="500"
      class="mx-auto pa-5 text-center mt-7"
    >
      <h2>Forgot Password</h2>
      <br />
      Have an accoount? Back to
      <router-link :to="{ name: 'Login' }">Login</router-link>
      <br />
      <br />
      <v-form ref="form" v-model="valid" lazy-validation>
        <v-text-field
          autofocus
          v-model="email"
          :rules="emailRules"
          label="E-mail"
          required
          filled
          rounded
          dense
        ></v-text-field>
        <br />
        <v-btn color="warning" :disabled="!valid" @click="resetPassword">
          Reset
        </v-btn>
        <br />
      </v-form>
    </v-card>
  </div>
</template>

<script>
import firebase from "firebase/app";
import "firebase/auth";

export default {
  name: "ForgotPassword",
  data() {
    return {
      valid: true,
      email: null,
      emailRules: [
        (v) => !!v || "E-mail is required",
        (v) => /.+@.+\..+/.test(v) || "E-mail must be valid",
      ],
    };
  },
  methods: {
    resetPassword() {
      if (this.$refs.form.validate()) {
        firebase
          .auth()
          .sendPasswordResetEmail(this.email)
          .catch((err) => {
            console.log(err.message);
          });
      }
    },
  },
};
</script>

<style></style>
