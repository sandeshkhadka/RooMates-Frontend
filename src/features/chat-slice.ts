import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { ChatMessageType } from "../components/ChatMessage";

type ChatState = {
  connected: boolean;
  messages: ChatMessageType[];
  activeUsers: string[];
};
const initialState: ChatState = {
  connected: false,
  messages: [],
  activeUsers: [],
};

const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    addMessage: (state, action: PayloadAction<ChatMessageType>) => {
      state.messages.push(action.payload);
    },
    setConnected: (state, action: PayloadAction<boolean>) => {
      state.connected = action.payload;
    },
  },
});

export const chatReducer = chatSlice.reducer;
export const { addMessage, setConnected } = chatSlice.actions;
