import * as React from 'react';
import spotlightImage from '../assets/spotlight-desktop.svg';
import spotlightImageMobile from '../assets/spotlight-mobile.svg';

export default function Spotlight() {
  return (
    <section className="bg-light h-100 py-5 mt-5 rounded-lg">
      <div className="container">
        <h1 className="display-4 text-success">Seja bem vindo ao Bytebank</h1>
        <div className="d-flex flex-column flex-md-row align-items-md-center py-md-5">
          <img src={spotlightImage} className="img-fluid d-none d-md-block" alt="..."></img>
          <img src={spotlightImageMobile} className="d-block d-md-none img-fluid" alt="..."></img>
          <p className="lead ms-md-5 mt-5 mt-md-0">Experimente mais liberdade no controle da sua vida financeira. Crie sua conta com a gente!</p>
        
        </div>
        <hr className="my-4"></hr>
        <div className="grid g-2">
          <div className="row row-gap-4">
            <div className="col-12 col-md-6 col-lg-3 border-success text-center">
              <i className="fa-regular fa-credit-card fa-2xl text-success"></i>
              <div className="card-body mt-3">
                <h5 className="card-title mb-2 text-success">Conta e cartão gratuitos</h5>
                <p className="card-text">Isso mesmo, nossa conta é digital, sem custo fixo e mais que isso: sem tarifa de manutenção.</p>
              </div>
            </div>

            <div className="col-12 col-md-6 col-lg-3 border-success text-center">
              <i className="fa-solid fa-money-bill-transfer fa-2xl text-success"></i>
              <div className="card-body mt-3">
                <h5 className="card-title mb-2 text-success">Saques sem custo</h5>
                <p className="card-text">Você pode sacar gratuitamente 4x por mês de qualquer Banco 24h.</p>
              </div>
            </div>
    
            <div className="col-12 col-md-6 col-lg-3 border-success text-center">
              <i className="fa-solid fa-star fa-2xl text-success"></i>
              <div className="card-body mt-3">
                <h5 className="card-title mb-2 text-success">Programa de pontos</h5>
                <p className="card-text">Acumule pontos com suas compras no crédito sem pagar mensalidade!</p>
              </div>
            </div>

            <div className="col-12 col-md-6 col-lg-3 border-success text-center">
              <i className="fa-solid fa-mobile-screen fa-2xl text-success"></i>
              <div className="card-body mt-3">
                <h5 className="card-title mb-2 text-success">Seguro Dispositivos</h5>
                <p className="card-text">Seus dispositivos móveis (computador e laptop) protegidos por uma mensalidade simbólica.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
