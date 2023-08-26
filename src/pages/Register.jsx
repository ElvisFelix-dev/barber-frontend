import { Button, Form, Input, Row, Col } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import api from "../service/api";
import toast from "react-hot-toast";
import { hideLoading, showLoading } from "../redux/alertsSlice";

import imgLogo from '../assets/imgLogo.png'

function Register() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const onFinish = async (values) => {
    try {
      dispatch(showLoading());
      const response = await api.post("/api/user/register", values);
      dispatch(hideLoading());
      if (response.data.success) {
        toast.success(response.data.message);
        navigate("/login");
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
        <h1 className="card-title">Nice To Meet U</h1>
        <Form layout="vertical" onFinish={onFinish}>
          <Form.Item label="Name" name="name">
            <Input placeholder="Name" />
          </Form.Item>
          <Form.Item label="Email" name="email">
            <Input placeholder="Email" />
          </Form.Item>
          <Form.Item label="Password" name="password">
            <Input placeholder="Password" type="password" />
          </Form.Item>

          <Button
            className="primary-button my-2 full-width-button"
            htmlType="submit"
          >
            REGISTER
          </Button>

          <Link to="/login" className="anchor mt-2" style={{ textDecoration: 'none' }}>
            CLICK HERE TO LOGIN
          </Link>
        </Form>
      </div>
    </div>
  );
}

export default Register;
