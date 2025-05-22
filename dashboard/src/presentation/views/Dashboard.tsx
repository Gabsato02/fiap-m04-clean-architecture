import React, { Suspense, lazy } from "react";
import Nav from "../components/Nav";
import TransactionModal from "../components/TransactionModal";
import { RecoilEnv, RecoilRoot } from "recoil";

const Extract = lazy(
  () => import(/* webpackPrefetch: true */ "../components/Extract")
);
const Investments = lazy(
  () => import(/* webpackPrefetch: true */ "../components/History")
);
const Transactions = lazy(
  () => import(/* webpackPrefetch: true */ "../components/Transactions")
);

RecoilEnv.RECOIL_DUPLICATE_ATOM_KEY_CHECKING_ENABLED = false;

export default function Dashboard() {
  return (
    <RecoilRoot>
      <div className="bg-light min-vh-100">
        <Nav />
        <div className="container h-100 py-5">
          <div className="flex-column-reverse flex-lg-row px-3 px-sm-0 row g-3">
            <div className="col col-12 col-lg-8 h-100 pt-3 py-lg-5 px-0 pe-lg-3">
              <Suspense
                fallback={
                  <div className="text-center">Carregando extrato...</div>
                }
              >
                <Transactions />
              </Suspense>
            </div>
            <div
              style={{ gap: 32 }}
              className="d-flex flex-column col col-12 col-lg-4 h-100 pt-5 py-lg-5 px-0"
            >
              <button
                className="btn btn-success"
                data-bs-toggle="modal"
                data-bs-target="#transactionModal"
              >
                <i className="fa-solid fa-plus me-2"></i> Adicionar Transação
              </button>
              <Suspense fallback={<div>Carregando saldo...</div>}>
                <Extract />
              </Suspense>
              <Suspense fallback={<div>Carregando gráfico...</div>}>
                <Investments />
              </Suspense>
              <TransactionModal />
            </div>
          </div>
        </div>
      </div>
    </RecoilRoot>
  );
}
