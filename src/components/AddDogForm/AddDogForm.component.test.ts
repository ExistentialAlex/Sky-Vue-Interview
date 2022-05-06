import { mount } from "@vue/test-utils";
import { test, expect } from "vitest";
import AddDogForm from "./AddDogForm.component.vue";

test("Mount & Test Form", async () => {
  expect(AddDogForm).toBeTruthy();

  const wrapper = mount(AddDogForm);

  // no name
  await wrapper.get("button").trigger("click");

  expect(wrapper.get('label[id="nameErr"]').text()).toEqual(
    "Please provide a value for name."
  );

  // no breed
  await wrapper.get('input[name="name"]').setValue("Alex");

  await wrapper.get("button").trigger("click");

  expect(wrapper.get('label[id="breedErr"]').text()).toEqual(
    "Please provide a value for breed."
  );

  // no url
  await wrapper.get('input[name="breed"]').setValue("Beagel");

  await wrapper.get("button").trigger("click");

  expect(wrapper.get('label[id="urlErr"]').text()).toEqual(
    "Please provide a value for url."
  );

  // all present
  await wrapper.get('input[name="url"]').setValue("abcd");

  await wrapper.get("button").trigger("click");

  expect(wrapper.get("p").text()).toEqual("Success");
});
