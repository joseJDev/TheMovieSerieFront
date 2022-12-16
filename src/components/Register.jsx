import { useState } from 'react';

import Form from 'react-bootstrap/Form';
import { Card } from "react-bootstrap";
import { Button } from "react-bootstrap";
import { Alert } from 'react-bootstrap';

import { Link } from "react-router-dom";

import { useFormik } from 'formik';
import { validationRegister } from './validations/validationRegister';

const Register = () => {

    const [formRegister, setFormRegister] = useState({
        firstName: '',
        lastName: '',
        email: '',
        age: '',
        password: '',
        passwordConfirm: ''
    });

    const formik = useFormik({
        initialValues: {
            firstName: '',
            lastName: '',
            email: '',
            age: '',
            password: '',
            passwordConfirm: ''
        },
        validationSchema: validationRegister,
        onSubmit: (values) => {
            console.log(values);
        }
    })

    const [avatarFile, setAvatarFile] = useState(null);
    const [listErrors, setListErrors] = useState([]);


    const handleChangeAvatarFile = e => {
        setAvatarFile(e.target.files[0]);
    }


    return (
        <div className="row justify-content-center mt-5">
            <Card className="w-50 card-border" style={{backgroundColor: '#141414', color: 'white', cursor: 'pointer' }}>
            <Card.Header>
                <h2 className="text-login">Registrate</h2>
            </Card.Header>
            <Card.Body>
            <Form onSubmit={formik.handleSubmit}>
                <fieldset>
                    <div className="row">
                        <Form.Group className="mb-3 col-md-6">
                            <Form.Label htmlFor="disabledTextInput">Nombre</Form.Label>
                            <Form.Control 
                                className="input-login" 
                                type="text" 
                                placeholder="Ingresa tu nombre"
                                name="firstName"
                                value={formik.values.firstName}
                                onChange={formik.handleChange}
                            />
                            <p className="text-danger">{formik.errors.firstName}</p>
                        </Form.Group>
                        <Form.Group className="mb-3 col-md-6">
                            <Form.Label htmlFor="disabledTextInput">Apellido</Form.Label>
                            <Form.Control 
                                className="input-login" 
                                type="text" 
                                placeholder="Ingresa tu apellido"
                                name="lastName"
                                value={formik.values.lastName}
                                onChange={formik.handleChange}
                            />
                            <p className="text-danger">{formik.errors.lastName}</p>
                        </Form.Group>
                        <Form.Group className="mb-3 col-md-6">
                            <Form.Label htmlFor="disabledTextInput">Edad</Form.Label>
                            <Form.Control 
                                className="input-login" 
                                type="number" 
                                placeholder="Ingresa tu edad" 
                                name="age"
                                value={formik.values.age}
                                onChange={formik.handleChange}
                            />
                            <p className="text-danger">{formik.errors.age}</p>
                        </Form.Group>
                        <Form.Group className="mb-3 col-md-6">
                            <Form.Label htmlFor="disabledTextInput">Email</Form.Label>
                            <Form.Control 
                                className="input-login" 
                                type="email" 
                                placeholder="Ingresa tu email" 
                                name="email"
                                value={formik.values.email}
                                onChange={formik.handleChange}
                            />
                            <p className="text-danger">{formik.errors.email}</p>
                        </Form.Group>
                        <Form.Group className="mb-3 col-md-6">
                            <Form.Label htmlFor="disabledTextInput">Password</Form.Label>
                            <Form.Control 
                                className="input-login" 
                                type="password" 
                                placeholder="Password" 
                                name="password"
                                value={formik.values.password}
                                onChange={formik.handleChange}
                            />
                            <p className="text-danger">{formik.errors.password}</p>
                        </Form.Group>
                        <Form.Group className="mb-3 col-md-6">
                            <Form.Label htmlFor="disabledTextInput">Repetir Password</Form.Label>
                            <Form.Control 
                                className="input-login" 
                                type="password" 
                                placeholder="Reptite Password" 
                                name="passwordConfirm"
                                value={formik.values.passwordConfirm}
                                onChange={formik.handleChange}
                            />
                            <p className="text-danger">{formik.errors.passwordConfirm}</p>
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label htmlFor="disabledTextInput">Avatar</Form.Label>
                            <Form.Control 
                                className="input-login" 
                                type="file" 
                                accept="image/png, image/gif, image/jpeg"
                                placeholder="Reptite Password"
                                onChange={e => setAvatarFile(e.target.files[0])}
                            />
                            
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <div className="row">
                                <img 
                                    src={
                                        avatarFile ? 
                                        URL.createObjectURL(avatarFile)
                                        :
                                        "https://as1.ftcdn.net/v2/jpg/03/53/11/00/1000_F_353110097_nbpmfn9iHlxef4EDIhXB1tdTD0lcWhG9.jpg"
                                    } 
                                    className="rounded-circle text-center" 
                                    style={{ width: '120px' }}
                                    alt="Avatar" />
                            </div>
                        </Form.Group>

                    </div>
                    {listErrors.map((err, index) => (
                        <Alert variant='secondary' key={index}>{err}</Alert>
                    ))}

                    <Button 
                        className="btn-login w-100 mb-3 mt-3" 
                        type="submit"
                        disabled={!formik.isValid && !!formik.submitCount}
                        >Registrarse</Button>
                    <Card.Subtitle>
                        <Link className="text-danger" to={'/login'}>
                            Ya tienes cuenta? Inicia sesion
                        </Link>
                    </Card.Subtitle>
                </fieldset>
                </Form>
            </Card.Body>
        </Card>
        </div>
    );
}
 
export default Register;