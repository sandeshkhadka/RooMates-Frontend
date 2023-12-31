import { useAppDispatch, useAuth, useChat } from "../lib/hooks";
import {
  setConnected,
  addMessage,
  deleteMessage,
} from "../features/chat-slice.ts";
import ChatMessage, { ChatMessageType } from "../components/ChatMessage";
import socketService from "../service/chatSocket.ts";
import { useEffect, useRef } from "react";
type ChatMessagePayload = Omit<ChatMessageType, "id">;
// type MessageEventData = ChatMessageType[];
const Chat = () => {
  const auth = useAuth();
  const dispatch = useAppDispatch();
  const chatState = useChat();

  const inputField = useRef<null | HTMLInputElement>(null);
  useEffect(() => {
    if (!auth.token) return;
    socketService.connect(auth.token);
    if (!socketService.socket) {
      console.log("socket not initialized");
      return;
    }
    const socket = socketService.socket;
    socket.on("connect", () => {
      // console.log("connected");
      dispatch(setConnected(true));
    });

    socket.on("recentMessages", (messages: { messages: ChatMessageType[] }) => {
      for (const message of messages.messages) {
        dispatch(addMessage(message));
      }
    });

    socket.on("serverToClientMessage", (message: ChatMessageType) => {
      // console.log("message :", message);
      dispatch(addMessage(message));
    });

    socket.on("messageDeleted", (messageId: string) => {
      dispatch(deleteMessage(messageId));
    });

    socket.on("disconnect", () => {
      // console.log("disconnected");
      dispatch(setConnected(false));
    });

    return () => {
      socket.off("connect");
      socket.off("serverToClientMessage");
      socket.off("disconnect");
    };
  }, [auth.token, dispatch]);
  if (auth.token == null) {
    console.log("no token :", auth.token);
    return;
  }
  return (
    <>
      <div className="border border-black p-2 m-2 w-full">
        {chatState.connected ? (
          <div className="flex flex-col justify-between h-full">
            <div>
              {chatState.messages.map((message) => (
                <ChatMessage
                  message={message.message}
                  sender={message.sender}
                  id={message.id}
                  timestamp={message.timestamp}
                />
              ))}
            </div>
            <form
              className="flex flex-row gap-2 border w-full h-fit m-2 p-2"
              onSubmit={(e) => {
                e.preventDefault();
                if (socketService.socket == null) {
                  console.log("Cannot send message, socket not initialized");
                  return;
                }
                const formData = new FormData(e.target as HTMLFormElement);
                const message = formData.get("message");
                const sender = auth.user?.username;
                const timestamp = Date().toString();
                const chatMessage: ChatMessagePayload = {
                  message: message as string,
                  sender: sender as string,
                  timestamp: timestamp,
                };
                socketService.socket.emit("clientToServerMessage", chatMessage);
                if (inputField.current == null) return;
                inputField.current.value = "";
                console.log("sent message");
              }}
            >
              <input
                name="message"
                type="text"
                className="border border-black p-1 w-11/12"
                id="message"
                ref={inputField}
              />
              <button
                type="submit"
                className="bg-blue-500 w-1/12 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded shadow"
              >
                Send
              </button>
            </form>
          </div>
        ) : (
          <div>disconnected</div>
        )}
      </div>
    </>
  );
};

export default Chat;
