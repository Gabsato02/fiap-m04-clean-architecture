import 'regenerator-runtime/runtime';

export default function Root(props) {
  return (
    <div className="bg-light d-flex align-items-center justify-content-center vh-100">
      <div className="text-center">
        <i className="fa-solid fa-screwdriver-wrench text-success fa-2xl d-block mb-3"></i>
        <h1 className="display-1 fw-bold">404</h1>
        <p className="fs-3">Página não encontrada</p>
        <p className="lead">
          A página que você buscava não existe ou está em construção.
        </p>
        <a href="/" className="btn btn-success">Voltar</a>
      </div>
    </div>
  );
}
