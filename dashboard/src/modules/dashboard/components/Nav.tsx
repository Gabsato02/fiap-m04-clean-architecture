import * as React from 'react';
import { useRecoilState } from 'recoil';
import { getUser } from '../services';
import { navigateToUrl } from 'single-spa';
import { userInfoAtom } from '../../../store/atoms';

export default function Nav() {
  const [userInfo, setUserInfo] = useRecoilState(userInfoAtom);

  const getUserInfo = async () => {
    try {
      const data = await getUser();
      setUserInfo(data);
    } catch (err) {
      console.log('errorGettingUserInfo');
    }
  }

  React.useEffect(() => {
    const token = localStorage.getItem('bytebank-auth');

    if (!token) {
      navigateToUrl('/login');
    }
    else {
      getUserInfo();
    }
  }, []);

  return (
    <nav className="navbar fixed-top navbar-expand-lg navbar-dark bg-dark">
      <div className="container">
        <a className="navbar-brand" href="#">Bytebank</a>
        <ul className="navbar-nav">
          <li className="nav-item d-flex flex-row align-items-center">
            <a className="nav-link active" aria-current="page" href="#">{ userInfo?.username || 'Usuário' }</a>
            <div 
              className="ms-3 rounded-circle border border-success d-flex justify-content-center align-items-center"
              style={{width: 35, height: 35}}
            >
              <i className="fas fa-user-alt fa-md text-success"></i>
            </div>
          </li>
        </ul>
      </div>
    </nav>
  );
}
