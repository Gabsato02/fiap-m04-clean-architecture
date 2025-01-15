import { useEffect, useState } from "react";
import { getTransactions } from "../services";
import { Transaction } from "../../../types";
import { formatDate } from "../../../utils";
import { useRecoilState } from "recoil";
import { transactionsState } from "../../../store/atoms";
import TransactionModal from "./TransactionModal";

export default function Transactions() {
  const TRANSACTION_TYPES = {
    all: 'Todos',
    deposit: 'Depósito',
    transfer: 'Transferência',
    withdraw: 'Saque',
    payment: 'Pagamento',
  };

  const [loading, setLoading] = useState(false);
  const [transactions, setTransactions] = useRecoilState(transactionsState)
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [selectedTransaction, setSelectedTransaction] = useState(null);

  const getMonth = (date: string) => {
    const $d = new Date(date);
  
    return new Intl.DateTimeFormat('pt-BR', { month: 'long' }).format($d);
  }

  const getCompleteDate = (date: string) => {
    const $d = new Date(date);
  
    const { hour, minute, day, month, year} = formatDate($d);

    return `${hour}h${String(minute).padStart(2, '0')} - ${day}/${month}/${year}`;
  };

  const getTransactionsList = async () => {
    setLoading(true);
    try {
      const data = await getTransactions();
      setTransactions(data);
    } catch (err) {
      console.log('errorGettingTransactions');
    } finally {
      setLoading(false);
    }
  }

  const handleEditClick = (transaction) => {
    setSelectedTransaction(transaction); // Define a transação selecionada
  };

  useEffect(() => {
    getTransactionsList();
  }, []);

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
        <span className="input-group-text" id="basic-addon2">
          <i className="fa-solid fa-magnifying-glass"></i>
        </span>
      </div>
      
      {(
        loading &&
        <span
          className="spinner-border spinner-border-sm text-center mt-3 text-success d-block mx-auto"
          role="status"
          aria-hidden="true"
        ></span>
      )}

      {(
        (!loading && !transactions.length) &&
        <small className="d-block py-3 text-muted">Você ainda não possui transações</small>
      )}

      {(
        (!loading && transactions?.length) &&
        transactions.map((transaction: Transaction, index) => (
          <section className="list-group mt-3" key={index}>
            <div style={{ cursor: 'pointer' }} className="list-group-item py-3" aria-current="true">
              <div className="d-flex justify-content-between align-items-center mb-3">
                <small>
                  <strong className="text-success text-capitalize">
                    <i className="me-2 fa-solid fa-calendar-days"></i>
                    {getMonth(transaction.date)}
                  </strong>
                </small>
                <div style={{ gap: 8 }} className="d-flex align-items-center">
                  <span className="badge rounded-pill bg-secondary">{TRANSACTION_TYPES[transaction.type]}</span>
                  <i className="fa-solid fa-edit text-success"
                    data-bs-toggle="modal"
                    data-bs-target="#transactionModal"
                    onClick={() => handleEditClick(transaction)}
                  ></i>
                </div>
              </div>
              <div className="d-flex flex-column flex-sm-row justify-content-between align-items-sm-center">
                <small className="text-capitalize">{transaction.description}</small>
                <small className="text-muted">{ getCompleteDate(transaction.date) }</small>
              </div>
            </div>
          </section>
        ))
      )}

      <TransactionModal transaction={selectedTransaction} />
    </>
  )
}