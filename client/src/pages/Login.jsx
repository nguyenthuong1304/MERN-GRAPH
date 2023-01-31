import React from 'react';
import { GoogleAuthProvider, signInWithPopup, getAuth } from 'firebase/auth';
import { Navigate } from 'react-router-dom';
import { graphQLRequest } from '../utils/request';
import '../assets/login.css';

export default function Login() {
  const auth = getAuth();

  const handleLoginWithGoogle = async () => {
    const provider = new GoogleAuthProvider();

    const {
      user: { uid, displayName },
    } = await signInWithPopup(auth, provider);

    await graphQLRequest({
      query: `mutation register($uid: String!, $name: String!) {
      register(uid: $uid, name: $name) {
        uid
        name
      }
    }`,
      variables: {
        uid,
        name: displayName,
      },
    });
  };

  if (localStorage.getItem('accessToken')) {
    return <Navigate to="/" />
  }

  return (
    <div className="body">
      <div className="main">
        <div className="container b-container" id="b-container">
          <form className="form" id="b-form" method="" action="">
            <h2 className="form_title title">Đăng nhập</h2>
            <input className="form__input" type="text" placeholder="Địa chỉ email" />
            <input className="form__input" type="password" placeholder="Mật khẩu" />
            <div style={{ display: 'flex', marginTop: '30px' }}>
              <button className="form__button button submit">Đăng nhập</button>
              <button className="hollow button" style={{ 
                  backgroundColor: 'white',
                  color: 'black',
                  fontWeight: 'normal',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
              }} 
                onClick={handleLoginWithGoogle}
                type='button'
              >
                <img 
                  width="20px" 
                  alt="Google login"
                  src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/512px-Google_%22G%22_Logo.svg.png"
                />
                GOOGLE
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
