import { Button, Form, Input, Row, Col } from 'antd'
import { toast } from 'react-toastify'
import { useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import api from '../service/api'
import { hideLoading, showLoading } from '../redux/alertsSlice'

import imgLogo from '../assets/imgLogo.png'

function Login() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const onFinish = async (values) => {
    try {
      dispatch(showLoading())
      const response = await api.post('/api/user/login', values)
      dispatch(hideLoading())
      if (response.data.success) {
        toast.success(response.data.message)
        localStorage.setItem('token', response.data.data)
        navigate('/')
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
      <div className="authentication-form card p-3">
        <div>
          <Row justify="center">
            <Col>
              <img
                className="logo"
                src={imgLogo}
                alt="Logo"
                style={{ marginBottom: '20px' }}
              />
            </Col>
          </Row>
        </div>
        <h1 className="card-title">Seja Bem vindo</h1>
        <Form layout="vertical" onFinish={onFinish}>
          <Form.Item name="email">
            <Input placeholder="Seu melhor email" />
          </Form.Item>
          <Form.Item name="password">
            <Input placeholder="Senha" type="password" />
          </Form.Item>

          <Button
            className="primary-button my-2 full-width-button"
            htmlType="submit"
          >
            Conectar
          </Button>
          <span>
            Não tem uma conta?{' '}
            <Link to="/register">
              <a className="text-link">Criar Conta</a>
            </Link>
          </span>
        </Form>
      </div>
    </div>
  )
}

export default Login
