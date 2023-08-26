/* eslint-disable react-hooks/exhaustive-deps */
import { Button, Col, DatePicker, Row, TimePicker } from 'antd'
import { useEffect, useState } from 'react'
import Layout from '../components/Layout'
import { useDispatch, useSelector } from 'react-redux'
import { showLoading, hideLoading } from '../redux/alertsSlice'
import { toast } from 'react-toastify'
import api from '../service/api'
import { useNavigate, useParams } from 'react-router-dom'
import moment from 'moment'

function BookAppointment() {
  const [isAvailable, setIsAvailable] = useState(false)
  const navigate = useNavigate()
  const [date, setDate] = useState()
  const [time, setTime] = useState()
  const { user } = useSelector((state) => state.user)
  const [doctor, setDoctor] = useState(null)
  const params = useParams()
  const dispatch = useDispatch()

  const getDoctorData = async () => {
    try {
      dispatch(showLoading())
      const response = await api.post(
        '/api/doctor/get-doctor-info-by-id',
        {
          doctorId: params.doctorId,
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
  const checkAvailability = async () => {
    try {
      dispatch(showLoading())
      const response = await api.post(
        '/api/user/check-booking-avilability',
        {
          doctorId: params.doctorId,
          date,
          time,
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
        setIsAvailable(true)
      } else {
        toast.error(response.data.message)
      }
    } catch (error) {
      toast.error('Erro ao agendar')
      dispatch(hideLoading())
    }
  }
  const bookNow = async () => {
    setIsAvailable(false)
    try {
      dispatch(showLoading())
      const response = await api.post(
        '/api/user/book-appointment',
        {
          doctorId: params.doctorId,
          userId: user._id,
          doctorInfo: doctor,
          userInfo: user,
          date,
          time,
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
        navigate('/appointments')
      }
    } catch (error) {
      toast.error('Erro ao agendar')
      dispatch(hideLoading())
    }
  }

  useEffect(() => {
    getDoctorData()
  }, [])
  return (
    <Layout>
      {doctor && (
        <div>
          <h1 className="page-title">
            {doctor.firstName} {doctor.lastName}
          </h1>
          <hr />
          <Row gutter={20} className="mt-5" align="middle">
            <Col span={8} sm={24} xs={24} lg={8}>
              <img
                src="https://thumbs.dreamstime.com/b/finger-press-book-now-button-booking-reservation-icon-online-149789867.jpg"
                alt=""
                width="100%"
                height="400"
              />
            </Col>
            <Col span={8} sm={24} xs={24} lg={8}>
              <h1 className="normal-text">
                <b>Horário :</b> {doctor.timings[0]} - {doctor.timings[1]}
              </h1>
              <p>
                <b>Celular/Whatsaap : </b>
                {doctor.phoneNumber}
              </p>
              <p>
                <b>Endereço : </b>
                {doctor.address}
              </p>
              <p>
                <b>Valor do Corte : </b>
                {doctor.feePerCunsultation}
              </p>
              <p>
                <b>Instagram : </b>
                {doctor.website}
              </p>
              <div className="d-flex flex-column pt-2 mt-2">
                <DatePicker
                  format="DD-MM-YYYY"
                  onChange={(value) => {
                    setDate(moment(value).format('DD-MM-YYYY'))
                    setIsAvailable(false)
                  }}
                />
                <TimePicker
                  format="HH:mm"
                  className="mt-3"
                  onChange={(value) => {
                    setIsAvailable(false)
                    setTime(moment(value).format('HH:mm'))
                  }}
                />
                {!isAvailable && (
                  <Button
                    className="primary-button mt-3 full-width-button"
                    onClick={checkAvailability}
                  >
                    Verificar disponibilidade
                  </Button>
                )}

                {isAvailable && (
                  <Button
                    className="primary-button mt-3 full-width-button"
                    onClick={bookNow}
                  >
                    Agendar Agora
                  </Button>
                )}
              </div>
            </Col>
          </Row>
        </div>
      )}
    </Layout>
  )
}

export default BookAppointment
