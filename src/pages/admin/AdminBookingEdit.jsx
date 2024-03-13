import React, { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import useRequestData from '../../hooks/useRequestData'


const AdminBookingEdit = () => {
  const { id } = useParams()
  const { data, isLoading, error, makeRequest } = useRequestData();
  const { data: dataEdit, isLoading: isLoadingEdit, error: errorEdit, makeRequest: makeRequestEdit } = useRequestData();
  const { data: dataAccept, isLoading: isLoadingAccept, error: errorAccept, makeRequest: makeRequestAccept } = useRequestData();

  useEffect(() => {
    makeRequest("http://localhost:5333/booking/admin/" + id,)
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    let formData = new FormData(event.target)
    await makeRequestEdit("http://localhost:5333/booking/admin/" + id,
      {
        "Content-Type": "multipart/form-data"
      }, null, "PUT", formData
    )
  }

  /*   const toggleAccept = async (event) => {
      event.preventDefault();
      let formData = new FormData(event.target)
      await makeRequestAccept("http://localhost:5333/booking/accept/admin/" + id,
        {
          "Content-Type": "multipart/form-data"
        }, null, "PATCH", formData
      )
    }
  
    <select name="accept" defaultValue={data?.accept} onChange={toggleAccept}>
    <option value={true}>Godkendt</option>
    <option value={false}>Ikke godkendt</option>
  </select> */

  return (
    <section className='bookingEditContainer'>
      <div>
        <h1>Booking af {data?.name}:</h1>
      </div>

      <form className='bookingNoteForm' onSubmit={e => handleSubmit(e)}>
        <label htmlFor="note">Tilføj note kort note (max 50tegn):</label>
        <textarea name="note" cols="30" rows="10" maxLength={50} defaultValue={data?.note}></textarea>
        <button type="submit" className='btn'>Gem</button>
      </form>




    </section>
  )
}

export default AdminBookingEdit