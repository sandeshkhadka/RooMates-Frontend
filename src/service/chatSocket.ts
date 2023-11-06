import { Socket, io } from "socket.io-client";

class ChatSocket {
  socket: Socket | null = null;

  connect(token: string) {
    if (this.socket != null) return;
    this.socket = io("http://localhost:3001", {
      auth: {
        token: `Bearer ${token}`,
      },
    });
  }
}

const socketService = new ChatSocket();
export default socketService;
