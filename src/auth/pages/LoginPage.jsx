import './../assets/auth.css'
import {AuthLayout} from "../layout/AuthLayout";
import {Link} from "react-router-dom";
import {useForm} from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import {useAuthStore} from './../hooks'

const schema = yup.object({
    email: yup.string().email().required("Este campo es requerido"),
    password: yup.string().required("Este campo es requerido"),
}).required();

const defaultValues = {
    email: '',
    password: ''
}

export const LoginPage = () => {

    const {startLogin} = useAuthStore();

    const {register, handleSubmit, watch, formState: {errors, isSubmitting}} = useForm({
        defaultValues,
        resolver: yupResolver(schema)
    });

    const onSubmit = data => {
        startLogin(data)
    };

    return (
        <AuthLayout>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="mb-md-1 mt-md-4 pb-3">

                    <h2 className="fw-bold mb-2 text-uppercase">Login</h2>
                    <p className="text-white-50 mb-5">Introduzca su nombre de usuario y contraseña.</p>

                    <div className="form-outline form-white mb-4 text-start">
                        <label className="form-label" htmlFor="typeEmailX">Email</label>
                        <input type="email" id="typeEmailX"
                               className="form-control form-control" {...register("email")}/>
                        <p className="input-error">{errors.email?.message}</p>
                    </div>

                    <div className="form-outline form-white mb-4 text-start">
                        <label className="form-label" htmlFor="typePasswordX">Password</label>
                        <input type="password" id="typePasswordX"
                               className="form-control form-control" {...register("password")}/>
                        <p className="input-error">{errors.password?.message}</p>
                    </div>

                    <p className="small mb-2 pb-lg-2"><a className="text-white-50" href="#">¿Olvidaste tu
                        contraseña?</a>
                    </p>

                    <button className="btn btn-outline-light btn-lg px-5" type="submit" disabled={isSubmitting}>Login</button>

                </div>
            </form>

            {
                isSubmitting ? (
                    <div className="d-flex justify-content-center">
                        <div className="spinner-border" role="status">
                            <span className="visually-hidden">Loading...</span>
                        </div>
                    </div>
                ) : null
            }

            <div>
                <p className="mb-0 mt-1">¿No tienes cuenta?
                    <Link to={'/auth/register'} className="text-white-50 fw-bold"> Registrate</Link>
                </p>
            </div>

        </AuthLayout>
    );
};