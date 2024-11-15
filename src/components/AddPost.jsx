import React, { useState } from 'react';
import { Button, Modal, Form, Container } from 'react-bootstrap';
import axios from 'axios';
import { toast } from 'react-hot-toast';

function AddPost() {
  const [show, setShow] = useState(false);
  const [newPost, setNewPost] = useState({ title: '', body: '' });
  const [loading, setLoading] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewPost({ ...newPost, [name]: value });
  };

  const handleSubmit = () => {
    if (!newPost.title || !newPost.body) {
      toast.error('Title and Body are required!');
      return;
    }

    setLoading(true);
    axios.post('https://jsonplaceholder.typicode.com/posts', newPost)
      .then((res) => {
        const addedPost = { ...newPost, id: res.data.id, isFromJsonServer: false };
        axios.post('http://localhost:3001/posts', addedPost)
          .then(() => {
            setNewPost({ title: '', body: '' });
            setShow(false);
            setLoading(false);
            toast.success('Post added successfully!');
          })
          .catch(err => {
            setLoading(false);
            toast.error('Failed to add post to JSON Server!');
          });
      })
      .catch(err => {
        setLoading(false);
        toast.error('Failed to add post!');
      });
  };

  return (
    <div className="p-5">
      <Button className="btn btn-success" onClick={handleShow}>Add Post</Button>

      <Modal show={show} onHide={handleClose} backdrop="static" keyboard={false}>
        <Modal.Header closeButton>
          <Modal.Title>Add Post</Modal.Title>
        </Modal.Header>
        <Modal.Body>
         
          <Form>
            <Form.Control
              type="text"
              name="title"
              value={newPost.title}
              onChange={handleChange}
              required
              placeholder="Title"
              className="mb-3"
            />
            <Form.Control
              type="text"
              name="body"
              value={newPost.body}
              onChange={handleChange}
              required
              placeholder="Body"
              className="mb-3"
            />
            {loading ? (
              <Button variant="secondary" disabled>Loading...</Button>
            ) : (
              <Modal.Footer>
                <Button variant="danger" onClick={handleClose}>Close</Button>
                <Button variant="success" onClick={handleSubmit}>Add Post</Button>
              </Modal.Footer>
            )}
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default AddPost;
