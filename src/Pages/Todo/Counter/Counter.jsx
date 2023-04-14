import React, {useState, useEffect} from 'react'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import PubSub from 'pubsub-js' 

export default function Counter() {

  const [todoList, setList] = useState([])
  const [show, setShow] = useState(false)

  useEffect(() => {
    let dataFromList = function (_, list){
      setList(list)
    }
    let token = PubSub.subscribe('todoList', dataFromList)
    return () => {
      PubSub.unsubscribe(token)
    }
  }, [todoList])

  function calculateStatus(status){
    if(todoList.length === 0){
      return
    }else{
      const result = todoList.reduce((pre, cur) => {
        return pre + (cur.isDone === status ? 1 : 0)
      }, 0)
      return result
    }
  }

  function switchAll(e){
    PubSub.publish('selectAll', e.target.checked)
  }

  function handleClose(isDelete){
    setShow(false)
    if(isDelete){
      const newList = todoList.filter(item => {
         return item.isDone !== true
      })
      PubSub.publish('deleteCompleted', newList)
    }
  }

  function deleteTodo(){
    setShow(true)
  }

  return (
    <>
    <div className='
        mt-5 
        d-flex 
        justify-content-lg-between 
        flex-sm-column 
        flex-lg-row 
        flex-column'
      >
        <Form className=''>
          <Form.Check 
            type="switch"
            id="custom-switch"
            label={`Select All ${todoList.length}`}
            checked={calculateStatus(true) === todoList.length? true : false}
            onChange={switchAll}
          />
        </Form>
        <div>
          <span>Outstanding : {calculateStatus(false)}</span>
          {' / '}
          <span>Completed : {calculateStatus(true)}</span>
        </div>
      </div>

      <Button className='mt-3 float-end' variant={'danger'} onClick={deleteTodo}>Clear Completed</Button>

      {/* Modal */}
      {
        show ? (
          <Modal show={show} onHide={() => {handleClose(false)}}>
            <Modal.Header closeButton>
              <Modal.Title>Please Note</Modal.Title>
            </Modal.Header>
            <Modal.Body>Are you sure to delete all completed item ?</Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={() => {handleClose(false)}}>
                Cancel
              </Button>
              <Button variant="primary" onClick={() => {handleClose(true)}}>
                Yes, please delete all completed!
              </Button>
            </Modal.Footer>
          </Modal>
        )
        : null
      }
    </>
  )
}
