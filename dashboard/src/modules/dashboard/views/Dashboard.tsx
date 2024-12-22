import 'regenerator-runtime/runtime';
import { useEffect } from 'react';
import { navigateToUrl } from 'single-spa';
import Extract from "../components/Extract";
import Investments from "../components/Investments";
import Nav from "../components/Nav";
import Transactions from "../components/Transactions";

export default function Login(props) {
  useEffect(() => {
    const token = localStorage.getItem('bytebank-auth');

    if (!token) navigateToUrl('/login');
  }, []);

  return (
    <div className="bg-light min-vh-100">
      <Nav />
      <div className="container h-100 py-5">
        <div className="flex-column-reverse flex-lg-row px-3 px-sm-0 row g-3">
          <div className="col col-12 col-lg-8 h-100 pt-3 py-lg-5 px-0 pe-lg-3">
            <Transactions />
          </div>
          <div style={{ gap: 32 }} className="d-flex flex-column col col-12 col-lg-4 h-100 pt-5 py-lg-5 px-0">
            <Extract />
            <Investments />
          </div>
        </div>
      </div>
    </ div>
  );
}
