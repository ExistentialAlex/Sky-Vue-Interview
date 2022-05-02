import { mount } from "@vue/test-utils";
import { test, expect } from "vitest";
import DogImg from "./DogImg.component.vue";
import { createTestingPinia } from "@pinia/testing";

test("Mount", async () => {
  expect(DogImg).toBeTruthy();

  const wrapper = mount(DogImg, {
    global: {
      plugins: [createTestingPinia()],
    },
    props: {
      img: "	https://images.dog.ceo/breeds/mastiff-english/2.jpg",
      breed: "engilsh mastiff",
      id: "2",
    },
  });

  await wrapper.get("button").trigger("click");

  expect(wrapper.get('[data-test="showFill"]').classes()).toContain(
    "di__solidHeart--active"
  );

  await wrapper.get("button").trigger("click");

  expect(wrapper.get('[data-test="showFill"]').classes()).not.toContain(
    "di__solidHeart--active"
  );
});
