import React from 'react'
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
function Header() {
    return (
        <div>


            <Navbar expand="lg" className='border bg-dark border-0'>
                <Container>
                    <h2 className='my-3 text-light'>CRUD APP</h2>
                </Container>
            </Navbar>


        </div>
    )
}

export default Header
