import React, { useEffect, useState } from 'react';
import useRequestData from '../hooks/useRequestData';
import PageHeader from '../components/PageHeader';
import { useLocation } from 'react-router-dom';
import parse from 'html-react-parser';

const Services = () => {
  const { data, isLoading, error, makeRequest } = useRequestData();
  const [selectedService, setSelectedService] = useState(null);
  const pathnames = useLocation().pathname.split('/').filter((x) => x);

  useEffect(() => {
    makeRequest('http://localhost:5333/service');
  }, []);

  useEffect(() => {
    if (data && data.length > 0) {
      setSelectedService(data[0]);
    }
  }, [data]);


  const handleServiceSelect = (service) => {
    setSelectedService(service);
  };

  return (
    <section className='serviceSection'>
      <div>
        <PageHeader title={'Vores Services'} pathnames={pathnames} />
      </div>
      <div className='selectedServiceContainer'>
        <div className="serviceNav">
          {data?.map((item) => (
            <div
              className={`serviceBox ${selectedService && selectedService._id === item._id ? 'active' : ''}`}
              key={item._id} onClick={() => handleServiceSelect(item)}
            >
              <p>{item.title} <span className='arrows'>&rarr;</span></p>
            </div>
          ))}
        </div>
        <div className="serviceContent">
          {selectedService && (
            <>
              <img src={`http://localhost:5333/images/service/${selectedService.image}`} alt="" />
              <h2>{selectedService.title}</h2>
              <div>{parse(selectedService.content)}</div>
            </>
          )}
        </div>
      </div>
    </section>
  )
}

export default Services;
