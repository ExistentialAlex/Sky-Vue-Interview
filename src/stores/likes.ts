import { defineStore } from "pinia";
import { useStorage } from "@vueuse/core";

export const useLikesStore = defineStore({
  id: "likes",
  state: () => ({
    /** @type {string[]} */
    likes: useStorage<string[]>("likes", []),
  }),
  getters: {
    get: (state) => state.likes,
  },
  actions: {
    addLike(like: string) {
      this.likes.push(like);
    },
    removeLike(like: string) {
      for (let i = 0; i < this.likes.length; i++) {
        if (this.likes[i] === like) {
          this.likes.splice(i, 1);
        }
      }
    },
  },
});
