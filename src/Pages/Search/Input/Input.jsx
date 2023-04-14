import React, {useState} from 'react'
import PubSub from 'pubsub-js'
import axios from 'axios'
import Alert from 'react-bootstrap/Alert'
import { Button } from 'react-bootstrap'
import Form from 'react-bootstrap/Form'
import Stack from 'react-bootstrap/Stack'

function Input() {

  const [value, setValue] = useState('')
  const [isDisable, setDisable] = useState(false)

  function amendValue(e){
    setValue(e.target.value)
  }
  
  function resetValue(){
    setValue('')
    PubSub.publish('resultData', {list: [], isLoading: false, errorMsg: null, isFirst: true})
  }

  function sendRequest(e){
    if(e.keyCode === 13){
      fetchRequest()
    }
  }

  async function fetchRequest(){
    PubSub.publish('resultData', {list: [], isLoading: true, errorMsg: null, isFirst: false})
    setDisable(true)
    if(value.trim() !== ''){
      try{
        const request = await axios.get(`https://api.github.com/search/users?q=${value}`)
        PubSub.publish('resultData', {list: request.data.items, isLoading: false, errorMsg: null, isFirst: false})
        setDisable(false)
      }catch(error){
        PubSub.publish('resultData', {list: [], isLoading: false, errorMsg: error.message, isFirst: false})
        setDisable(false)
      }
    }else{
      PubSub.publish('resultData', {list: [], isLoading: false, errorMsg: 'Please input user name', isFirst: false})
      setDisable(false)
    }
  }

  return (
    <div>
      <h1 className='mt-5'>Search GitHub user</h1>
      <Stack 
        direction="horizontal" 
        gap={2} 
        className="mx-auto mt-2">
        <Form.Control 
          className="me-auto" 
          placeholder="Add your item here..." 
          onKeyUp={sendRequest} 
          value={value} 
          onChange={amendValue}/>
        <Button variant="primary" disabled={isDisable? true : false} onClick={fetchRequest}>Submit</Button>
        <Button variant="danger" disabled={isDisable? true : false} onClick={resetValue}>Reset</Button>
      </Stack>
      <div className="mx-auto mt-2">
        <Alert variant={'primary'}>
          {value === '' ? 'You are searcing...' : `You are searcing ${value}`}
        </Alert>
      </div>
    </div>
  )
}

export default Input
