import React, { useEffect, useState } from 'react'
import useRequestData from '../hooks/useRequestData'
import Error from '../components/Error'

const BookNow = () => {
  const { data, error, makeRequest } = useRequestData();
  const [message, setMessage] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    let fd = new FormData(event.target)
    await makeRequest("http://localhost:5333/booking",
      {
        "Content-Type": "multipart/form-data"
      }, null, "POST", fd
    )
  }

  useEffect(() => {
    if (data && data.oprettet) {
      console.log('oprettet')
      setMessage('Tak din booking er modtaget')
    } else {
      setMessage('Noget gik galt')
    }
  }, [data])

  return (
    <section className='bookNowSection'>
      {error && <Error />}
      <div className="bookNowContainer">
        <h2><span>Book</span> <br /> service nu</h2>
        {data && data.oprettet ? (
          <p>{message}</p>
        ) : (
          <form onSubmit={e => handleSubmit(e)}>
            <input type="text" name="name" placeholder='Dit navn' required />
            <input type="email" name="email" placeholder='Din Email' required />
            <input type="tel" name="phone" placeholder='Telefon nr.' />
            <button type="submit" className='btn effect1'>Send</button>
          </form>
        )}

      </div>
    </section>
  )
}

export default BookNow