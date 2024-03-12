import React from 'react'

const BookNow = () => {
  return (
    <section className='bookNowSection'>
      <div className="bookNowContainer">
        <h2><span>Book</span> <br /> service nu</h2>
        <form >
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