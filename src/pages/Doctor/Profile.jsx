/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react'
import Layout from '../../components/Layout'
import { useDispatch, useSelector } from 'react-redux'
import { showLoading, hideLoading } from '../../redux/alertsSlice'
import { toast } from 'react-toastify'
import api from '../../service/api'
import { useNavigate, useParams } from 'react-router-dom'
import DoctorForm from '../../components/DoctorForm'
import moment from 'moment'

import { Helmet } from 'react-helmet-async'

function Profile() {
  const { user } = useSelector((state) => state.user)
  const params = useParams()
  const [doctor, setDoctor] = useState(null)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const onFinish = async (values) => {
    try {
      dispatch(showLoading())
      const response = await api.post(
        '/api/doctor/update-doctor-profile',
        {
          ...values,
          userId: user._id,
          timings: [
            moment(values.timings[0]).format('HH:mm'),
            moment(values.timings[1]).format('HH:mm'),
          ],
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        },
      )
      dispatch(hideLoading())
      if (response.data.success) {
        toast.success(response.data.message)
        navigate('/')
      } else {
        toast.error(response.data.message)
      }
    } catch (error) {
      dispatch(hideLoading())
      toast.error('Algo deu errado')
    }
  }

  const getDoctorData = async () => {
    try {
      dispatch(showLoading())
      const response = await api.post(
        '/api/doctor/get-doctor-info-by-user-id',
        {
          userId: params.userId,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        },
      )

      dispatch(hideLoading())
      if (response.data.success) {
        setDoctor(response.data.data)
      }
    } catch (error) {
      console.log(error)
      dispatch(hideLoading())
    }
  }

  useEffect(() => {
    getDoctorData()
  }, [])
  return (
    <Layout>
      <Helmet>
        <title>Cleber Mendes BarberShop | Perfil do Barber</title>
      </Helmet>
      <h1 className="page-title">Perfil do Barber</h1>
      <hr />
      {doctor && <DoctorForm onFinish={onFinish} initivalValues={doctor} />}
    </Layout>
  )
}

export default Profile
