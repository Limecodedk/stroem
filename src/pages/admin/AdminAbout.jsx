import React, { useEffect, useRef, useState } from 'react';
import useRequestData from '../../hooks/useRequestData'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'
import Error from '../../components/Error';

const AdminAbout = () => {
  const { data, error, makeRequest } = useRequestData()
  const { data: dataEdit, error: errorEdit, makeRequest: makeRequestEdit } = useRequestData()
  const [quillContent, setQuillContent] = useState("")
  const [message, setMessage] = useState('');

  const combinedError = error || errorEdit;

  useEffect(() => {
    makeRequest("http://localhost:5333/about/",)
  }, []);

  useEffect(() => {
    if (dataEdit && dataEdit.rettet) {
      console.log('ændret')
      setMessage('Om os er opdateret')
    } else {
      setMessage('Noget gik galt')
    }
  }, [dataEdit])


  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    formData.append("content", quillContent);
    await makeRequestEdit("http://localhost:5333/about/admin", {
      "Content-Type": "multipart/form-data"
    }, null, "PUT", formData,
    );
  }

  const refQuill = useRef();
  let toolbarOptions = [['bold', 'italic', 'underline', 'strike', { 'list': 'ordered' }, { 'list': 'bullet' }]];

  return (
    <section className='NewsEditContainer'>
      {combinedError && <Error />}
      <div className="NewsEditHeader">
        <h1>Redigere nyhed {data?.title}</h1>
      </div>
      {dataEdit && dataEdit.rettet && (
        <p className='textOrange'>{message}</p>
      )}
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