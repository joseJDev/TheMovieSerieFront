import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isLoading: false,
    randomMovieSerie: {},
    detailMovieSerie: {},
    listMoviesSeries: [],
    typeGender: [],
    error: false,
    message: ""
}

export const movieSeriesSlice = createSlice({
    name: "movieSerie",
    initialState,
    reducers: {
        startLoading: (state) => {
            state.isLoading = true;
        },
        setRandomMovieSerie: (state, action) => {
            state.isLoading = false;
            state.error = false;
            state.message = "";
            state.randomMovieSerie = action.payload.randomMovieSerie;
        },
        setListMoviesSeries: (state, action) => {
            state.isLoading = false;
            state.error = false;
            state.message = "";
            state.listMoviesSeries = action.payload.listMovieSerie;
        },
        setDetailMoviesSeries: (state, action) => {
            state.isLoading = false;
            state.error = false;
            state.message = "";
            state.detailMovieSerie = action.payload.detailMovieSerie;
        },
        setListTypeGender: (state, action) => {
            state.isLoading = false;
            state.error = false;
            state.message = "";
            state.typeGender = action.payload.typeGender;
        },
        setError: (state, action) => {
            state.isLoading = false;
            state.error = true;
            state.message = action.payload.messageError;
        }
    }
});

export const { 
    startLoading,
    setRandomMovieSerie,
    setListMoviesSeries,
    setDetailMoviesSeries,
    setListTypeGender,
    setError
 } = movieSeriesSlice.actions