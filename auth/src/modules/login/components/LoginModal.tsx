import React from "react";
import { useForm } from "react-hook-form";
import loginImage from '../assets/login-desktop.svg';
import loginImageMobile from '../assets/login-mobile.svg';
import { login } from "../services";
import { Button } from "../../../components";

export default function LoginModal() {
  const [loading, setLoading] = React.useState(false);
  const [hasError, setError] = React.useState(false);

  const { 
    register, 
    handleSubmit, 
    formState: { 
      isValid 
    }
  } = useForm({ mode: 'onChange' });

  const handleLogin = async (payload) => {
    setLoading(true);

    try {
      await login(payload);
    } catch (err) {
      console.log('errorLoggingUser');  
      setError(true);    
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="modal fade"
      id="loginModal"
      tabIndex={-1}
      aria-labelledby="loginModalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-body">
            <img src={loginImage} className="img-fluid mx-auto d-none d-md-block" alt="..."></img>
            <img src={loginImageMobile} className="d-block mx-auto d-md-none img-fluid" alt="..."></img>
            <form className="mt-3" noValidate onSubmit={handleSubmit(handleLogin)}>
              <div className="mb-3">
                <label htmlFor="email" className="form-label">
                  E-mail
                </label>
                <input
                  type="email"
                  className="form-control"
                  id="email"
                  placeholder="Digite seu e-mail"
                  required
                  {...register('email', { required: true })}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="password" className="form-label">
                  Senha
                </label>
                <div className="input-group">
                  <input
                    type="password"
                    className={`form-control ${hasError && 'is-invalid'}`}
                    id="password"
                    placeholder="Digite sua senha"
                    required
                    {...register('password', { required: true })}
                  />
                  <div className="invalid-feedback">Credenciais inválidas</div>
                </div>
              </div>
              <div className="mb-3 text-end">
                <a href="#" className="text-decoration-none text-danger">
                  <small>Esqueci minha senha</small>
                </a>
              </div>
              <Button
                label="Acessar"
                type="submit"
                variant="success"
                className="w-100"
                disabled={!isValid}
                isLoading={loading}
              ></Button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
