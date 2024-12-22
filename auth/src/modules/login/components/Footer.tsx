import * as React from 'react';

export default function Footer() {
  return (
    <footer className="d-block bg-dark w-100 text-center text-lg-start text-white">
      <div className="container p-4">
        <div className="row text-center">
          <div className="col-12 col-md-6 mb-4 mb-md-0">
            <h5 className="text-uppercase">Serviços</h5>

            <ul className="list-unstyled mb-0 mt-3 fw-light">
              <li className="py-1">
                <a href="#!" className="text-decoration-none text-white-50">Serviços</a>
              </li>
              <li className="py-1">
                <a href="#!" className="text-decoration-none text-white-50">Conta corrente</a>
              </li>
              <li className="py-1">
                <a href="#!" className="text-decoration-none text-white-50">Conta PJ</a>
              </li>
              <li className="py-1">
                <a href="#!" className="text-decoration-none text-white-50">Cartão de crédito</a>
              </li>
            </ul>
          </div>

          <div className="col-12 col-md-6 mb-4 mb-md-0 fw-light">
            <h5 className="text-uppercase mb-0">Contato</h5>

            <ul className="list-unstyled mt-3">
              <li className="py-1">
                <a href="#!" className="text-decoration-none text-white-50">0800 004 250 08</a>
              </li>
              <li className="py-1">
                <a href="#!" className="text-decoration-none text-white-50">contato@bytebank.com.br</a>
              </li>
              <li className="py-1">
                <a href="#!" className="text-decoration-none text-white-50">ouvidoria@bytebank.com.br</a>
              </li>
              <li className="py-1">
                <a href="#!" className="text-decoration-none text-white-50">Trabalhe conosco</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="text-center p-3 text-white-50 font-weight-light">
        <small>© Desenvolvido por Grupo 12 - FIAP Pós Tech</small>
      </div>
    </footer>
  );
}
