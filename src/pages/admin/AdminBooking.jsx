import React, { useEffect, useState } from 'react'
import useRequestData from '../../hooks/useRequestData';
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { Link } from 'react-router-dom';

const AdminBooking = () => {
  const { data, isLoading, error, makeRequest } = useRequestData();
  const { data: dataDelete, isLoading: isLoadingDelete, error: errorDelete, makeRequest: makeRequestDelete } = useRequestData()
  const [message, setMessage] = useState('');

  useEffect(() => {
    makeRequest('http://localhost:5333/booking/admin');
  }, []);


  const handleDelete = (id, title) => {
    if (window.confirm("Er du sikker på at du vil slette " + title + "?")) {
      makeRequestDelete("http://localhost:5333/booking/admin/" + id,
        {
        }, null, "DELETE")
    }
  }

  useEffect(() => {
    if (dataDelete) {
      setMessage('Booking blev slettet.');
      makeRequest('http://localhost:5333/booking/admin');
    }
  }, [dataDelete]);

  return (
    <section className='bookingContainer'>
      <div>
        <h1>Nyheder</h1>
      </div>
      {dataDelete && <p className='textOrange message'>{message}</p>}
      <table>
        <thead>
          <tr>
            <th>Navn:</th>
            <th>Email:</th>
            <th>Telefon:</th>
            <th>note</th>
            <th>Se</th>
            <th>slet</th>
          </tr>
        </thead>
        <tbody>
          {data?.map((item, index) => (
            <tr key={index}>
              <td>{item.name}</td>
              <td>{item.email}</td>
              <td>{item.phone}</td>
              <td>{item.note}</td>
              <td>
                <Link to={"/admin/booking/edit/" + item._id}>
                  <FaEdit />
                </Link>
              </td>
              <td>
                <MdDelete onClick={() => handleDelete(item._id, item.title)} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>

    </section>
  )
}

export default AdminBooking