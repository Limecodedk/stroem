import React, { useEffect } from 'react'
import useRequestData from '../../hooks/useRequestData';
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { Link } from 'react-router-dom';

const AdminNews = () => {
  const { data, isLoading, error, makeRequest } = useRequestData();
  const { data: dataDelete, isLoading: isLoadingDelete, error: errorDelete, makeRequest: makeRequestDelete } = useRequestData()

  useEffect(() => {
    makeRequest('http://localhost:5333/news');
  }, []);


  const handleDelete = (id, title) => {
    if (window.confirm("Er du sikker på at du vil slette " + title + "?")) {
      makeRequestDelete("http://localhost:5333/news/admin/" + id,
        {
        }, null, "DELETE")
    }
  }
  return (
    <section>
      <div>
        <h1>Nyheder</h1>
      </div>
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