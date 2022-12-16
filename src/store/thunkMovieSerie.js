import axiosClient from "../config/axios";
import { 
    startLoading, 
    setListMoviesSeries, 
    setRandomMovieSerie,
    setDetailMoviesSeries,
    setListTypeGender
} from "./movieSeriesSlice";

export const getRandomMovieSerie = () => {
    return async(dispatch, getState) => {
        try {
            const response = await axiosClient.get('/api/moviesseries/random/');
            dispatch( setRandomMovieSerie( { randomMovieSerie: response.data }) );
        } catch (error) {
            
        }
    }
}

export const getListMovieSeries = (filters = {}) => {
    return async(dispatch, getState) => {
        dispatch( startLoading() );
        try {
            const response = await axiosClient.get('/api/moviesseries/', { params: filters });
            dispatch( setListMoviesSeries({ listMovieSerie: response.data.results }) );
        } catch (error) {
            
        }
    }
}

export const getDetailMovieSerie = id => {
    return async(dispath, getState) => {
        try {
            const response = await axiosClient.get('/api/moviesseries/'+id);
            dispath( setDetailMoviesSeries({ detailMovieSerie: response.data }) );
        } catch (error) {
            
        }
    }
}

export const getListTypeGender = () => {
    return async(dispatch, getState) => {
        try {
            const response = await axiosClient.get('/api/gender/');
            dispatch( setListTypeGender({ typeGender: response.data.results }) )
        } catch (error) {
            
        }
    }
}

export const setViewMovieSerie = movieSerieId => {
    return async(dispatch, getState) => {
        try {
            await axiosClient.post('/api/views/', { movie_serie: movieSerieId });
            dispatch( getDetailMovieSerie(movieSerieId) );
            dispatch( getListMovieSeries() );
            dispatch( getRandomMovieSerie() );
        } catch (error) {
            
        }
    }
}


export const setScoreMovieSerie = data => {
    return async(dispatch, getState) => {
        try {
            await axiosClient.post('/api/score/', data);
            dispatch( getDetailMovieSerie(data.movie_serie) );
        } catch (error) {
            
        }
    }
}