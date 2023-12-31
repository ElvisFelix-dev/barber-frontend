/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import Layout from '../components/Layout'
import { showLoading, hideLoading } from '../redux/alertsSlice'
import api from '../service/api'
import { Table } from 'antd'
import moment from 'moment'

import { Helmet } from 'react-helmet-async'

function Appointments() {
  const [appointments, setAppointments] = useState([])
  const dispatch = useDispatch()
  const getAppointmentsData = async () => {
    try {
      dispatch(showLoading())
      const resposne = await api.get('/api/user/get-appointments-by-user-id', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      })
      dispatch(hideLoading())
      if (resposne.data.success) {
        setAppointments(resposne.data.data)
      }
    } catch (error) {
      dispatch(hideLoading())
    }
  }
  const columns = [
    {
      title: 'Id',
      dataIndex: '_id',
    },
    {
      title: 'Barbeiro',
      dataIndex: 'name',
      render: (text, record) => (
        <span>
          {record.doctorInfo.firstName} {record.doctorInfo.lastName}
        </span>
      ),
    },
    {
      title: 'Celular/Whatsaap',
      dataIndex: 'phoneNumber',
      render: (text, record) => <span>{record.doctorInfo.phoneNumber}</span>,
    },
    {
      title: 'Data & Hora',
      dataIndex: 'createdAt',
      render: (text, record) => (
        <span>
          {moment(record.date).format('DD-MM-YYYY')}/
          {moment(record.time).format('HH:mm')}
        </span>
      ),
    },
    {
      title: 'Status',
      dataIndex: 'status',
    },
  ]
  useEffect(() => {
    getAppointmentsData()
  }, [])
  return (
    <Layout>
      <Helmet>
        <title>Cleber Mendes BarberShop | Agendamentos</title>
      </Helmet>
      <h1 className="page-title">Agendamentos</h1>
      <hr />
      <Table columns={columns} dataSource={appointments} />
    </Layout>
  )
}

export default Appointments
