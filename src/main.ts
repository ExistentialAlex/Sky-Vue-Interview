import { createApp } from "vue";
import { createPinia } from "pinia";

import App from "./App.vue";
import router from "./router";
import { DogApi } from "./services/dogApi.service";

const app = createApp(App);
const dogApiInstance = new DogApi();

app.use(createPinia());
app.use(router);

app.mount("#app");

export { dogApiInstance };
