import React from 'react'
import Input from './Input/Input'
import List from './List/List'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

export default function Search() {
  return (
    <div className='mt-5'>
      <Container>
        <Row>
            <Col xs={11} md={9} lg={8} xl={6} className='mx-auto'>
              <Input></Input>
            </Col>
        </Row>
        <Row>
            <Col xs={11} md={10} lg={9} xl={7} className='mx-auto'>
              <List></List>
            </Col>
        </Row>
      </Container>
    </div>
  )
}
