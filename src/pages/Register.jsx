import { Button, Form, Input, Row, Col } from 'antd'
import {
  UserOutlined,
  LockOutlined,
  SmileOutlined,
  EyeInvisibleOutlined,
  EyeTwoTone,
} from '@ant-design/icons'

import { Link, useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { Helmet } from 'react-helmet-async'

import api from '../service/api'
import { toast } from 'react-toastify'
import { hideLoading, showLoading } from '../redux/alertsSlice'

import cleberLogo from '../assets/cleberLogo.jpg'

function Register() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const onFinish = async (values) => {
    try {
      dispatch(showLoading())
      const response = await api.post('/api/user/register', values)
      dispatch(hideLoading())
      if (response.data.success) {
        toast.success(response.data.message)
        navigate('/login')
      } else {
        toast.error(response.data.message)
      }
    } catch (error) {
      dispatch(hideLoading())
      toast.error('Algo deu Errado')
    }
  }

  return (
    <div className="authentication">
      <Helmet>
        <title>Cleber Mendes BarberShop | Cadastrar</title>
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

        <h1 className="card-title">Fazer Cadastro</h1>
        <Form layout="vertical" onFinish={onFinish}>
          <Form.Item
            name="name"
            rules={[{ required: true, message: 'Por favor, insira seu nome!' }]}
          >
            <Input prefix={<SmileOutlined />} placeholder="Seu nome" />
          </Form.Item>
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
            <Input prefix={<UserOutlined />} placeholder="Seu melhor email" />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[
              { required: true, message: 'Por favor, insira sua senha.' },
            ]}
          >
            <Input.Password
              prefix={<LockOutlined />}
              iconRender={(visible) =>
                visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
              }
              placeholder="Senha"
            />
          </Form.Item>

          <Button
            className="secundary-button my-2 full-width-button"
            htmlType="submit"
          >
            Cadastrar
          </Button>

          <span>
            Já tem uma conta?{' '}
            <Link to="/login">
              <a className="text-link-2">Criar Conta</a>
            </Link>
          </span>
        </Form>
      </div>
    </div>
  )
}

export default Register
