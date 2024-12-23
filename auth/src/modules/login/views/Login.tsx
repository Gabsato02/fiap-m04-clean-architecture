import 'regenerator-runtime/runtime';
import { useEffect } from 'react';
import { navigateToUrl } from 'single-spa';
import Footer from "../components/Footer";
import LoginModal from "../components/LoginModal";
import Nav from "../components/Nav";
import RegisterModal from "../components/RegisterModal";
import Spotlight from "../components/Spotlight";
import { AUTH_TOKEN } from '../../../vars';

export default function Login() {
  useEffect(() => {
    const token = localStorage.getItem(AUTH_TOKEN);

    if (token) navigateToUrl('/dashboard');
  }, []);

  return (
    <div className="min-vh-100 bg-light">
      <Nav></Nav>
      <LoginModal></LoginModal>
      <RegisterModal></RegisterModal>
      <Spotlight></Spotlight>
      <Footer></Footer>
    </div>
  );
}
