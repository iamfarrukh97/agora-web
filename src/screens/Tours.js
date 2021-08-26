import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'

import axiosInstance from './../api/axios'
import { GETALLTOURS } from './../api/Endpoint'
import './Tours.css'

const Tours = props => {
  const history = useHistory()
  console.log('props ', props.location.state)
  const { userType } = props.location.state
  const [tours, setTours] = useState([])
  useEffect(() => {
    const url = GETALLTOURS
    axiosInstance
      .get(url)
      .then(res => {
        // console.log('res ', JSON.stringify(res.data.data.tours))
        setTours(res.data.data.tours)
      })
      .catch(error => {
        console.log('error ', error)
      })
  }, [])
  const tile = item => (
    <div
      className='tile'
      key={item._id}
      onClick={() => {
        history.push({ pathname: '/Live', state: { userType, item } })
      }}
    >
      <h1>{item.tourName}</h1>

      <div className='image-container'>
        <img
          src={item?.tourImage}
          className='Tours-image'
          alt='tour'
        />
      </div>
    </div>
  )

  return (
    <div>
      <h1>tours screen</h1>
      <div style={{ display: 'flex' }}>{tours.map(e => tile(e))}</div>
    </div>
  )
}

export default Tours
