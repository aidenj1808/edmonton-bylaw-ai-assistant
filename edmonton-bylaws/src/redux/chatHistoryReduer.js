import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { act } from 'react';

// Fetch conversations for a user
export const fetchConversations = createAsyncThunk(
  'chatHistory/fetchConversations',
  async (userId,{rejectWithValue}) => {
    try{
        const response = await fetch(`http://localhost:5002/chats/conversations/${encodeURIComponent(userId)}`);
        if (!response.ok) throw new Error('Failed to fetch conversations');
        return response.json();
    }
    catch (error) {
        return rejectWithValue(error.message);
    } 
  }
);

// Delete user conversations 
export const deleteConversations = createAsyncThunk(
  'chatHistory/deleteConversations',
  async (userId, {rejectWithValue}) => { 
    try{
      const response = await fetch('http://localhost:5002/chats/' + encodeURIComponent(userId),{
        method: "DELETE",
      });
      if (!response.ok) throw new Error('Failed to delete conversations');
        return userId;
    }
    catch (error) {
      return rejectWithValue(error.message);
    }
  }
)

export const createConversation = createAsyncThunk(
  'chatHistory/createConversation',
  async (conversation, {rejectWithValue}) => {
    try{
      const response = await fetch("http://localhost:5002/chats", {
        method: 'POST', // Specify the method
        headers: {
          'Content-Type': 'application/json', // Ensure content type is JSON
        },
        body: JSON.stringify(conversation),
      });

      if (!response.ok) {
        throw new Error('Error creating conversation');
      }
      const data = await response.json();
      return data;
    }
    catch(error){
      return rejectWithValue(error.message);
    }
  }
)

export const updateConversation = createAsyncThunk(
  'chatHistory/updateConversation',
  async(newConversation, {rejectWithValue}) => {
    try{
      const response = await fetch("http://localhost:5002/chats/conversationReference/", {
          method: 'PUT', // Specify the method
          headers: {
          'Content-Type': 'application/json', // Ensure content type is JSON
          },
          body: JSON.stringify(newConversation),
      });

      if (!response.ok) {
        throw new Error('Error updating conversation data');
      }
      // Returns updated conversation
      const conversation = await response.json();
      console.log("updated conversation:");
      console.log(conversation);
      return conversation;
      } catch(error){
        return rejectWithValue(error.message);
      }
  }
)


const chatHistorySlice = createSlice({
  name: 'chatHistory',
  initialState: {
    selectedConversation: {},
    conversations: [],
    status: 'idle',
    error: null,
  },
  reducers: {
    setSelectedConversation: (state, action) => {
      state.selectedConversation = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      // Get Conversations  
      .addCase(fetchConversations.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchConversations.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.conversations = action.payload.sort((a, b) => new Date(b.date) - new Date(a.date));
      })
      .addCase(fetchConversations.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      // Delete Conversations
      .addCase(deleteConversations.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(deleteConversations.fulfilled, (state, action) => {
        console.log("deleted all chats");
        state.status = 'succeeded';
        state.conversations = [];
      })
      .addCase(deleteConversations.rejected, (state,action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      // Create Conversation
      .addCase(createConversation.pending, (state) => {
        state.status = "loading";
      })
      .addCase(createConversation.fulfilled, (state, action) => {
        state.status = 'succeded'
        state.conversations.push(action.payload.conversation);
        state.conversations.sort((a, b) => new Date(b.date) - new Date(a.date));
      })
      .addCase(createConversation.rejected, (state,action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      // Update Conversation
      .addCase(updateConversation.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updateConversation.fulfilled, (state, action) => {
        state.status = 'succeded';
        console.log(action.payload);
      })
      .addCase(updateConversation.rejected, (state,action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export const { toggleSidebar, switchToChatHistorySidebar, switchToOldSidebar, setSelectedConversation } = chatHistorySlice.actions;
export default chatHistorySlice.reducer;