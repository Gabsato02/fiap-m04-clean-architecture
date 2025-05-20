import * as React from 'react';

export default function Nav() {
  return (
    <nav className="navbar fixed-top navbar-dark bg-dark navbar-expand-lg">
      <div className="container">
        <a className="navbar-brand" href="/">Bytebank</a>
        
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarTogglerDemo02" aria-controls="navbarTogglerDemo02" aria-expanded="false" aria-label="Toggle navigation">
          <i className="fa-solid fa-bars"></i>
        </button>

        <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <a className="nav-link text-success" aria-current="page" href="/sobre">Sobre</a>
            </li>
            <li className="nav-item">
              <a className="nav-link text-success" href="/servicos">Serviços</a>
            </li>
          </ul>
          <div className="d-flex justify-content-end gx-1 ms-auto">
            <button
              className="btn btn-success"
              data-bs-toggle="modal"
              data-bs-target="#registerModal"
            >
              Abrir conta
            </button>
            <button
              className="btn ms-2 btn-outline-success"
              data-bs-toggle="modal"
              data-bs-target="#loginModal"
            >
              Logar
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
