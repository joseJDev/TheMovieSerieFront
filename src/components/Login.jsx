import { useState, useEffect } from 'react';

import Form from 'react-bootstrap/Form';
import { Alert, Card } from "react-bootstrap";
import { Button } from "react-bootstrap";

import { Link, useNavigate } from "react-router-dom";

import { useSelector, useDispatch } from 'react-redux';

import { login } from '../store/thunkUser';


const Login = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { authenticated, isLoading, error, message } = useSelector(state => state.user);

    useEffect(() => {
      if(authenticated){
        navigate('/');
      }
    }, [authenticated]);
    
    console.log("URL", import.meta.env.VITE_URL_BACKEND_LOCAL);

    const [dataLogin, setDataLogin] = useState({
        email: '',
        password: ''
    });

    const [errorDataLogin, setErrorDataLogin] = useState(false);

    const onChangeDataLogin = e => {
        setDataLogin({
            ...dataLogin,
            [e.target.name] : e.target.value
        })
    }

    const handleSubmit = e => {
        e.preventDefault();

        if(dataLogin.email.trim() === "" || dataLogin.password.trim() === ""){
            setErrorDataLogin(true);
            return;
        }

        setErrorDataLogin(false);
        
        dispatch( login(dataLogin) );

    }

    return (
        <div className="row justify-content-center mt-5">
            <Card className="w-50 card-border" style={{backgroundColor: '#141414', color: 'white', cursor: 'pointer' }}>
            <Card.Header>
                <h2 className="text-login">Inicia Sesion</h2>
            </Card.Header>
            <Card.Body>
            <Form onSubmit={handleSubmit}>
                <fieldset>
                    <Form.Group className="mb-3">
                        <Form.Label htmlFor="disabledTextInput">Email</Form.Label>
                        <Form.Control 
                            className="input-login" 
                            type="email" 
                            placeholder="Email..." 
                            name="email"
                            onChange={onChangeDataLogin}
                        />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label htmlFor="disabledTextInput">Password</Form.Label>
                        <Form.Control 
                            className="input-login" 
                            type="password" 
                            placeholder="Password" 
                            name="password"
                            onChange={onChangeDataLogin}
                        />
                    </Form.Group>
                    {errorDataLogin ? (
                        <Alert variant='secondary'>Todos los campos son obligatorios</Alert>
                    ): null}
                    
                    {error ? (
                        <Alert variant='secondary'>{message}</Alert>
                    ): null}
                    <Button 
                        className="btn-login w-100 mb-3 mt-3" 
                        type="submit"
                        disabled={isLoading ? true : false}
                        >
                        {isLoading ? "Cargando..." : "Inciar Sesion"}
                    </Button>
                    <Card.Subtitle>
                        <Link className="text-danger" to={'/register'}>
                            No tienes cuenta? Create una
                        </Link>
                    </Card.Subtitle>
                </fieldset>
                </Form>
            </Card.Body>
        </Card>
        </div>
    );
}
 
export default Login;