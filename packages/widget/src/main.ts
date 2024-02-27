import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";

const appDiv = document.createElement("div");
appDiv.id = "app";

createApp(App).mount(appDiv);

document.body.appendChild(appDiv);
