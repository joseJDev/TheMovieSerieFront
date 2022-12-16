import { configureStore } from "@reduxjs/toolkit";

import { movieSeriesSlice } from "./movieSeriesSlice";
import { userSlice } from "./userSlice";

export const store = configureStore({
    reducer: {
        movieSerie: movieSeriesSlice.reducer,
        user: userSlice.reducer,
    },
})
