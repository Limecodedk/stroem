import React, { useRef, useState } from 'react'
import useRequestData from '../../hooks/useRequestData'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'

const AdminNewsCreate = () => {
  const { data, isLoading, error, makeRequest } = useRequestData()
  const [quillContent, setQuillContent] = useState("")

  const handleSubmit = e => {
    e.preventDefault();
    let formData = new FormData(e.target)
    formData.append("content", quillContent);
    makeRequest("http://localhost:5333/news/admin",
      {
        "Content-Type": ""
      }, null, "POST", formData
    )
  }

  const refQuill = useRef();
  let toolbarOptions = [['bold', 'italic', 'underline', 'strike', { 'list': 'ordered' }, { 'list': 'bullet' }]];


  return (
    <section className='NewsEditContainer'>
      <div className="NewsEditHeader">
        <h1>Opret nyhed</h1>
      </div>
      < form className='newsForm' onSubmit={e => handleSubmit(e)}>
        <input type="text" name="title" placeholder='Titel' required />
        {/*    <textarea name="content" id="" cols="30" rows="10"  ></textarea> */}
        <ReactQuill
          onChange={setQuillContent}
          ref={refQuill}
          placeholder="Lang produktbeskrivelse"
          modules={{ toolbar: toolbarOptions }}
          style={{}}
        />
        <input type="file" name="image" />
        <button type='submit' className='btn'>Opdatere</button>
      </form >
    </section>
  )
}

export default AdminNewsCreate