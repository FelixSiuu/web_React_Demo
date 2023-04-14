import React, {useState, useEffect} from 'react'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'
import Modal from 'react-bootstrap/Modal'
import PubSub from 'pubsub-js'

export default function List() {

  const [todoList, setList] = useState([
    {id: '1', title: 'todo item 1', detail: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. ', isDone: true},
    {id: '2', title: 'todo item 2', detail: 'Lorem ipsum dolor sit amet', isDone: false},
    {id: '3', title: 'todo item 3', detail: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.', isDone: false},
  ])
  const [show, setShow] = useState(false)
  const [pendingDelete, setDelete] = useState(
    {id: ''}
  )

  useEffect(() => {

    let dataFromHeader = function (_, data) {
      const uuid = window.self.crypto.randomUUID()
      setList([{...data, id: uuid, isDone: false}, ...todoList])
    }
    let token1 = PubSub.subscribe('todoItem', dataFromHeader)
  
    let handleSelectAll = function (_, data) {
      const newList = todoList.map(item => {
        item['isDone'] = data
        return item
      })
      setList(newList)
    }
    let token2 = PubSub.subscribe('selectAll', handleSelectAll)

    let handleDeleteCompleted = function(_, data){
      setList(data)
    }
    let token3 = PubSub.subscribe('deleteCompleted', handleDeleteCompleted)
    
    PubSub.publish('todoList', todoList)

    return () => {
      PubSub.unsubscribe(token1)
      PubSub.unsubscribe(token2)
      PubSub.unsubscribe(token3)
    }
    
  }, [todoList])

  function switchChecked(id, current){
    const newList = todoList.map(item => {
      if(item.id === id){
       item['isDone'] = current.target.checked
      }
      return item
    })
    setList(newList)
  }

  function handleClose(isDelete){
    setShow(false)
    if(isDelete){
      const newList = todoList.filter(item => {
        return item.id !== pendingDelete.id
      })
      setList(newList)
    }
  }

  function deleteTodo(id){
    setShow(true)
    setDelete({id: id})
  }

  return (
    <>
      {/* List */}
      {
        todoList.map((item, _) => {
          return (
            <Card key={item.id} className='mb-1'>
              <Card.Header as="h6">
                status: 
                {' '}
                {item.isDone? 'Completed' : 'Outstanding'}
                <Form.Check 
                  className='d-inline mt-1 float-end'
                  aria-label={item.title} 
                  checked={item.isDone} 
                  onChange={ current => switchChecked(item.id, current) }
                />
              </Card.Header>
              <Card.Body>
                <Card.Title>{item.title}</Card.Title>
                <Card.Text>
                {item.detail}
                </Card.Text>
                <Button variant="danger" onClick={id => deleteTodo(item.id)}>Delete</Button>
              </Card.Body>
            </Card>
          )
        })
      }

      {/* Modal */}
      {
        show ? (
          <Modal show={show} onHide={() => {handleClose(false)}}>
            <Modal.Header closeButton>
              <Modal.Title>Please Note</Modal.Title>
            </Modal.Header>
            <Modal.Body>Are you sure to delete this item ?</Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={() => {handleClose(false)}}>
                Cancel
              </Button>
              <Button variant="primary" onClick={() => {handleClose(true)}}>
                Yes, please delete !
              </Button>
            </Modal.Footer>
          </Modal>
        )
        : null
      }
    </>
  )
}
