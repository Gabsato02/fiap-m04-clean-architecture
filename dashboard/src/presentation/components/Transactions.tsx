import { useState, useEffect } from "react";
import { useRecoilValueLoadable, useRecoilState } from "recoil";
import { transactionsByPageSelector } from "../../store/selectors";
import { Transaction } from "../../domain/entities";
import { transactionsState } from "../../store/atoms";
import { formatDate } from "../../utils";
import TransactionModalEdit from "./TransactionModalEdit";

export default function Transactions() {
  const TRANSACTION_TYPES = {
    all: "Todos",
    deposit: "Depósito",
    transfer: "Transferência",
    withdraw: "Saque",
    payment: "Pagamento",
  };

  const [selectedFilter, setSelectedFilter] = useState("all");
  const [searchText, setSearchText] = useState("");
  const [selectedTransaction, setSelectedTransaction] =
    useState<Transaction | null>(null);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [transactions, setTransactions] = useRecoilState(transactionsState);

  const loadable = useRecoilValueLoadable(transactionsByPageSelector(page));

  useEffect(() => {
    if (loadable.state === "hasValue") {
      const newTransactions = loadable.contents;
      if (newTransactions.length === 0) setHasMore(false);
      setTransactions((prev) => [...prev, ...newTransactions]);
    }
  }, [loadable]);

  const filteredTransactions = transactions.filter(
    (transaction) =>
      (selectedFilter === "all" || transaction.type === selectedFilter) &&
      (transaction.description
        .toLowerCase()
        .includes(searchText.toLowerCase()) ||
        String(transaction.amount).includes(searchText))
  );

  const getMonth = (date: string) => {
    const $d = new Date(date);
    return new Intl.DateTimeFormat("pt-BR", { month: "long" }).format($d);
  };

  const getCompleteDate = (date: string) => {
    const $d = new Date(date);
    const { hour, minute, day, month, year } = formatDate($d);
    return `${hour}h${String(minute).padStart(
      2,
      "0"
    )} - ${day}/${month}/${year}`;
  };

  const handleEditClick = (transaction: Transaction) => {
    setSelectedTransaction(transaction);
  };

  const handleScroll = () => {
    if (
      window.innerHeight + window.scrollY >=
        document.documentElement.offsetHeight - 100 &&
      hasMore &&
      loadable.state !== "loading"
    ) {
      setPage((prevPage) => prevPage + 1);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [loadable, hasMore]);

  return (
    <>
      <h4 className="text-success">
        Extrato da conta <i className="ms-2 fa-solid fa-cash-register"></i>
      </h4>

      <div
        className="d-flex flex-wrap py-3"
        style={{ gap: 8, cursor: "pointer" }}
      >
        {Object.entries(TRANSACTION_TYPES).map(([key, value]) => (
          <span
            key={key}
            className={`badge rounded-pill bg-${
              key === selectedFilter ? "success" : "secondary"
            }`}
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
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
        />
        <span className="input-group-text" id="basic-addon2">
          <i className="fa-solid fa-magnifying-glass"></i>
        </span>
      </div>

      {filteredTransactions.map((transaction: Transaction, index) => (
        <section className="list-group mt-3" key={index}>
          <div
            className="list-group-item py-3"
            style={{ cursor: "pointer" }}
            aria-current="true"
          >
            <div className="d-flex justify-content-between align-items-center mb-3">
              <small>
                <strong className="text-success text-capitalize">
                  <i className="me-2 fa-solid fa-calendar-days"></i>
                  {getMonth(transaction.date)}
                </strong>
              </small>
              <div className="d-flex align-items-center" style={{ gap: 8 }}>
                <span className="badge rounded-pill bg-secondary">
                  {TRANSACTION_TYPES[transaction.type]}
                </span>
                <i
                  className="fa-solid fa-edit text-success"
                  data-bs-toggle="modal"
                  data-bs-target="#transactionModalEdit"
                  onClick={() => handleEditClick(transaction)}
                ></i>
              </div>
            </div>

            <div className="d-flex flex-column flex-sm-row justify-content-between align-items-sm-center">
              <small className="text-capitalize">
                {transaction.description}
              </small>
              <small className="text-muted">
                {getCompleteDate(transaction.date)}
              </small>
            </div>
          </div>
        </section>
      ))}

      {loadable.state === "loading" && (
        <span
          className="spinner-border spinner-border-sm text-center mt-3 text-success d-block mx-auto"
          role="status"
          aria-hidden="true"
        ></span>
      )}

      {!hasMore && (
        <small className="d-block py-3 text-muted text-center">
          Todas as transações foram carregadas.
        </small>
      )}

      <TransactionModalEdit transaction={selectedTransaction} />
    </>
  );
}
