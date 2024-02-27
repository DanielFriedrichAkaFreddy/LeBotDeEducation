<script setup lang="ts">
import { PaperAirplaneIcon } from "@heroicons/vue/16/solid";
import { ref } from "vue";
import api from "./api";

interface ChatMessage {
  role: "user" | "bot";
  message: string;
}

const messages = ref<ChatMessage[]>([]);
const input = ref<string>("");

const sendMessage = () => {
  if (!input.value) return;

  messages.value.push({
    role: "user",
    message: input.value,
  });

  api.chatHandler({ message: input.value }).then((response) => {
    messages.value.push({
      role: "bot",
      message: response.message,
    });
  });

  input.value = "";
};
</script>

<template>
  <div
    class="absolute bottom-2 right-2 flex aspect-[1/2] min-h-0 w-96 flex-col overflow-hidden rounded-md bg-primary-content shadow-md shadow-primary-content"
  >
    <h1 class="bg-neutral p-2 text-xl text-neutral-content">Chatbot</h1>
    <div class="flex flex-grow flex-col overflow-y-auto p-2 scrollbar-thin">
      <div
        v-for="message in messages"
        :key="message.message"
        class="chat"
        :class="{
          'chat-start': message.role === 'user',
          'chat-end': message.role === 'bot',
        }"
      >
        <div class="chat-bubble prose">{{ message.message }}</div>
      </div>
    </div>
    <div class="join px-2 pb-2">
      <input
        @keyup.enter="sendMessage"
        v-model="input"
        type="text"
        class="input join-item input-primary flex-grow text-neutral-content"
      />
      <button @click="sendMessage" class="btn btn-primary join-item">
        <PaperAirplaneIcon class="aspect-square h-6" />
      </button>
    </div>
  </div>
</template>

<style scoped>
@tailwind components;
@tailwind utilities;
</style>
