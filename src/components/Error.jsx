import React from 'react'

const Error = ({ error }) => {
  return (
    <section>
      <div className='message error'>
        <h2>Der er sket en fejl!</h2>
        <p>Vi beklager men der er sket en fejl {error}</p>
        <p>Hvis fejlen forsætter bedes du kontakt os</p>
      </div>
    </section>
  )
}

export default Error