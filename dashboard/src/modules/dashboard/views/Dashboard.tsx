import 'regenerator-runtime/runtime';
import { useEffect } from 'react';
import { navigateToUrl } from 'single-spa';
import { RecoilEnv, RecoilRoot } from 'recoil';
import Extract from "../components/Extract";
import Investments from "../components/History";
import Nav from "../components/Nav";
import Transactions from "../components/Transactions";
import TransactionModal from '../components/TransactionModal';

RecoilEnv.RECOIL_DUPLICATE_ATOM_KEY_CHECKING_ENABLED = false

export default function Login(props) {
  return (
    <RecoilRoot>
      <div className="bg-light min-vh-100">
      <Nav />
      <div className="container h-100 py-5">
        <div className="flex-column-reverse flex-lg-row px-3 px-sm-0 row g-3">
          <div className="col col-12 col-lg-8 h-100 pt-3 py-lg-5 px-0 pe-lg-3">
            <Transactions />
          </div>
          <div style={{ gap: 32 }} className="d-flex flex-column col col-12 col-lg-4 h-100 pt-5 py-lg-5 px-0">
            <button
              className='btn btn-success'
              data-bs-toggle="modal"
              data-bs-target="#transactionModal"
            >
              <i className='fa-solid fa-plus me-2'></i> Adicionar Transação 
            </button>
            <Extract />
            <Investments />
            <TransactionModal transaction={null} />
          </div>
        </div>
      </div>
    </ div>
    </RecoilRoot>
  );
}
