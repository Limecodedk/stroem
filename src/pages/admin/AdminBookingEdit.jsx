import React, { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import useRequestData from '../../hooks/useRequestData'
import { MdDelete } from "react-icons/md";

const AdminBookingEdit = () => {
  const { id } = useParams()
  const { data, isLoading, error, makeRequest } = useRequestData();
  const { data: dataEdit, isLoading: isLoadingEdit, error: errorEdit, makeRequest: makeRequestEdit } = useRequestData();
  const { data: dataAccept, isLoading: isLoadingAccept, error: errorAccept, makeRequest: makeRequestAccept } = useRequestData();

  useEffect(() => {
    makeRequest("http://localhost:5333/booking/admin/" + id,)
  }, []);

  useEffect(() => {
    if (data?.accept === true) {
      document.title = "Godkendt";
    } else if (data?.accept === false) {
      document.title = "Ikke godkendt";
    }
  }, [data?.accept]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    let formData = new FormData(event.target)
    await makeRequestEdit("http://localhost:5333/booking/admin/" + id,
      {
        "Content-Type": "multipart/form-data"
      }, null, "PUT", formData
    )
  }

  const toggleAccept = async (event) => {
    event.preventDefault();
    const form = event.target.closest('form');
    const formData = new FormData(form);
    await makeRequestAccept("http://localhost:5333/booking/accept/admin/" + id,
      {
        "Content-Type": "multipart/form-data"
      }, null, "PATCH", formData
    )
  }

  return (
    <section className='bookingEditContainer'>
      <div>
        <h1>Booking af {data?.name}:</h1>
      </div>
      <div className='bookingTableContainer'>
        <table>
          <thead>
            <tr>
              <th>Navn:</th>
              <th>Email:</th>
              <th>Telefon:</th>
              <th>Status</th>
              <th>note</th>
              <th>slet</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{data?.name}</td>
              <td>{data?.email}</td>
              <td>{data?.phone}</td>
              <td><p>{data?.accept ? 'Godkendt' : 'Ikke godkendt'}</p></td>
              <td>{data?.note}</td>
              <td>
                <MdDelete onClick={() => handleDelete(item._id, item.title)} />
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <form className='bookingAcceptForm' onSubmit={toggleAccept}>
        <label htmlFor="accept">Vælg status:</label>
        <select name="accept" defaultValue={"default"} onChange={toggleAccept}>
          <option value="default" disabled>Vælg status</option>
          <option value={true}>Godkendt</option>
          <option value={false}>Ikke godkendt</option>
        </select>
        <button type='Gem' className='btn'>Gem</button>
      </form>

      <form className='bookingNoteForm' onSubmit={e => handleSubmit(e)}>
        <label htmlFor="note">Tilføj note kort note (max 50tegn):</label>
        <textarea name="note" cols="30" rows="10" maxLength={50} defaultValue={data?.note}></textarea>
        <button type="submit" className='btn'>Gem</button>
      </form>

    </section>
  )
}

export default AdminBookingEdit