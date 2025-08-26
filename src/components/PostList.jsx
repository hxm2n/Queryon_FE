import { useState, useEffect } from 'react';
import styled from '@emotion/styled';
import axios from 'axios';

const PostList = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/posts');
        setPosts(response.data);
      } catch (err) {
        console.error(
          '게시글 불러오기 실패:',
          err.response?.data || err.message
        );
        setError('게시글 불러오기 실패');
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  const handleEdit = (postId) => {
    console.log(`수정 클릭됨! 글 ID: ${postId}`);
  };

  const handleDelete = (postId) => {
    console.log(`삭제 클릭됨! 글 ID: ${postId}`);
  };

  if (loading) return <p>로딩 중...</p>;
  if (error) return <p>{error}</p>;

  return (
    <Container>
      <Title>게시물 목록</Title>
      {posts.map((post) => (
        <Card key={post.id}>
          <h4>{post.title}</h4>
          <p>{post.content}</p>
          <small>{post.tags?.join(', ')}</small>
          <ButtonContainer>
            <Button onClick={() => handleEdit(post.id)}>수정</Button>
            <Button onClick={() => handleDelete(post.id)} delete>
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
