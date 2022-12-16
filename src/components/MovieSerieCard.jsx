import { useCallback } from "react";
import { Card, Button } from "react-bootstrap";
import { getColorForAverage } from "./utils/functions";

import { useNavigate, Link } from "react-router-dom";

const MovieSerieCard = ({ data }) => {
    const navigate = useNavigate();

    const handleClickMovieSerie = useCallback(
		id => navigate(`/movie-serie/${id}`),
		[navigate],
	);
    return (
        <Card style={{ width: '18rem', backgroundColor: '#141414', color: 'white', cursor: 'pointer' }}>
            <Card.Img variant="top" src={data?.image} />
            <Card.Body>
                <Card.Title>{data?.name}</Card.Title>
                <Card.Subtitle 
                    className={getColorForAverage(data?.average)}
                    style={{ fontWeight: 'bold' }}
                    >
                        {data?.average?.toFixed(1)} - Vistas: {data?.views}
                    </Card.Subtitle>
                <Card.Subtitle className="text-danger mt-3">{data?.type_streaming} - {data?.gender?.name}</Card.Subtitle>
                <Card.Text>
                    Some quick example text to build on the card title and make up the
                    bulk of the card's content.
                </Card.Text>
                <Card.Text>
                    <Link className="btn btn-danger" to={`/movie-serie/${data?.id}`}>Ver</Link>
                </Card.Text>
            </Card.Body>
        </Card>
    );
}
 
export default MovieSerieCard;