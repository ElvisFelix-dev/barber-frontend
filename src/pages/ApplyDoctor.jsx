import Layout from '../components/Layout'
import { useDispatch, useSelector } from 'react-redux'
import { showLoading, hideLoading } from '../redux/alertsSlice'
import { toast } from 'react-toastify'
import api from '../service/api'
import { useNavigate } from 'react-router-dom'
import DoctorForm from '../components/DoctorForm'
import moment from 'moment'

import { Helmet } from 'react-helmet-async'

function ApplyDoctor() {
  const dispatch = useDispatch()
  const { user } = useSelector((state) => state.user)
  const navigate = useNavigate()
  const onFinish = async (values) => {
    try {
      dispatch(showLoading())
      const response = await api.post(
        '/api/user/apply-doctor-account',
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

  return (
    <Layout>
      <Helmet>
        <title>Cleber Mendes BarberShop | Add Barber</title>
      </Helmet>
      <h1 className="page-title">Add Barber</h1>
      <hr />

      <DoctorForm onFinish={onFinish} />
    </Layout>
  )
}

export default ApplyDoctor
