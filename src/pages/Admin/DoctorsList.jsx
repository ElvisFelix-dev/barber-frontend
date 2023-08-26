/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import Layout from '../../components/Layout'
import { showLoading, hideLoading } from '../../redux/alertsSlice'
import { toast } from 'react-hot-toast'
import api from '../../service/api'
import { Table } from 'antd'
import moment from 'moment'

function DoctorsList() {
  const [doctors, setDoctors] = useState([])
  const dispatch = useDispatch()
  const getDoctorsData = async () => {
    try {
      dispatch(showLoading())
      const resposne = await api.get('/api/admin/get-all-doctors', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      })
      dispatch(hideLoading())
      if (resposne.data.success) {
        setDoctors(resposne.data.data)
      }
    } catch (error) {
      dispatch(hideLoading())
    }
  }

  const changeDoctorStatus = async (record, status) => {
    try {
      dispatch(showLoading())
      const resposne = await api.post(
        '/api/admin/change-doctor-account-status',
        { doctorId: record._id, userId: record.userId, status },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        },
      )
      dispatch(hideLoading())
      if (resposne.data.success) {
        toast.success(resposne.data.message)
        getDoctorsData()
      }
    } catch (error) {
      toast.error('Erro ao alterar o status da conta do barber')
      dispatch(hideLoading())
    }
  }
  useEffect(() => {
    getDoctorsData()
  }, [])
  const columns = [
    {
      title: 'Nome',
      dataIndex: 'name',
      render: (text, record) => (
        <span>
          {record.firstName} {record.lastName}
        </span>
      ),
    },
    {
      title: 'Celular/Whatsaap',
      dataIndex: 'phoneNumber',
    },
    {
      title: 'Created At',
      dataIndex: 'createdAt',
      render: (record, text) => moment(record.createdAt).format('DD-MM-YYYY'),
    },
    {
      title: 'status',
      dataIndex: 'status',
    },
    {
      title: 'Ações',
      dataIndex: 'actions',
      render: (text, record) => (
        <div className="d-flex">
          {record.status === 'pending' && (
            <h1
              className="anchor"
              onClick={() => changeDoctorStatus(record, 'approved')}
            >
              Aprovar
            </h1>
          )}
          {record.status === 'approved' && (
            <h1
              className="anchor"
              onClick={() => changeDoctorStatus(record, 'blocked')}
            >
              Bloquear
            </h1>
          )}
        </div>
      ),
    },
  ]
  return (
    <Layout>
      <h1 className="page-header">Lista de Barbers</h1>
      <hr />
      <Table columns={columns} dataSource={doctors} />
    </Layout>
  )
}

export default DoctorsList
