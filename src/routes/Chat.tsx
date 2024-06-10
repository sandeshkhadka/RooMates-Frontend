import { useAppDispatch, useAuth, useChat } from "../lib/hooks";
import {
  setConnected,
  addMessage,
  deleteMessage,
} from "../features/chat-slice.ts";
import ChatMessage, { ChatMessageType } from "../components/ChatMessage";
import socketService from "../service/chatSocket.ts";
import { useEffect, useRef } from "react";
import { Button, Flex, Paper, TextInput } from "@mantine/core";
import styles from "./Chat.module.css"

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
      <Paper withBorder={true} p="xs" m="xs" w="100%" >
        {chatState.connected ? (
          <Flex direction="column" h="100%" justify="space-between">
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
              className={styles.formclass}
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
              <TextInput
                name="message"
                id="message"
                w="90%"
                styles={
                  {
                    input: {
                      border: "2px solid lightgray",
                      borderRadius: "0",
                      outline: "none",
                      padding: "4px"
                    }
                  }
                }
                ref={inputField}
              />
              <Button
                type="submit"
                px="md"
                py="xs"
                radius="sm"
                w="10%"
                styles={
                  {
                    root: {
                      backgroundColor: "#228BE6",
                      color: "white"
                    }
                  }
                }
              >
                Send
              </Button>
            </form>
          </Flex>
        ) : (
          <div>disconnected</div>
        )}
      </Paper >
    </>
  );
};

export default Chat;
