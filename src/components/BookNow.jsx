import React from 'react'
import useRequestData from '../hooks/useRequestData'

const BookNow = () => {
  const { data, isLoading, error, makeRequest } = useRequestData()

  const handleSubmit = async (event) => {
    event.preventDefault();
    let fd = new FormData(event.target)
    await makeRequest("http://localhost:5333/booking",
      {
        "Content-Type": "multipart/form-data"
      }, null, "POST", fd
    )
  }

  return (
    <section className='bookNowSection'>
      <div className="bookNowContainer">
        <h2><span>Book</span> <br /> service nu</h2>
        <form onSubmit={e => handleSubmit(event)}>
          <input type="text" name="name" placeholder='Dit navn' required />
          <input type="email" name="email" placeholder='Din Email' required />
          <input type="tel" name="phone" placeholder='Telefon nr.' />
          <button type="submit" className='btn'>Send</button>
        </form>
      </div>
    </section>
  )
}

export default BookNow