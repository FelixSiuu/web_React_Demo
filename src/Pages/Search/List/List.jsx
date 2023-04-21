import React, { useState, useEffect } from 'react'
import PubSub from 'pubsub-js'
import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Alert from 'react-bootstrap/Alert'
import Spinner from 'react-bootstrap/Spinner'

export default function List() {
  
  const [result, setResult] = useState({
    list: [],
    isFirst: true,
    errorMsg: '',
    isLoading: false
  })

  useEffect(() => {
    let resultData = function (_, data) {
      setResult({...data})
    }
    let token = PubSub.subscribe('resultData', resultData)
    return () => {
      PubSub.unsubscribe(token)
    }
  },[])

  return (
    <div className='mx-auto mt-5'>
      {
        result.isFirst ? <h2>Input GitHub username</h2> : 
        result.isLoading ? <><Spinner animation="border" variant="success" as='span' />{' '}<span className='h2'>Loading...</span></>:
        result.errorMsg ? <Alert variant={'danger'}>{result.errorMsg}</Alert>:
        result.list.length === 0 ? <h2>No Search Result</h2> :
        <Row gap={5}>
          {
            result.list.map((item, _) => {
              return (
                <Col lg={4} sm={6} className={'mb-3'} key={item.id}>
                  <Card>
                    <Card.Img variant="top" src={item.avatar_url} />
                    <Card.Body>
                      <Card.Title>{item.login}</Card.Title>
                      <Button href={item.html_url} target={'_blank'} variant="primary">Link</Button>
                    </Card.Body>
                  </Card>
                </Col>
              )
            })
          }
        </Row>
      }
    </div>
  )
}
