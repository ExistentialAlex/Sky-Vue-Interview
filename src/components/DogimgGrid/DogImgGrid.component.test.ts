import { mount } from "@vue/test-utils";
import { test, expect } from "vitest";
import DogImgGrid from "./DogImgGrid.component.vue";
import type { IDogImg } from "@/interfaces/dogImg.interface";
import { createTestingPinia } from "@pinia/testing";

test("Mount", async () => {
  expect(DogImgGrid).toBeTruthy();

  const dogs: IDogImg[] = [
    {
      img: "	https://images.dog.ceo/breeds/mastiff-english/2.jpg",
      breed: "engilsh mastiff",
      id: "2",
    },
  ];

  const wrapper = mount(DogImgGrid, {
    global: {
      plugins: [createTestingPinia()],
    },
    props: {
      dogs: dogs,
    },
  });

  // expect that we will render the correct number of imgs.
  expect(wrapper.findAll("[data-test='dog-img']")).toHaveLength(dogs.length);
});
