import { Socket, io } from "socket.io-client";
import { SOCKET_URL } from "../lib/config";
class ChatSocket {
  socket: Socket | null = null;

  connect(token: string) {
    if (this.socket != null) return;
    this.socket = io(SOCKET_URL, {
      auth: {
        token: `Bearer ${token}`,
      },
    });
  }
}

const socketService = new ChatSocket();
export default socketService;
