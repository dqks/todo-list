import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

type FooterInitialState = {
    newTaskText: string
}

const initialState: FooterInitialState = {
    newTaskText: ""
};

const footerSlice = createSlice({
    name: "footer",
    initialState,
    reducers: {
        newTaskTextAdded: (state,
            action: PayloadAction<string>) => {
            state.newTaskText = action.payload;
        }
    }
})

export const {newTaskTextAdded} = footerSlice.actions;
export const footerReducer = footerSlice.reducer;