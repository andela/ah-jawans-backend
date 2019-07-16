/* eslint-disable no-console */
/* eslint-disable no-undef */
$(document).ready(() => {
  const socket = io(process.env.SOCKET_PATH);
  socket.on('connect', () => {
    console.log('Connected to Socket.IO server');
  });

  socket.on('new_message', ({ message, user }) => {
    $('.publish-info').html(message);
    console.log(`Current User: ${user}`);
  });
});
