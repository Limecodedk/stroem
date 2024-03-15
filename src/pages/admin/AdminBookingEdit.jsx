import React, { useEffect, useRef, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import useRequestData from '../../hooks/useRequestData'
import { MdDelete } from "react-icons/md";
import Error from '../../components/Error';

const AdminBookingEdit = () => {
  const { id } = useParams()
  const { data, error, makeRequest } = useRequestData();
  const { data: dataUpdate, error: errorUpdate, makeRequest: makeRequestUpdate } = useRequestData();
  const { data: dataEdit, error: errorEdit, makeRequest: makeRequestEdit } = useRequestData();
  const { data: dataAccept, error: errorAccept, makeRequest: makeRequestAccept } = useRequestData();
  const { data: dataDelete, error: errorDelete, makeRequest: makeRequestDelete } = useRequestData()
  const [message, setMessage] = useState('');

  const combinedError = error || errorUpdate || errorEdit || errorAccept || errorDelete;
  const navigate = useNavigate()

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
    makeRequest("http://localhost:5333/booking/admin/" + id)
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
    makeRequest("http://localhost:5333/booking/admin/" + id)
  }

  const handleDelete = async (id, name) => {
    if (window.confirm("Er du sikker på at du vil slette booking fra " + name + "?")) {
      await makeRequestDelete("http://localhost:5333/booking/admin/" + id,
        {
        }, null, "DELETE")
    }
    navigate('/admin/booking')
  }

  useEffect(() => {
    makeRequestUpdate("http://localhost:5333/booking/admin/" + id,)
  }, [dataDelete, dataAccept, dataEdit])

  useEffect(() => {
    if (dataAccept && dataAccept.rettet) {
      setMessage('Booking status ændret.');
    } else if (dataEdit && dataEdit.rettet) {
      setMessage('Bokking note er ændret')
    }
  }, [dataDelete, dataAccept, dataEdit]);

  return (
    <section className='bookingEditContainer'>
      <div>
        <h1>Booking af {data?.name}:</h1>
      </div>
      {combinedError && <Error />}
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
                <MdDelete onClick={() => handleDelete(data?._id, data?.name)} />
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <form className='bookingAcceptForm'>
        <label htmlFor="accept">Vælg status:</label>
        <select name="accept" defaultValue={"default"} onChange={toggleAccept}>
          <option value="default" disabled>Vælg status</option>
          <option value={true}>Godkendt</option>
          <option value={false}>Ikke godkendt</option>
        </select>
      </form>

      <form className='bookingNoteForm' onSubmit={e => handleSubmit(e)}>
        <label htmlFor="note">Tilføj note kort note (max 50tegn):</label>
        <textarea name="note" cols="30" rows="10" maxLength={50} defaultValue={data?.note} required></textarea>
        <button type="submit" className='btn'>Gem</button>
      </form>
      <p className='textOrange'>{message}</p>
    </section>
  )
}

export default AdminBookingEdit