import React from 'react'
import { useState } from 'react'
import axios from 'axios'
import { useLoader } from '../context/LoaderContext'


const useRequestData = () => {

  const [data, setData] = useState()
  const [error, setError] = useState()
  const { showLoader, hideLoader } = useLoader();

  const makeRequest = async (url, headers = null, params = null, method = "GET", bodydata = null) => {

    showLoader();

    try {
      let response

      if (method === "GET") {
        response = await axios.get(url, { headers: headers, params: params })

      } else if (method === "POST") {
        response = await axios.post(url, bodydata, { headers: headers, params: params })

      } else if (method === "DELETE") {
        response = await axios.delete(url, { headers: headers, params: params })

      } else if (method === "PATCH") {
        response = await axios.patch(url, bodydata, { headers: headers, params: params })

      }
      else if (method === "PUT") {
        response = await axios.put(url, bodydata, { headers: headers, params: params })

      }

      setData(response.data)
      setError()

    } catch (error) {
      console.log(error)
      setError("Der er opstået en fejl:" + error.message)

    } finally {
      hideLoader();
    }
  }

  return (
    { data, error, makeRequest }
  )
}

export default useRequestData