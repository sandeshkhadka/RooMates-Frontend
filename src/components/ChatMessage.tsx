import DeleteIcon from "./Delete";
import { useAuth } from "../lib/hooks";
import socketService from "../service/chatSocket";
import { IconTrash } from "@tabler/icons-react";
import { Flex, Paper, Text } from "@mantine/core";
export type ChatMessageType = {
  id: string;
  message: string;
  sender: string;
  timestamp: string;
};

const ChatMessage = (message: ChatMessageType) => {
  const auth = useAuth();
  const ownsThis = message.sender === auth.user!.username;
  const timestamp = new Date(message.timestamp);
  const day = timestamp.getDate();
  const month = timestamp.getMonth();
  const year = timestamp.getFullYear();
  const hour = timestamp.getHours();
  const minute = timestamp.getMinutes();
  const formattedTimestamp = `${day}/${month}/${year}|${hour}:${minute}`;
  function deletehandler() {
    socketService.socket?.emit("deleteMessage", {
      messageId: message.id,
      initiater: auth.user!.username,
    });
  }

  return (
    <Paper shadow="xs" m="xs" p="xs">
      <Flex direction="column" px="xs">
        <Flex direction="row" justify="space-between" >
          <Flex direction="row" gap="2">
            <Flex>
              <Text c="red" >{message.sender}</Text>[{" "}
              {formattedTimestamp}] :
            </Flex>
            <Text>{message.message}</Text>
          </Flex>
          {ownsThis ? <IconTrash onClick={deletehandler} cursor="pointer" /> : null}
        </Flex>
      </Flex >
    </Paper>
  );
};

export default ChatMessage;
