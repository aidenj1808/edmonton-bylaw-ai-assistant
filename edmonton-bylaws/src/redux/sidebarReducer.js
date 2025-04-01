import { createSlice } from '@reduxjs/toolkit';

const sidebarSlice = createSlice({
    name: 'sidebar',
    initialState: {
      isSidebarOpen: true,
      isChatHistorySidebar: false,
    },
    reducers: {
        toggleSidebar: (state) => {
            console.log("toggle sidebar");
            state.isSidebarOpen = !state.isSidebarOpen;
        },
        switchToChatHistorySidebar: (state) => {
            state.isChatHistorySidebar = true;
        },
        switchToOldSidebar: (state) => {
            state.isChatHistorySidebar = false;
        },
    }
});

export const { toggleSidebar, switchToChatHistorySidebar, switchToOldSidebar } = sidebarSlice.actions;
export default sidebarSlice.reducer;
    
