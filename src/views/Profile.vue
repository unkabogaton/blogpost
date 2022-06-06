<template>
  <div>
    <v-card
      elevation="2"
      shaped
      max-width="500"
      class="mx-auto pa-5 text-center mt-7"
    >
      <h2>Profile</h2>
      <v-avatar size="60" color="teal" class="ma-5">{{
        $store.state.profileInitials
      }}</v-avatar>
      <v-form ref="form" v-model="valid" lazy-validation>
        <v-text-field
          v-model="$store.state.profileFirstName"
          :rules="nameRules1"
          label="First Name"
          required
          filled
          rounded
          dense
        ></v-text-field>
        <v-text-field
          v-model="$store.state.profileLastName"
          :rules="nameRules2"
          label="Last Name"
          required
          filled
          rounded
          dense
        ></v-text-field>
        <v-text-field
          v-model="$store.state.profileUsername"
          :rules="usernameRules"
          label="Username"
          required
          filled
          rounded
          dense
        ></v-text-field>
        <v-text-field
          readonly
          v-model="$store.state.profileEmail"
          label="E-mail"
          required
          outlined
          rounded
        ></v-text-field>
        <v-btn
          color="success"
          :disabled="!valid"
          @click.prevent="updateProfile"
        >
          Save Changes
        </v-btn>
      </v-form>
    </v-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      valid: true,
      nameRules1: [(v) => !!v || "First Name is required"],
      nameRules2: [(v) => !!v || "Last Name is required"],
      usernameRules: [(v) => !!v || "Username is required"],
    };
  },
  methods: {
    updateProfile() {
      this.$store.dispatch("updateUserSettings");
      console.log("success");
    },
  },
};
</script>

<style></style>
