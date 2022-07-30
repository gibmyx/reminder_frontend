import {AuthLayout} from "../layout/AuthLayout.jsx";
import {Link} from "react-router-dom";
import * as yup from "yup";
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import {useAuthStore} from "../hooks/index.js";

const schema = yup.object({
    name: yup.string().required("Este campo es requerido"),
    email: yup.string().email().required("Este campo es requerido"),
    password: yup.string().min(8, "La contraseña requiere 8 caracteres minimo").required("Este campo es requerido"),
    confirmedPassword: yup.string()
        .min(8, "La contraseña requiere 8 caracteres minimo")
        .required("Este campo es requerido")
        .oneOf([yup.ref('password'), null], 'Passwords must match'),
}).required();

const defaultValues = {
    name: '',
    email: '',
    password: '',
    confirmedPassword: '',
}

export const RegisterPage = () => {

    const {startRegister} = useAuthStore();

    const {register, handleSubmit, watch, formState: {errors}} = useForm({
        defaultValues,
        resolver: yupResolver(schema)
    });

    const onSubmit = data => {
        startRegister(data)
    };

    return (
        <AuthLayout>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="mb-md-1 mt-md-4 pb-5">

                    <h2 className="fw-bold mb-2 text-uppercase">Crear cuenta</h2>
                    <p className="text-white-50 mb-5"></p>

                    <div className="form-outline form-white mb-3 text-start">
                        <label className="form-label" htmlFor="typeNameX">Nombre</label>
                        <input type="text" id="typeNameX" className="form-control form-control" {...register("name")}/>
                        <p className="input-error">{errors.name?.message}</p>
                    </div>

                    <div className="form-outline form-white mb-3 text-start">
                        <label className="form-label" htmlFor="typeEmailX">Correo</label>
                        <input type="email" id="typeEmailX"
                               className="form-control form-control" {...register("email")}/>
                        <p className="input-error">{errors.email?.message}</p>
                    </div>

                    <div className="form-outline form-white mb-3 text-start">
                        <label className="form-label" htmlFor="typePasswordX">Contraseña</label>
                        <input type="password" id="typePasswordX"
                               className="form-control form-control" {...register("password")}/>
                        <p className="input-error">{errors.password?.message}</p>
                    </div>

                    <div className="form-outline form-white mb-3 text-start">
                        <label className="form-label" htmlFor="typeConfirmedPasswordX">Conformar contraseña</label>
                        <input type="password" id="typeConfirmedPasswordX"
                               className="form-control form-control" {...register("confirmedPassword")}/>
                        <p className="input-error">{errors.confirmedPassword?.message}</p>
                    </div>


                    <button className="btn btn-outline-light btn px-5" type="submit">Crear cuenta</button>

                </div>
            </form>
            <div>
                <p className="mb-0">¿Ya tienes cuenta?
                    <Link to={'/auth/login'} className="text-white-50 fw-bold"> Iniciar sesion</Link>
                </p>
            </div>
        </AuthLayout>
    );
};