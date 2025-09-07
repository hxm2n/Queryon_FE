import { useState } from 'react';
import styled from '@emotion/styled';
import SignUp from './components/SignUp';
import Login from './components/Login';
import PostList from './components/PostList';
import { useThemeStore } from './store/themeStore';

const App = () => {
  const [page, setPage] = useState('login');

  return (
    <div>
      <Nav>
        <NavButton active={page === 'signup'} onClick={() => setPage('signup')}>
          회원가입
        </NavButton>
        <NavButton active={page === 'login'} onClick={() => setPage('login')}>
          로그인
        </NavButton>
        <NavButton active={page === 'posts'} onClick={() => setPage('posts')}>
          게시물
        </NavButton>
      </Nav>

      {page === 'signup' && <SignUp />}
      {page === 'login' && <Login />}
      {page === 'posts' && <PostList />}
    </div>
  );
};

export default App;

const Nav = styled.nav`
  display: flex;
  justify-content: center;
  gap: 16px;
  padding: 16px;
  background: #f8f8ff;
  border-bottom: 1px solid #e0e0e0;
`;

const NavButton = styled.button`
  padding: 8px 16px;
  border: none;
  border-radius: 8px;
  font-weight: bold;
  cursor: pointer;
  background: ${(props) => (props.active ? '#6c63ff' : 'transparent')};
  color: ${(props) => (props.active ? 'white' : '#333')};
  transition: 0.2s;

  &:hover {
    background: ${(props) => (props.active ? '#5850d4' : '#eee')};
  }
`;
