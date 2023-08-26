/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import Layout from '../../components/Layout'
import { showLoading, hideLoading } from '../../redux/alertsSlice'
import { toast } from 'react-toastify'
import api from '../../service/api'
import { Table } from 'antd'
import moment from 'moment'

function DoctorAppointments() {
  const [appointments, setAppointments] = useState([])
  const dispatch = useDispatch()
  const getAppointmentsData = async () => {
    try {
      dispatch(showLoading())
      const resposne = await api.get(
        '/api/doctor/get-appointments-by-doctor-id',
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        },
      )
      dispatch(hideLoading())
      if (resposne.data.success) {
        setAppointments(resposne.data.data)
      }
    } catch (error) {
      dispatch(hideLoading())
    }
  }

  const changeAppointmentStatus = async (record, status) => {
    try {
      dispatch(showLoading())
      const resposne = await api.post(
        '/api/doctor/change-appointment-status',
        { appointmentId: record._id, status },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        },
      )
      dispatch(hideLoading())
      if (resposne.data.success) {
        toast.success(resposne.data.message)
        getAppointmentsData()
      }
    } catch (error) {
      toast.error('Erro ao alterar o status da conta do barber')
      dispatch(hideLoading())
    }
  }
  const columns = [
    {
      title: 'Id',
      dataIndex: '_id',
    },
    {
      title: 'Cliente',
      dataIndex: 'name',
      render: (text, record) => <span>{record.userInfo.name}</span>,
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
          {moment(record.date).format('DD-MM-YYYY')}{' '}
          {moment(record.time).format('HH:mm')}
        </span>
      ),
    },
    {
      title: 'Status',
      dataIndex: 'status',
    },
    {
      title: 'Ações',
      dataIndex: 'actions',
      render: (text, record) => (
        <div className="d-flex">
          {record.status === 'pending' && (
            <div className="d-flex">
              <h1
                className="anchor px-2"
                onClick={() => changeAppointmentStatus(record, 'approved')}
              >
                Aprovar
              </h1>
              <h1
                className="anchor"
                onClick={() => changeAppointmentStatus(record, 'rejected')}
              >
                Rejeitar
              </h1>
            </div>
          )}
        </div>
      ),
    },
  ]
  useEffect(() => {
    getAppointmentsData()
  }, [])
  return (
    <Layout>
      <h1 className="page-header">Agendamentos</h1>
      <hr />
      <Table columns={columns} dataSource={appointments} />
    </Layout>
  )
}

export default DoctorAppointments
