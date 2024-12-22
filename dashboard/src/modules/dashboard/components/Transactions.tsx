import { useState } from "react";

export default function Transactions() {
  const TRANSACTION_TYPES = {
    all: 'Todos',
    deposit: 'Depósito',
    transfer: 'Transferência',
    withdraw: 'Saque',
    payment: 'Pagamento',
  };

  const [selectedFilter, setSelectedFilter] = useState('all');

  return (
    <>
      <h4 className="text-success">
        Extrato da conta
        <i className="ms-2 fa-solid fa-cash-register"></i>
      </h4>

      <div style={{ gap: 8, cursor: 'pointer' }} className="d-flex flex-wrap py-3">
        {TRANSACTION_TYPES && Object.entries(TRANSACTION_TYPES).map(([key, value]) => (
          <span 
            key={key} 
            className={`badge rounded-pill bg-${key === selectedFilter ? 'success' : 'secondary'}`} 
            onClick={() => setSelectedFilter(key)}
          >
            {value}
          </span>
        ))}
      </div>

      <div className="input-group mb-3">
        <input 
          type="text"
          className="form-control"
          placeholder="Buscar uma transação" 
        ></input>
        <span className="input-group-text" id="basic-addon2">Busca</span>
      </div>

      <section className="list-group mt-3">
        <div style={{ cursor: 'pointer' }} className="list-group-item py-3" aria-current="true">
          <div className="d-flex justify-content-between align-items-center mb-3">
            <small>
              <strong className="text-success">
                <i className="me-2 fa-solid fa-calendar-days"></i>
                Abril
              </strong>
            </small>
            <div style={{ gap: 8 }} className="d-flex align-items-center">
              <span className="badge rounded-pill bg-secondary">Depósito</span>
              <i className="fa-solid fa-edit text-success"></i>
            </div>
          </div>
          <div className="d-flex flex-column flex-sm-row justify-content-between align-items-sm-center">
            <small>Mercearia do Juquinha</small>
            <small className="text-muted">12h30 - 12/04/25</small>
          </div>
        </div>
      </section>
    </>
  )
}