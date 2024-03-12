import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import useRequestData from '../../hooks/useRequestData'

const AdminNewsEdit = () => {
  const { id } = useParams()
  const { data, isLoading, error, makeRequest } = useRequestData()

  useEffect(() => {
    makeRequest("http://localhost:5333/news/" + id,)
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    let fd = new FormData(event.target)
    await makeRequest("http://localhost:5023/services/admin/" + id,
      {
        "Content-Type": "multipart/form-data"
      }, null, "PUT", fd
    )
  }


  return (
    <section className='NewsEditContainer'>
      <div className="NewsEditHeader">
        <h1>Redigere nyhed {data?.title}</h1>
      </div>
      {
        data &&
        < form className='newsForm' onSubmit={e => handleSubmit(e)}>
          <input type="text" name="title" defaultValue={data.title} placeholder='Titel' required />
          <textarea name="content" id="" cols="30" rows="10" defaultValue={data.content} ></textarea>
          <input type="file" name="image" />
          <button type='submit' className='btn'>Opdatere</button>
        </form >
      }
    </section>
  )
}

export default AdminNewsEdit