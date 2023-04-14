import React, {useState} from 'react'
import { Button } from 'react-bootstrap'
import Form from 'react-bootstrap/Form'
import Stack from 'react-bootstrap/Stack'
import Alert from 'react-bootstrap/Alert'
import PubSub from 'pubsub-js'

export default function Header() {

  const [show, setShow] = useState(false)
  const [mission,setMission] = useState({
    title: '',
    detail: '',
  })

  function amendMission(type, e){
    setMission(
      {...mission, [type]: e.target.value}
    )
  }

  function addTodo(){
    if(mission.title.trim() !== ''){
      setShow(false)
      PubSub.publish('todoItem', mission)
      // after added new mission, clear current
      let clearMission = {}
      for(let key in mission){
        clearMission[key] = ''
      }
      setMission(clearMission)
    }else{
      setShow(true)
    }
  }

  return (
    <>
      <h1 className='mt-5'>Todo List</h1>
      <Stack gap={2} className="mx-auto mt-2">
        <Form.Control 
          className="me-auto"
          placeholder="Input your mission title (required)"
          value={mission.title} 
          onChange={(e) => {amendMission('title', e)}}
        />
        <Form.Control 
          className="me-auto" 
          as="textarea" 
          placeholder="Input your mission detail" 
          value={mission.detail} 
          onChange={(e) => {amendMission('detail', e)}}
        />
        <Button 
          variant="success"
          onClick={addTodo}
        >Add todo</Button>
      </Stack>
      {
        show ? (
          <Alert variant="danger" onClose={() => setShow(false)} className='mt-3' dismissible>
            <Alert.Heading>Oh snap! You got an error!</Alert.Heading>
            <p>
              Mission title is required
            </p>
          </Alert>
        ) : null
      }
    </>
  )
}
