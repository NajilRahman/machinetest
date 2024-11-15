import React, { useState } from 'react';
import { Button, Modal, Form, Row, Spinner } from 'react-bootstrap';
import axios from 'axios';
import { toast } from 'react-hot-toast';

function Cards({ post, data, setData }) {
  const [show, setShow] = useState(false);
  const [updatedPost, setUpdatedPost] = useState({ title: post.title, body: post.body });
  const [loading, setLoading] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdatedPost((prev) => ({ ...prev, [name]: value }));
  };

  const handleEdit = () => {
    if (!updatedPost.title || !updatedPost.body) {
      toast.error('Title and Body cannot be empty!');
      return;
    }

    setLoading(true);
    const updatedPosts = data.map((postItem) =>
      postItem.id === post.id ? { ...postItem, ...updatedPost } : postItem
    );
    setData(updatedPosts);

    axios.put(`https://jsonplaceholder.typicode.com/posts/${post.id}`, updatedPost)
      .then(() => {
        setLoading(false);
        toast.success('Post updated in JSONPlaceholder!');
        setShow(false);
      })
      .catch((err) => {
        setLoading(false);
        toast.error('Failed to update post!');
      });
  };

  const handleDelete = () => {
    setLoading(true);

    axios.delete(`https://jsonplaceholder.typicode.com/posts/${post.id}`)
      .then(() => {
        setData(data.filter((postItem) => postItem.id !== post.id));
        setLoading(false);
        toast.success('Post deleted successfully!');
      })
      .catch((err) => {
        setLoading(false);
        toast.error('Failed to delete post!');
      });
  };

  return (
    <>
      <div className="col-md-3 my-2 w-100">
        <div className="card rounded">
          <div className="card-body text-center my-2">
            <h5>{post.title.slice(0, 30)}...</h5>
            <p>{post.body.slice(0, 100)}...</p>
            <Row className="text-center p-2">
              <button className="btn btn-warning col-6" onClick={handleShow}>
                <i className="fa-solid fa-pen-to-square" style={{ color: "#fafafa" }}></i>
              </button>
              <button className="btn btn-danger col-6" onClick={handleDelete}>
                <i className="fa-solid fa-trash"></i>
              </button>
            </Row>
          </div>
        </div>
      </div>

      <Modal show={show} onHide={handleClose} backdrop="static" keyboard={false}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Post</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Control
              type="text"
              name="title"
              value={updatedPost.title}
              onChange={handleChange}
              required
              placeholder="Title"
              className="mb-3"
            />
            <Form.Control
              type="text"
              name="body"
              value={updatedPost.body}
              onChange={handleChange}
              required
              placeholder="Body"
              className="mb-3"
            />
            {loading ? (
              <Spinner animation="border" variant="primary" />
            ) : (
              <Modal.Footer>
                <Button variant="danger" onClick={handleClose}>Close</Button>
                <Button variant="success" onClick={handleEdit}>Save Changes</Button>
              </Modal.Footer>
            )}
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default Cards;
