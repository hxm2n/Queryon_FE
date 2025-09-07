import styled from '@emotion/styled';
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import { useAuthStore } from '../store/authStore';

const fetchPost = async (token) => {
  const response = await axios.get('http://localhost:3000/api/posts', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

const PostList = () => {
  const token = useAuthStore((state) => state.token);

  const { data: posts } = useQuery({
    queryKey: ['posts'],
    queryFn: () => fetchPost(token),
    enabled: !!token,
  });

  const Edit = (postId) => {
    console.log('수정 버튼 클릭됨! 글 id: ', postId);
  };
  const Delete = (postId) => {
    console.log('삭제 버튼 클릭됨! 글 id: ', postId);
  };

  return (
    <Container>
      <Title>게시물 목록</Title>
      {posts?.map((post) => (
        <Card key={post.id}>
          <h4>{post.title}</h4>
          <p>{post.content}</p>
          <small>{post.tags?.join(', ')}</small>
          <ButtonContainer>
            <Button onClick={() => Edit(post.id)}>수정</Button>
            <Button onClick={() => Delete(post.id)} delete>
              삭제
            </Button>
          </ButtonContainer>
        </Card>
      ))}
    </Container>
  );
};

export default PostList;

const Container = styled.div`
  max-width: 600px;
  margin: 40px auto;
`;

const Card = styled.div`
  border: 1px solid #ddd;
  border-radius: 12px;
  padding: 16px;
  margin-bottom: 16px;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.08);
`;

const Title = styled.h2`
  text-align: center;
  margin-bottom: 20px;
`;

const ButtonContainer = styled.div`
  display: flex;
  gap: 10px;
  margin-top: 10px;
`;

const Button = styled.button`
  padding: 8px 12px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-weight: bold;
  background: ${(props) => (props.delete ? '#e74c3c' : '#6c63ff')};
  color: white;
  &:hover {
    background: ${(props) => (props.delete ? '#c0392b' : '#5850d4')};
  }
`;
