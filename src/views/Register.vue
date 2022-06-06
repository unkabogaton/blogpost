<template>
  <div class="register">
    <h3>Register</h3>
    <br />
    Already have an account?
    <router-link :to="{ name: 'Login' }">Login</router-link>
    <v-form ref="form" v-model="valid" lazy-validation>
      <v-text-field
        v-model="firstName"
        :rules="nameRules1"
        label="First Name"
        required
      ></v-text-field>
      <v-text-field
        v-model="lastName"
        :rules="nameRules2"
        label="Last Name"
        required
      ></v-text-field>
      <v-text-field
        v-model="username"
        :rules="usernameRules"
        label="Username"
        required
      ></v-text-field>

      <v-text-field
        v-model="email"
        :rules="emailRules"
        label="E-mail"
        required
      ></v-text-field>

      <v-text-field
        v-model="password"
        :rules="[(v) => !!v || 'Password is required']"
        label="Password"
        required
        :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
        :type="show1 ? 'text' : 'password'"
        name="input-10-1"
        hint="At least 8 characters"
        counter
        @click:append="show1 = !show1"
      ></v-text-field>

      <v-checkbox
        v-model="checkbox"
        :rules="[(v) => !!v || 'You must agree to continue!']"
        label="Do you agree to terms and conditions?"
        required
      ></v-checkbox>

      <v-btn color="warning" :disabled="!valid" @click.prevent="register">
        Sign up
      </v-btn>
    </v-form>
  </div>
</template>

<script>
import firebase from "firebase/app";
import "firebase/auth";
import db from "../firebase/firebaseInit";

export default {
  name: "Register",
  data: () => ({
    valid: true,
    firstName: null,
    lastName: null,
    username: null,
    email: null,
    password: null,
    checkbox: false,
    show1: false,
    nameRules1: [(v) => !!v || "First Name is required"],
    nameRules2: [(v) => !!v || "Last Name is required"],
    usernameRules: [(v) => !!v || "Username is required"],
    emailRules: [
      (v) => !!v || "E-mail is required",
      (v) => /.+@.+\..+/.test(v) || "E-mail must be valid",
    ],
  }),

  methods: {
    // validate() {
    //   this.$refs.form.validate();
    // },
    // reset() {
    //   this.$refs.form.reset();
    // },
    // resetValidation() {
    //   this.$refs.form.resetValidation();
    // },
    async register() {
      if (this.$refs.form.validate()) {
        const firebaseAuth = await firebase.auth();
        const createUser = await firebaseAuth.createUserWithEmailAndPassword(
          this.email,
          this.password
        );
        const result = await createUser;
        const dataBase = db.collection("users").doc(result.user.uid);
        await dataBase.set({
          firstName: this.firstName,
          lastName: this.lastName,
          username: this.username,
          email: this.email,
        });
        this.$router.push({ name: "Login" });
        console.log("oye");
        return;
      }
    },
  },
};
</script>

<style></style>
