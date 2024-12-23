import * as React from 'react';
import { useRecoilState } from 'recoil';
import { getUser } from '../services';
import { navigateToUrl } from 'single-spa';
import { userInfoAtom } from '../../../store/atoms';
import { AUTH_TOKEN } from '../../../vars';

export default function Nav() {
  const [userInfo, setUserInfo] = useRecoilState(userInfoAtom);

  const getUserInfo = async () => {
    try {
      const data = await getUser();
      setUserInfo(data);
    } catch (err) {
      console.log('errorGettingUserInfo');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem(AUTH_TOKEN);
    navigateToUrl('/'); 
  };

  React.useEffect(() => {
    const token = localStorage.getItem(AUTH_TOKEN);

    if (!token) {
      navigateToUrl('/');
    }
    else {
      getUserInfo();
    }
  }, []);

  return (
    <nav className="navbar fixed-top navbar-expand-lg navbar-dark bg-dark">
      <div className="container">
        <a className="navbar-brand" href="/">Bytebank</a>
        <ul className="navbar-nav">
          <li className="nav-item dropdown">
            <div
              style={{ cursor: 'pointer' }}
              className="dropdown-toggle nav-link active d-flex flex-row align-items-center"
              aria-current="page"data-bs-toggle="dropdown" aria-expanded="false">
              { userInfo?.username || 'Usuário' }
              <div 
                className="ms-3 rounded-circle border border-success d-flex justify-content-center align-items-center"
                style={{width: 35, height: 35}}
              >
                <i className="fas fa-user-alt fa-md text-success"></i>
              </div>
            </div>
            <ul className="dropdown-menu position-absolute">
              <li onClick={handleLogout}>
                <span style={{ cursor: 'pointer' }} className="dropdown-item">Deslogar</span>
              </li>
            </ul>
          </li>
        </ul>
      </div>
    </nav>
  );
}
