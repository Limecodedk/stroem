import React, { useEffect, useRef, useState } from 'react';
import useRequestData from '../../hooks/useRequestData'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'

const AdminAbout = () => {
  const { data, isLoading, error, makeRequest } = useRequestData()
  const { data: dataEdit, isLoading: isLoadingEdit, error: errorEdit, makeRequest: makeRequestEdit } = useRequestData()
  const [quillContent, setQuillContent] = useState("")

  useEffect(() => {
    makeRequest("http://localhost:5333/about/",)
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    formData.append("content", quillContent); // Tilføj quill-indhold til formulardata
    await makeRequestEdit("http://localhost:5333/about/admin", {
      "Content-Type": "multipart/form-data"
    }, null, "PUT", formData,
    );
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

export default AdminAbout