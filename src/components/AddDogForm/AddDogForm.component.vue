<script lang="ts">
import { defineComponent } from "vue";
import { dogApiInstance } from "../../main";

export default defineComponent({
  name: "AddDogForm",
  data() {
    return {
      name: "",
      breed: "",
      url: "",
      nameErr: "",
      breedErr: "",
      urlErr: "",
      result: "",
    };
  },
  methods: {
    async submitForm() {
      if (this.name === "") {
        this.nameErr = "Please provide a value for name.";
        return;
      }

      this.nameErr = "";

      if (this.breed === "") {
        this.breedErr = "Please provide a value for breed.";
        return;
      }

      this.breedErr = "";

      if (this.url === "") {
        this.urlErr = "Please provide a value for url.";
        return;
      }

      this.urlErr = "";

      const result = await dogApiInstance.addDogImg(
        this.name,
        this.breed,
        this.url
      );

      this.result = result ? "Success" : "Failure";

      return;
    },
  },
});
</script>

<template>
  <div class="adf">
    <h3>Name</h3>
    <input name="name" v-model="name" />
    <label id="nameErr" for="name">{{ nameErr }}</label>
    <h3>Breed</h3>
    <input name="breed" v-model="breed" />
    <label id="breedErr" for="breed">{{ breedErr }}</label>
    <h3>Image URL</h3>
    <input name="url" v-model="url" />
    <label id="urlErr" for="url">{{ urlErr }}</label>
    <button @click="submitForm()">Add Dog</button>
    <p>{{}}</p>
  </div>
</template>

<style lang="scss" scoped>
.adf {
  display: flex;
  flex-direction: column;
  align-items: center;

  & h3 {
    margin: 0;
    margin-bottom: 0.5rem;
  }

  & button {
    margin-top: 1rem;
  }
}
</style>
