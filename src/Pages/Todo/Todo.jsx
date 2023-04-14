import React from 'react'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Container from 'react-bootstrap/Container'
import Header from './Header/Header'
import Counter from './Counter/Counter'
import List from './List/List'

export default function Todo() {

  const breakPonit = {
    xs: 11,
    md: 9,
    lg: 8,
    xl: 6
  }

  return (
    <div className='mt-5'>
      <Container>
      <Row>
          <Col {...breakPonit} className='mx-auto'>
            <Header />
            <Counter className={'mt-3'} />
          </Col>
          <Col {...breakPonit} className='mx-auto mt-5'>
            <List />
          </Col>
      </Row>
      </Container>
       
    </div>
  )
}
