import { useState } from 'react';
import styled from '@emotion/styled';
import axios from 'axios';
import { useMutation } from '@tanstack/react-query';

const SignUp = () => {
  const [form, setForm] = useState({ name: '', email: '', password: '' });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  const { mutate, isLoading } = useMutation({
    mutationFn: async (singUpData) => {
      const response = await axios.post(
        'http://localhost:3000/api/auth/register',
        singUpData
      );
      return response.data;
    },
    onSuccess: (data) => {
      localStorage.setItem('token', data.token);
      console.log('회원가입 성공! 저장된 토큰: ', data.token);
      alert('회원가입 성공!');
    },
    onError: (err) => {
      console.log('회원가입 실패', err.response?.data || err.message);
      alert('회원가입 실패');
    },
  });

  const handleSubmit = () => {
    mutate(form);
  };

  return (
    <Container>
      <Title>회원가입</Title>
      <Input name="name" placeholder="이름" onChange={handleChange} />
      <Input name="email" placeholder="이메일" onChange={handleChange} />
      <Input
        type="password"
        name="password"
        placeholder="비밀번호"
        onChange={handleChange}
      />
      <Button onClick={handleSubmit} disabled={isLoading}>
        {isLoading ? '회원가입 중...' : '회원가입'}
      </Button>
    </Container>
  );
};

export default SignUp;

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
