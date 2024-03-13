import React, { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import useRequestData from '../../hooks/useRequestData'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'

const AdminNewsEdit = () => {
  const { id } = useParams()
  const { data, isLoading, error, makeRequest } = useRequestData();
  const { data: dataEdit, isLoading: isLoadingEdit, error: errorEdit, makeRequest: makeRequestEdit } = useRequestData();
  const [quillContent, setQuillContent] = useState("");

  useEffect(() => {
    makeRequest("http://localhost:5333/news/" + id,)
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    let formData = new FormData(event.target)
    formData.append("content", quillContent);
    await makeRequestEdit("http://localhost:5333/news/admin/" + id,
      {
        "Content-Type": "multipart/form-data"
      }, null, "PUT", formData
    )
  }

  const refQuill = useRef();
  let toolbarOptions = [['bold', 'italic', 'underline', 'strike', { 'list': 'ordered' }, { 'list': 'bullet' }]];

  return (
    <section className='NewsEditContainer'>
      <div className="NewsEditHeader">
        <h1>Redigere nyhed {data?.title}</h1>
      </div>
      {
        data &&
        < form className='newsForm' onSubmit={e => handleSubmit(e)}>
          <input type="text" name="title" defaultValue={data.title} placeholder='Titel' required />
          {/*  <textarea name="content" id="" cols="30" rows="10" defaultValue={data.content} ></textarea> */}
          <ReactQuill
            onChange={setQuillContent}
            ref={refQuill}
            defaultValue={data.content}
            placeholder="Lang produktbeskrivelse (formateret)"
            modules={{ toolbar: toolbarOptions }}
            style={{}}
          />
          <input type="file" name="image" />
          <button type='submit' className='btn'>Opdatere</button>
        </form >
      }
    </section>
  )
}

export default AdminNewsEdit