import React from 'react'

const Loader = () => {
  return (
    <section className='loader'>
      <div className='loaderContainer'>
        <h1>Loader..</h1>
        <p>Et øjeblik data bliver hentet...</p>
        <div className='LoaderImage'>
          <img src="/public/asssets/stroemLogo.gif" alt="" />
        </div>
      </div>

    </section>
  )
}

export default Loader