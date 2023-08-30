import { Button, Form, Input, Row, Col } from 'antd'
import { UserOutlined } from '@ant-design/icons'

import { toast } from 'react-toastify'
import { useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'

import * as yup from 'yup'

import api from '../service/api'
import { hideLoading, showLoading } from '../redux/alertsSlice'

import cleberLogo from '../assets/cleberLogo.jpg'

export default function ForgotPassword() {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const validationSchema = yup.object().shape({
    email: yup
      .string()
      .required('Por favor, insira seu email.')
      .email('Por favor, insira um email válido.')
      .test(
        'uppercase',
        'O email não deve conter letras maiúsculas.',
        (value) => {
          if (value) {
            return value === value.toLowerCase()
          }
          return true
        },
      ),
    // ... outras validações para outros campos
  })

  const onFinish = async (values) => {
    try {
      dispatch(showLoading())
      const response = await api.post('/api/user/forgot-password', values)
      dispatch(hideLoading())

      if (response.data.success) {
        toast.success(response.data.message)
        localStorage.setItem('token', response.data.data)
        navigate('/forgot-password')
      } else {
        toast.error(response.data.message)
      }
    } catch (error) {
      dispatch(hideLoading())
      console.error(error) // Melhore o tratamento de erro aqui
      toast.error('Algo deu Errado')
    }
  }

  return (
    <div className="authentication">
      <Helmet>
        <title>Cleber Mendes BarberShop | Conectar</title>
      </Helmet>
      <div className="authentication-form card p-3">
        <div>
          <Row justify="center">
            <Col>
              <img
                className="logo"
                src={cleberLogo}
                alt="Logo"
                style={{ marginBottom: '20px' }}
              />
            </Col>
          </Row>
        </div>
        <h1 className="card-title">Recuperar Senha</h1>
        <Form
          layout="vertical"
          onFinish={onFinish}
          validationSchema={validationSchema}
        >
          <Form.Item
            name="email"
            rules={[
              { required: true, message: 'Por favor, insira seu email.' },
              {
                type: 'email',
                message: 'Por favor, insira um email válido.',
              },
            ]}
          >
            <Input
              prefix={<UserOutlined />}
              placeholder="Seu melhor email"
              type="email"
            />
          </Form.Item>

          <Form.Item>
            <Button
              className="primary-button my-2 full-width-button"
              htmlType="submit"
            >
              Enviar email
            </Button>
            <span>
              Não tem uma conta?{' '}
              <Link to="/register">
                <a className="text-link">Criar Conta</a>
              </Link>
            </span>
            <p>
              Já tem uma conta?{' '}
              <Link to="/login">
                <a className="text-link">Conectar</a>
              </Link>
            </p>
          </Form.Item>
        </Form>
      </div>
    </div>
  )
}
