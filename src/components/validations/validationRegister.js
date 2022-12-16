import * as yup from 'yup';

const isRequired = "Este campo es requerido";

export const validationRegister = yup.object({
    firstName: yup.string()
    .required(isRequired),
    
    lastName: yup.string()
    .required(isRequired),
    
    age: yup.number()
    .required(isRequired),

    email: yup.string()
    .required(isRequired)
    .email("Este campo debe ser un email"),

    password: yup.string()
    .required(isRequired)
    .min(8, "La password debe ser de minimo 8 caracteres"),
    
    passwordConfirm: yup.string()
    .required(isRequired)
    .oneOf([yup.ref("password"), null], "Las password no coinciden")
    .min(8, "La password debe ser de minimo 8 caracteres")
})