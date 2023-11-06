export type ChatMessageType = {
  id: string;
  message: string;
  sender: string;
  timestamp: string;
};

const ChatMessage = (message: ChatMessageType) => {
  const timestamp = new Date(message.timestamp);
  const day = timestamp.getDate();
  const month = timestamp.getMonth();
  const year = timestamp.getFullYear();
  const hour = timestamp.getHours();
  const minute = timestamp.getMinutes();
  const formattedTimestamp = `${day}/${month}/${year}|${hour}:${minute}`;
  return (
    <div className="flex flex-col px-4 border bg-sky-200">
      <div className="flex flex-row gap-2">
        <div className="flex flex-row">
          <div className="text-red-500">{message.sender}</div>[{" "}
          {formattedTimestamp}] :
        </div>
        <div>{message.message}</div>
      </div>
    </div>
  );
};

export default ChatMessage;
