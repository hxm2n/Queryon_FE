import { useState } from 'react';
import styled from '@emotion/styled';
import axios from 'axios';
import { useMutation } from '@tanstack/react-query';

const Login = () => {
  const [form, setForm] = useState({ email: '', password: '' });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const { mutate, isLoading, isError, isSuccess, error } = useMutation({
    mutationFn: async (loginData) => {
      const response = await axios.post(
        'http://localhost:3000/api/auth/login',
        loginData
      );
      return response.data;
    },
    onSuccess: (data) => {
      console.log('로그인 성공! 저장된 토큰: ', data.token);
      alert('로그인 성공!');
    },
    onError: (err) => {
      console.log('로그인 실패!', err.response?.data || err.message);
      alert('로그인 실패!');
    },
  });

  const handleSubmit = () => {
    mutate(form);
  };

  return (
    <Container>
      <Title>로그인</Title>
      <Input name="email" placeholder="이메일" onChange={handleChange}></Input>
      <Input
        type="password"
        name="password"
        placeholder="비밀번호"
        onChange={handleChange}
      />
      <Button onClick={handleSubmit} disabled={isLoading}>
        {isLoading ? '로그인 중...' : '로그인'}
      </Button>
    </Container>
  );
};

export default Login;

const Container = styled.div`
  max-width: 400px;
  margin: 40px auto;
  padding: 24px;
  border: 1px solid #ddd;
  border-radius: 12px;
`;

const Title = styled.h2`
  text-align: center;
  margin-bottom: 20px;
`;

const Input = styled.input`
  width: 100%;
  padding: 10px;
  margin-bottom: 12px;
  border: 1px solid #ccc;
  border-radius: 8px;
  outline: none;
  &:focus {
    border-color: #6c63ff;
  }
`;

const Button = styled.button`
  width: 100%;
  padding: 10px;
  background: #6c63ff;
  color: white;
  font-weight: bold;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  &:hover {
    background: #5850d4;
  }
`;
