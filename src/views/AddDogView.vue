<script lang="ts">
import AddDogForm from "@/components/AddDogForm/AddDogForm.component.vue";
import { defineComponent } from "vue";

export default defineComponent({
  name: "AddDogView",
  components: {
    AddDogForm,
  },
});
</script>

<template>
  <main>
    <AddDogForm />
  </main>
</template>

<style lang="scss" scoped>
main {
  height: 100%;
}
</style>
