import MainLayout from '../../components/Layout/MainLayout';
import { useEffect, useState } from 'react';
import client from '../../api';
import { Row, Col } from 'react-bootstrap';
import PostCard from '../../components/PostCard/PostCard';
import Pagination from '../../components/Pagination/Pagination';

function Home() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [activePage, setActivePage] = useState(1);
  const [total, setTotal] = useState(0);

  const fetchPosts = async (page) => {
    setLoading(true);
    try {
      const res = await client({
        url: '/api/posts',
        method: 'GET',
        params: {
          page: page || activePage,
          pageSize: 4
        }
      });
      setLoading(false);
      if (res.data.success) {
        setPosts(res.data.data.data);
        setTotal(res.data.data.total);
      }
    } catch (err) {
      console.log(err);
    }
  };

  // useEffect(() => {
  //   fetchPosts();
  // }, [activePage]);


  useEffect(() => {
    fetchPosts();
  }, []);

  const onChangePage = (page) => {
    setActivePage(page);
    fetchPosts(page)
  }

  const renderPosts = () => {
    if (loading) return <div>Loading...</div>;

    if (!posts.length) return <div>Không có dữ liệu</div>;

    return posts.map((post) => (
      <Col xs={12} md={3} key={post._id}>
        <PostCard
          imageUrl={post.imageUrl}
          title={post.title}
          description={post.description}
          // createdBy={post.createdBy.email}
        />
      </Col>
    ));
  };

  return (
    <MainLayout>
      <Row className="mt-4">
        {renderPosts()}
        <Col xs={12}>
          <div className="mt-3">
            <Pagination 
              active={activePage} 
              total={total} 
              onChangePage={onChangePage}
            />
          </div>
        </Col>
      </Row>
    </MainLayout>
  );
}

export default Home;