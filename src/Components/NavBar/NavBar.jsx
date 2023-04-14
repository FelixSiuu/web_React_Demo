import React from 'react'
import {useLocation} from 'react-router-dom'
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
import Container from 'react-bootstrap/Container'

export default function NavBar() {

  const location = useLocation()

  function computedActive(e){
    return (e === location.pathname? true : false)
  }
 
  return (
    <>
      <Navbar 
        collapseOnSelect 
        expand="lg" 
        bg="dark" 
        variant="dark" 
        fixed='top' 
      >
        <Container>
          <Navbar.Brand href="/home" >Router 6</Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link href="#/search" active={computedActive('/search')}>Search</Nav.Link>
              <Nav.Link href="#/todo" active={computedActive('/todo')}>Todo</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  )
}
