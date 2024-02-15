import logo from './logo.svg';
import './App.css';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Row, Col, Container } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  let [data, setdata] = useState([])
  let [val, setval] = useState([])
  let [all, setall] = useState([])

  useEffect(() => {
    axios.get('https://rickandmortyapi.com/api/character')
      .then(function (response) {
        // handle success
        // if (response == '') {
        //   setdata('hakdgadgaudfadgy')
        // }
        console.log(response.data.results);
        setdata(response.data.results)
        setall(response.data.results)

      })
      .catch(function (error) {
        // handle error
        console.log(error);
      })

  }, [])

  const getdata = () => {
    var search = data.filter((ele, ind) => {
      return ele.name == val;
    })
    setdata(search)

  }
  const alldata = () => {
    setdata(all)

  }
  return (
    <div className="">
      <h1 className='text-center' style={{fontSize:'70px',fontWeight:'bolder'}}>The Rick And Morty API</h1>
      
      <div style={{ backgroundColor: '#272B33' }}>
      <div className='search text-center pt-5'>
        <input type='text' onChange={(e) => setval(e.target.value)} placeholder='Search name'></input>
        <button onClick={getdata}>SEARCH</button>
        <button onClick={alldata}>ALL</button>
      </div>
        <Container>
          <Row>
            {
              data.length != 0 ?
                data.map((ele, ind) => {
                  return (
                    <Col lg={6} className=' p-0 my-4 '  >
                      <div className='d-flex me-4' style={{ backgroundColor: '#3C3E44', color: 'white', borderRadius: '10px' }}>
                        <img src={ele.image} style={{ borderRadius: '10px 0 0 10px', width: '260px' }}></img>
                        <div className='p-3'>
                          <h3 className=''>{ele.name}</h3>
                          <div className='d-flex align-items-center'>
                            <span style={{ height: '12px', width: '12px', backgroundColor: ele.status == 'Alive' ? 'green' : ele.status == 'Dead' ? 'red' : 'grey', borderRadius: '50%' }} className='me-2'></span>

                            <p className='m-0'>{ele.status}-{ele.species}</p>
                          </div>
                          <p style={{ color: '#989798' }} className='my-3'>Last known location : </p>
                          <h5>{ele.origin.name}</h5>
                          <p style={{ color: '#989798' }} className='my-3'>First seen in :</p>
                          <h5>{ele.location.name}</h5>
                        </div>
                      </div>
                    </Col>

                  )
                }) : <span class="loader"></span>
            }
          </Row>
        </Container>

      </div>
    </div>
  );
}

export default App;
