/* eslint-disable react/jsx-key */
/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react'
import api from '../service/api'
import Layout from '../components/Layout'
import { Col, Row } from 'antd'
import Doctor from '../components/Doctor'
import { useDispatch } from 'react-redux'
import { showLoading, hideLoading } from '../redux/alertsSlice'

import { Helmet } from 'react-helmet-async'

function Home() {
  const [doctors, setDoctors] = useState([])
  const dispatch = useDispatch()
  const getData = async () => {
    try {
      dispatch(showLoading())
      const response = await api.get('/api/user/get-all-approved-doctors', {
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('token'),
        },
      })
      dispatch(hideLoading())
      if (response.data.success) {
        setDoctors(response.data.data)
      }
    } catch (error) {
      dispatch(hideLoading())
    }
  }

  useEffect(() => {
    getData()
  }, [])
  return (
    <Layout>
      <Helmet>
        <title>Cleber Mendes BarberShop | Home</title>
      </Helmet>
      <Row gutter={20}>
        {doctors.map((doctor) => (
          <Col span={8} xs={24} sm={24} lg={8}>
            <Doctor doctor={doctor} />
          </Col>
        ))}
      </Row>
    </Layout>
  )
}

export default Home
