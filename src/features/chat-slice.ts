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
      if (action.payload.id in state.messages.map((m) => m.id)) return;
      state.messages.push(action.payload);
    },
    setConnected: (state, action: PayloadAction<boolean>) => {
      state.connected = action.payload;
    },
    deleteMessage: (state, action: PayloadAction<string>) => {
      state.messages = state.messages.map((m) => {
        if (m.id == action.payload) {
          return { ...m, message: "[Deleted]" };
        } else {
          return m;
        }
      });
    },
  },
});

export const chatReducer = chatSlice.reducer;
export const { addMessage, setConnected, deleteMessage } = chatSlice.actions;
