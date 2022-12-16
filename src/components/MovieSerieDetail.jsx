import { useEffect, useState } from 'react';

import { AiFillEye, AiFillCheckCircle } from 'react-icons/ai';
import { Button, Form } from "react-bootstrap";

import { useParams } from "react-router-dom";

import { useSelector, useDispatch } from "react-redux";
import { getDetailMovieSerie, setScoreMovieSerie, setViewMovieSerie } from "../store/thunkMovieSerie";

const MovieSerieDetail = () => {
    const dispatch = useDispatch();
    const { id } = useParams();

    useEffect(() => {
        dispatch( getDetailMovieSerie(id) );
    }, [])

    const { detailMovieSerie } = useSelector(state => state.movieSerie);
    

    const [dataScore, setDataScore] = useState({
        score: '',
        comment: ''
    });

    const [error, setError] = useState(false);
    const [viewFormScore, setViewFormScore] = useState(false);


    const onChangeFormScore = e => {
        setDataScore({
            ...dataScore,
            [e.target.name] : e.target.value
        });
    }

    const onClickScore = e => {
        e.preventDefault();

        if(dataScore.comment.trim() === "" || dataScore.score.trim() === ""){
            setError(true);
            return;
        }

        setError(false);

        dataScore.movie_serie = id;
        dispatch( setScoreMovieSerie(dataScore) );
        setViewFormScore(false);
    }

    return (
        <>
            <div className="pelicula-principal" style={{ backgroundImage: `url('${detailMovieSerie?.data?.image}')` }}>
            <div className="contenedor">
                <h3 className="titulo">{detailMovieSerie?.data?.name}</h3>
                <h4 className="sub-titulo">Pelicula</h4>
                <h4 className="text-primary">Vistas: {detailMovieSerie?.data?.views}</h4>
                <p className="descripcion">
                    Narra las aventuras de un grupo de exploradores que hacen uso de un agujero de gusano recientemente descubierto para superar las limitaciones de los viajes espaciales tripulados y vencer las inmensas distancias que tiene un viaje interestelar.
                </p>
                <button 
                    role="button" 
                    className="boton"
                    onClick={() => {
                        if(!detailMovieSerie?.is_view){
                            dispatch( setViewMovieSerie(detailMovieSerie?.data?.id) );
                        }
                    }}
                >
                    <AiFillCheckCircle />
                    {detailMovieSerie?.is_view ? "Ya la viste" : "Marcar como vista"}
                </button>
                <button role="button" className="boton">
                    {detailMovieSerie?.data?.average?.toFixed(1)}
                </button>
            </div>
        </div>
        <div className="peliculas-recomendadas contenedor">
            <div className="contenedor-titulo-controles">
                <h3>Puntuaciones y comentarios</h3>
                {!detailMovieSerie?.is_score ? (
                    <Button 
                        variant="secondary" 
                        onClick={() => setViewFormScore(viewFormScore ? false: true)}
                        >
                            Puntuar
                        </Button>
                ) : null}
                <div className="indicadores"></div>
                
            </div>
            
            {viewFormScore ? (
                <div className="row mt-5">
                    <div className="col-5">
                        <Form.Control 
                            className='input-login' 
                            placeholder='Comentario' 
                            onChange={onChangeFormScore}
                            name="comment"
                        />
                    </div>
                    <div className="col-5">
                        <Form.Select 
                            className='input-login' 
                            placeholder='Comentario'
                            onChange={onChangeFormScore}
                            name="score"
                        >
                            <option value="" selected disabled>Selecciona un puntaje</option>
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                            <option value="5">5</option>
                        </Form.Select>
                    </div>
                    <div className="col-2">
                        <Button variant='success' onClick={onClickScore}>Guardar</Button>
                    </div>
                    {error ? (
                        <p className="text-danger">Debes llenar los campos</p>
                    ) : null}
                </div>
            ) : null}

            <div className="contenedor-principal">
                <div className="container">
                    <hr/>
                    {detailMovieSerie?.data?.scores?.map(score => (
                        <div className="row align-items-center mt-5" key={score?.user?.id}>
                            <div className="col-2">
                                <img 
                                    src={score?.user?.profile || "https://mdbcdn.b-cdn.net/img/new/avatars/2.webp" }
                                    className="rounded-circle" 
                                    style={{ width: '100px' }}
                                    alt="Avatar" />
                                    
                            </div>
                            <div className="col-10">
                                <h4 className='name-user'>{score?.user?.first_name} {score?.user?.last_name}</h4>
                                <hr />
                                <h4 className='text-success'>Puntaje: {score?.score}</h4>
                                <p className="text-white">{score?.comment}</p>
                                <p className="text-white"><u>{score?.created}</u></p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
        </>
        
    );
}
 
export default MovieSerieDetail;