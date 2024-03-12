<template>
  <div id="app">
    <div id="chat">
      <div id="messages">
        <div v-for="message in messages" :key="message.id">
          {{ message.user }}: {{ message.text }}
        </div>
      </div>
      <input v-model="messageInput" @keyup.enter="sendMessage" placeholder="Type your message..." />
    </div>
  </div>
</template>

<script>
import io from 'socket.io-client';

const socket = io('http://localhost:3000');

export default {
  data() {
    return {
      messages: [],
      messageInput: '',
    };
  },
  mounted() {
    socket.on('chatMessage', (msg) => {
      this.messages.push(msg);
    });
  },
  methods: {
    sendMessage() {
      if (this.messageInput.trim() !== '') {
        const message = {
          id: new Date().toISOString(),
          user: 'You', // You can enhance this to get user name
          text: this.messageInput.trim(),
        };

        this.messages.push(message);
        socket.emit('chatMessage', message);

        this.messageInput = '';
      }
    },
  },
};
</script>

<style>
#chat {
  max-width: 400px;
  margin: auto;
}

#messages {
  border: 1px solid #ccc;
  padding: 10px;
  height: 200px;
  overflow-y: scroll;
}

input {
  width: 100%;
  padding: 8px;
  box-sizing: border-box;
}
</style>
