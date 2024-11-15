import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Cards from '../components/Card';
import AddPost from '../components/AddPost';
import { Row, Col, Spinner, Form, Container, InputGroup, Button } from 'react-bootstrap';
import { toast } from 'react-toastify';

function Home() {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filterQuery, setFilterQuery] = useState('');

  useEffect(() => {
    axios.get('https://jsonplaceholder.typicode.com/posts')
      .then((res) => {
        const fetchedData = res.data.map((post) => ({ ...post, isFromJsonServer: false }));
        setData(fetchedData);
        setFilteredData(fetchedData);  // Initially display all posts
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
        toast.error('Failed to fetch posts!');
      });
  }, []);

  const handleFilterChange = (e) => {
    const query = e.target.value.toLowerCase();
    setFilterQuery(query);
    
    // Filter posts based on title or body
    const filtered = data.filter(
      (post) =>
        post.title.toLowerCase().includes(query) ||
        post.body.toLowerCase().includes(query)
    );
    setFilteredData(filtered);
  };

  return (
    <div className="w-100">
      <Container>
        <Row className="mt-4 mb-4">
          <Col md={8}>
            <AddPost />
          </Col>
          <Col md={4}>
            <InputGroup className="mb-3">
              <Form.Control
                type="text"
                placeholder="Search posts..."
                value={filterQuery}
                onChange={handleFilterChange}
                aria-label="Search posts"
              />
              <Button variant="outline-secondary" id="button-addon2">
                <i className="fa fa-search"></i>
              </Button>
            </InputGroup>
          </Col>
        </Row>

        {loading ? (
          <div className="text-center mt-5">
            <Spinner animation="border" variant="primary" />
          </div>
        ) : (
          <>
            {filteredData.length === 0 ? (
              <div className="text-center mt-4">
                <h5>No posts found</h5>
              </div>
            ) : (
              <Row className="px-5 w-100">
                {filteredData.map((post) => (
                  <Col sm={4} key={post.id} className="mb-4">
                    <Cards post={post} data={data} setData={setData} />
                  </Col>
                ))}
              </Row>
            )}
          </>
        )}
      </Container>
    </div>
  );
}

export default Home;
