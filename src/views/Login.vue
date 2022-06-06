<template>
  <div class="login">
    <v-card
      elevation="2"
      shaped
      max-width="500"
      class="mx-auto pa-5 text-center mt-7"
    >
      <h2 class="mb-2">Login</h2>
      Don't have account yet?
      <router-link :to="{ name: 'Register' }">Register</router-link>
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

        <v-text-field
          v-model="password"
          :rules="[(v) => !!v || 'Item is required']"
          label="Password"
          required
          :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
          :type="show1 ? 'text' : 'password'"
          name="input-10-1"
          hint="At least 8 characters"
          counter
          @click:append="show1 = !show1"
          filled
          rounded
          dense
        ></v-text-field>

        <!-- <v-btn :disabled="!valid" color="success" class="mr-4" @click="validate">
        Validate
      </v-btn>

      <v-btn color="error" class="mr-4" @click="reset">
        Reset Form
      </v-btn> -->
        <div class="my-3 mb-7">
          <router-link :to="{ name: 'Forgot Password' }"
            >Forgot Password</router-link
          >
        </div>
        <v-btn
          :disabled="!valid"
          color="success"
          class="mr-4"
          @click.prevent="signIn"
        >
          Login
        </v-btn>
      </v-form>
    </v-card>
  </div>
</template>

<script>
import firebase from "firebase/app";
import "firebase/auth";

export default {
  name: "Login",
  data: () => ({
    valid: true,
    email: null,
    password: null,
    emailRules: [
      (v) => !!v || "E-mail is required",
      (v) => /.+@.+\..+/.test(v) || "E-mail must be valid",
    ],
    show1: false,
  }),

  methods: {
    signIn() {
      if (this.$refs.form.validate()) {
        firebase
          .auth()
          .signInWithEmailAndPassword(this.email, this.password)
          .then(() => {
            this.$router.push({ name: "Home" });
          })
          .catch((err) => {
            console.log(err.message);
          });
      }
    },
  },
};
</script>

<style></style>
