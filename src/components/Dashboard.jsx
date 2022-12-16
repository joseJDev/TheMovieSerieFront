import { useEffect, useState } from 'react';

import { AiFillEye, AiFillCheckCircle } from 'react-icons/ai';
import MovieSerieCard from "./MovieSerieCard";
import Form from 'react-bootstrap/Form';

import { useNavigate } from 'react-router-dom';

import { useSelector, useDispatch } from 'react-redux';
import { getRandomMovieSerie, getListMovieSeries, getListTypeGender, setViewMovieSerie } from '../store/thunkMovieSerie';


const DashBoard = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    useEffect(() => {
      dispatch( getRandomMovieSerie() );
      dispatch( getListMovieSeries() );
      dispatch( getListTypeGender() );
    }, []);
    

    const { randomMovieSerie, listMoviesSeries, typeGender } = useSelector(state => state.movieSerie);
    
    const [viewAverage, setViewAverage] = useState(false);

    const [filters, setFilters] = useState({
        q: '',
        gender: '',
        type_streaming: '',
        ordering: '',
        average: '',
    });

    const [ordering, setOrdering] = useState({
        ordering: '',
        average: ''
    });

    const onChangeFilters = e => {
        setFilters({
            ...filters,
            [e.target.name] : e.target.value
        });
    }

    const onChangeOrdering = e => {
        e.target.value === "average" ? setViewAverage(true) : setViewAverage(false)

        setOrdering({
            ordering: e.target.value,
            average: ''
        });

    }

    useEffect(() => {
        dispatch( getListMovieSeries(Object.assign(filters, ordering)) );
    }, [filters, ordering])

    return (
        <>
            <main>
                <div className="pelicula-principal" style={{ backgroundImage: `url('${randomMovieSerie?.data?.image}')` }}>
                    <div className="contenedor">
                        <h3 className="titulo">Te recomendamos: {randomMovieSerie?.data?.name}</h3>
                        <h4 className="sub-titulo">{randomMovieSerie?.data?.type_streaming} - {randomMovieSerie?.data?.gender?.name}</h4>
                        <h4 className="text-primary">Vistas: {randomMovieSerie?.data?.views}</h4>
                        <p className="descripcion">
                            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Harum, fuga ullam corrupti fugit mollitia quidem dignissimos maiores voluptatem quae maxime molestiae rerum explicabo tenetur! Recusandae, quos alias! Officia, praesentium recusandae.
                        </p>
                        <button 
                            role="button" 
                            className="boton"
                            onClick={() => navigate(`/movie-serie/${randomMovieSerie?.data?.id}`)}
                            >
                            <AiFillEye />
                            Ver
                        </button>
                        <button 
                            role="button" 
                            className="boton"
                            onClick={() => {
                                if(!randomMovieSerie?.is_view){
                                    dispatch( setViewMovieSerie(randomMovieSerie?.data?.id) );
                                }
                            }}
                        >
                            <AiFillCheckCircle />
                            {randomMovieSerie?.is_view ? "Ya la viste" : "Marcar como vista"}
                        </button>
                        <button role="button" className="boton">
                            {randomMovieSerie?.data?.average?.toFixed(1)}
                        </button>
                    </div>
                </div>
            <div className="peliculas-recomendadas contenedor">
                <div className="contenedor-titulo-controles">
                    <h3>Nuestras series y peliculas</h3>
                    <div className="indicadores"></div>
                </div>

                <div className="d-flex flex-row-reverse">
                    <div className="p-2">
                        <Form.Select 
                            style={{ backgroundColor: "#141414", color: 'white' }}
                            name="type_streaming"
                            onChange={onChangeFilters}
                        >
                            <option selected disabled>Tipo de contenido</option>
                            <option value="Serie">Series</option>
                            <option value="Pelicula">Peliculas</option>
                            <option value="">Todo</option>
                        </Form.Select>
                    </div>
                    <div className="p-2">
                        <Form.Select 
                            style={{ backgroundColor: "#141414", color: 'white' }}
                            name="gender"
                            onChange={onChangeFilters}
                        >
                            <option selected disabled>Genero</option>
                            {typeGender?.map(gender => (
                                <option key={gender.id} value={gender.code}>{gender.name}</option>
                            ))}
                            <option value="">Todo</option>
                        </Form.Select>
                    </div>
                    <div className="p-2">
                        <Form.Control 
                            type='search' 
                            placeholder='Buscar por nombre...' 
                            style={{ backgroundColor: "#141414", color: 'white' }}
                            name="q"
                            onChange={onChangeFilters}
                        />
                    </div>
                </div>
                <hr />
                <div className="d-flex flex-row">
                    <div className="p-2">
                        <Form.Select 
                            style={{ backgroundColor: "#141414", color: 'white' }}
                            name="ordering"
                            onChange={onChangeOrdering}
                        >
                            <option selected disabled>Ordenar</option>
                            <option value="name">Nombre</option>
                            <option value="type_streaming">Tipo</option>
                            <option value="gender">Genero</option>
                            <option value="average">Puntaje</option>
                            <option value="">Todo</option>
                        </Form.Select>
                    </div>
                    {viewAverage ? (
                        <div className="p-2">
                            <Form.Select 
                                style={{ backgroundColor: "#141414", color: 'white' }}
                                onChange={e => setOrdering({...ordering, average: e.target.value})}
                            >
                                <option value="" selected disabled>---</option>
                                <option value="0">0 - 1</option>
                                <option value="1">1 - 2</option>
                                <option value="2">2 - 3</option>
                                <option value="3">3 - 4</option>
                                <option value="4">4 - 5</option>
                                <option value="4">5</option>
                            </Form.Select>
                        </div>
                    ) : null}
                </div>

                <div className="contenedor-principal">
                    {listMoviesSeries.length === 0 ? (
                            <div className="row mt-5">
                                <h3 className='text-white text-center'>No hay resultados</h3>
                            </div>
                        ): null}
                    <div className="row">
                        {listMoviesSeries?.map(item => (
                            <div className="col-3 mt-3" key={item.id}>
                                <MovieSerieCard 
                                    data={item}
                                />
                            </div>
                        ))}
                        
                    </div>
                </div>
            </div>
                
            </main>
        </>

    );
}
 
export default DashBoard;