import React from "react";
import { useForm } from "react-hook-form";
import registerImage from '../assets/register-desktop.svg';
import registerImageMobile from '../assets/register-mobile.svg';
import { Button } from "../../../components";
import { createUser } from "../services";

export default function RegisterModal() {
  const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}(\.[a-zA-Z]{2,})?$/;

  const [loading, setLoading] = React.useState(false);

  const { 
    register, 
    handleSubmit, 
    formState: { 
      errors, 
      isValid 
    }
  } = useForm({ mode: 'onChange' });

  const handleCreateUser = async (form) => {
    setLoading(true);

    try {
      const { disclaimer, passwordConfirm, ...payload } = form;

      await createUser(payload);
    } catch (err) {
      console.log('errorCreatingUser');      
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="modal fade"
      id="registerModal"
      tabIndex={-1}
      aria-labelledby="registerModalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-body">
            <img src={registerImage} className="img-fluid mx-auto d-none d-md-block" alt="..."></img>
            <img src={registerImageMobile} className="d-block mx-auto d-md-none img-fluid" alt="..."></img>
            <form className="mt-3 needs-validation" noValidate onSubmit={handleSubmit(handleCreateUser)}>
              <div className="mb-3">
                <label htmlFor="name" className="form-label">
                  Nome
                </label>
                <div className="input-group">
                  <input
                    type="text"
                    className={`form-control ${errors.username && 'is-invalid'}`}
                    id="name"
                    name="name"
                    placeholder="Digite seu nome completo"
                    required
                    {...register('username', { required: true })}
                  />
                  <div className="invalid-feedback">* Obrigatório</div>
                </div>
              </div>
              <div className="mb-3">
                <label htmlFor="email" className="form-label">
                  E-mail
                </label>
                <div className="input-group">
                  <input
                    type="email"
                    className={`form-control ${errors.email && 'is-invalid'}`}
                    id="email"
                    name="email"
                    placeholder="Digite seu e-mail"
                    required
                    {...register('email', { required: true, pattern: EMAIL_REGEX })}
                  />
                  <div className="invalid-feedback">* E-mail inválido</div>
                </div>
              </div>
              <div className="mb-3">
                <label htmlFor="password" className="form-label">
                  Senha
                </label>
                <div className="input-group">
                  <input
                    type="password"
                    className={`form-control ${errors.password && 'is-invalid'}`}
                    id="password"
                    name="password"
                    placeholder="Digite sua senha"
                    required
                    {...register('password', { required: true, minLength: 6 })}
                  />
                  <div className="invalid-feedback">* Senha inválida - min. 6 caracteres</div>
                </div>
              </div>

              <div className="mb-3">
                <label htmlFor="passwordConfirm" className="form-label">
                  Confirme sua senha
                </label>
                <div className="input-group has-validation">
                  <input
                    type="password"
                    className={`form-control ${errors.passwordConfirm && 'is-invalid'}`}
                    id="passwordConfirm"
                    name="passwordConfirm"
                    placeholder="Confirme sua senha"
                    required
                    {...register('passwordConfirm', { required: true, validate: {
                      isSameAs: (_, v) => v.passwordConfirm === v.password
                    } })}
                  />
                  <div className="invalid-feedback">* As senhas devem ser iguais</div>
                </div>
              </div>
              <div className="mb-3">
                <div className="form-check">
                  <input
                    className={`form-check-input ${errors.passwordConfirm && 'is-invalid'}`}
                    type="checkbox"
                    value=""
                    id="disclaimer"
                    name="disclaimer"
                    required
                    {...register('disclaimer', { required: true })}
                  ></input>
                  <label className="text-dark form-check-label" htmlFor="disclaimer">
                    <small>Li e estou ciente quanto às condições de tratamento dos meus dados conforme descrito na Política de Privacidade do banco.</small>
                  </label>
                  <div className="invalid-feedback">* É necessário aceitar os termos de uso</div>
                </div>
              </div>
              <Button
                label="Criar conta"
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
