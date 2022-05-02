<script lang="ts">
import { RouterLink, RouterView } from "vue-router";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { faHeart } from "@fortawesome/free-regular-svg-icons";
import { faHouse, faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { dogApiInstance } from "./main";
import { defineComponent } from "vue";

export default defineComponent({
  name: "App",
  async mounted() {
    this.dogBreeds = await dogApiInstance.getParentBreeds();
  },
  data() {
    const dogBreeds: string[] = [];
    return {
      currentImg: "",
      faHeart: faHeart,
      faHouse: faHouse,
      faMagnifyingGlass: faMagnifyingGlass,
      dogBreeds,
    };
  },
  methods: {
    onSelectBreed(event: any) {
      if (event == null) {
        return;
      }

      const searchBreed = event?.target?.value;
      this.$router.push({ path: `/breed/${searchBreed}` });
    },
  },
  components: {
    FontAwesomeIcon,
    RouterLink,
    RouterView,
  },
});
</script>

<template>
  <nav class="navbar">
    <h1>Sky Dog</h1>
    <font-awesome-icon :icon="faMagnifyingGlass" size="2x"></font-awesome-icon>
    <select @change="onSelectBreed($event)">
      <option value="">Select a breed...</option>
      <option v-for="breed in dogBreeds" :key="breed" :value="breed">
        {{ breed }}
      </option>
    </select>
    <RouterLink class="btn navbar__btn" :to="'/'">
      <font-awesome-icon :icon="faHouse" size="2x"></font-awesome-icon>
    </RouterLink>
    <RouterLink class="btn navbar__btn" :to="'/likes'">
      <font-awesome-icon :icon="faHeart" size="2x"></font-awesome-icon>
    </RouterLink>
  </nav>
  <div class="content">
    <RouterView :key="$route.path" />
  </div>
</template>

<style lang="scss">
@import "@/assets/base.css";

#app {
  display: flex;
  flex-direction: column;
  height: 100%;
}

.navbar {
  padding: 1rem;
  background-color: var(--bg);
  box-shadow: var(--box-shadow);
  display: flex;
  z-index: 1;

  & > h1 {
    margin: 0;
    margin-right: auto;
  }

  &__btn,
  select {
    margin: 0 1rem;
  }

  & select {
    border-radius: 0.5rem;
    border-width: 2px;
    border-color: var(--txt);
  }
}

.content {
  padding: 1rem;
  height: 100%;
  background-color: var(--bg__hover);
}

.btn {
  background-color: transparent;
  border: none;
  outline: none;
  color: var(--txt);
  transition: color 500ms ease;

  &:hover {
    color: var(--clr-primary);
  }
}
</style>
