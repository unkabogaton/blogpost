<template>
  <div class="forgot-password">
    <h3>Forgot Password</h3>
    <br />
    Back to
    <router-link :to="{ name: 'Login' }">Login</router-link>
    <br />
    <v-form ref="form" v-model="valid" lazy-validation>
      <v-text-field
        v-model="email"
        :rules="emailRules"
        label="E-mail"
        required
      ></v-text-field>
      <v-btn color="warning" :disabled="!valid" @click="resetPassword">
        Reset
      </v-btn>
    </v-form>
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
