import { Button, Form, Input, Row, Col } from "antd";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import api from "../service/api";
import { hideLoading, showLoading } from "../redux/alertsSlice";

import imgLogo from '../assets/imgLogo.png'

function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const onFinish = async (values) => {
    try {
      dispatch(showLoading());
      const response = await api.post("/api/user/login", values);
      dispatch(hideLoading());
      if (response.data.success) {
        toast.success(response.data.message);
        localStorage.setItem("token", response.data.data);
        navigate("/");
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      dispatch(hideLoading());
      toast.error("Algo deu Errado");
    }
  };

  return (
    <div className="authentication">
      <div className="authentication-form card p-3">
      <div>
          <Row justify="center">
            <Col>
              <img className="logo" src={imgLogo} alt="Logo" style={{ marginBottom: '20px' }}/>
            </Col>
            </Row>
        </div>
        <h1 className="card-title">Welcome Back</h1>
        <Form layout="vertical" onFinish={onFinish}>
          <Form.Item label="Email" name="email">
            <Input placeholder="Email" />
          </Form.Item>
          <Form.Item label="Password" name="password">
            <Input placeholder="Password" type="password" />
          </Form.Item>

          
          <Button className="primary-button my-2 full-width-button" htmlType="submit">
            LOGIN
          </Button>

          <Link to="/register" className="anchor mt-2" style={{ textDecoration: 'none' }}>
            CLICK HERE TO REGISTER
          </Link>
         
        </Form>
      </div>
    </div>
  );
}

export default Login;
