<script lang="ts">
import { dogApiInstance } from "@/main";
import DogImg from "@/components/DogImg.component.vue";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { faRotate } from "@fortawesome/free-solid-svg-icons";
import { defineComponent } from "vue";

export default defineComponent({
  name: "HomeView",
  async mounted() {
    this.refreshImg();
  },
  data() {
    return {
      currentImg: "",
      refreshIcon: faRotate,
      refreshing: false,
      currentId: "",
      currentBreed: "",
    };
  },
  methods: {
    async refreshImg() {
      this.refreshing = true;
      setTimeout(async () => {
        this.currentImg = await dogApiInstance.getRandom();
        const splitImg = this.currentImg.split("/");
        this.currentBreed = splitImg[4];
        this.currentId = splitImg[5].split(".")[0];
        this.refreshing = false;
      }, 2000);
    },
  },
  components: {
    DogImg,
    FontAwesomeIcon,
  },
});
</script>

<template>
  <main>
    <div :class="{ homeview: true, 'homeview--reload': refreshing }">
      <DogImg :img="currentImg" :breed="currentBreed" :id="currentId" />
      <div class="homeview__btns">
        <button
          :class="{
            btn: true,
            homeview__btn: true,
            'homeview__btn--active': refreshing,
          }"
          @click="refreshImg()"
        >
          <font-awesome-icon :icon="refreshIcon" size="2x"></font-awesome-icon>
        </button>
      </div>
    </div>
  </main>
</template>

<style lang="scss" scoped>
main {
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
.homeview {
  display: flex;
  flex-direction: column;

  &__btns {
    margin-top: 1rem;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 1rem;
    background-color: var(--bg-dark);
    box-shadow: var(--box-shadow);
  }
  &__btn {
    color: var(--bg);

    &:hover {
      color: var(--clr-primary);
    }
    &--active {
      color: var(--clr-primary);
      animation: spin 2s linear infinite;
    }
  }

  &--reload {
    opacity: 0.5;
  }

  @keyframes spin {
    100% {
      -webkit-transform: rotate(360deg);
      transform: rotate(360deg);
    }
  }
}
</style>
