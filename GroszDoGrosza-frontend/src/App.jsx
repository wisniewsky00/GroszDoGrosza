import { useEffect, useState } from 'react'
import './App.css'
import backendApi from './services/backendApi'

function App() {
  const [message, setMessage] = useState('')

  useEffect(() => {

    const fetchMessageData = async () => {
      const response = await backendApi.get('/test')
      setMessage(response.data);
    }

    fetchMessageData();
  }, [])

  return (
    <>
      <h1>{message}</h1>
    </>
  )
}

export default App
