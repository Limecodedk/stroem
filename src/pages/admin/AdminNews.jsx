import React, { useEffect, useState } from 'react'
import useRequestData from '../../hooks/useRequestData';
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { Link } from 'react-router-dom';
import Error from '../../components/Error';

const AdminNews = () => {
  const { data, error, makeRequest } = useRequestData();
  const { data: dataDelete, error: errorDelete, makeRequest: makeRequestDelete } = useRequestData()
  const [message, setMessage] = useState('');

  const combinedError = error || errorDelete;

  useEffect(() => {
    makeRequest('http://localhost:5333/news');
  }, [dataDelete]);

  const handleDelete = (id, title) => {
    if (window.confirm("Er du sikker på at du vil slette " + title + "?")) {
      makeRequestDelete("http://localhost:5333/news/admin/" + id,
        {
        }, null, "DELETE")
    }
  }

  useEffect(() => {
    if (dataDelete) {
      setMessage('Nyheden blev slettet.');
      makeRequest('http://localhost:5333/news'); // Opdater data efter sletning
    }
  }, [dataDelete]);

  return (
    <section>
      <div>
        <h1>Nyheder</h1>
      </div>
      {combinedError && <Error />}
      {dataDelete && <p className='textOrange message'>{message}</p>}
      <table>
        <thead>
          <tr>
            <th>Titel:</th>
            <th>Indhold:</th>
            <th>Redigere:</th>
            <th>Slet:</th>
          </tr>
        </thead>
        <tbody>
          {data?.map((item, index) => (
            <tr key={index}>
              <td>{item.title}</td>
              <td>{item.content}</td>
              <td>
                <Link to={"/admin/news/edit/" + item._id}>
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

export default AdminNews