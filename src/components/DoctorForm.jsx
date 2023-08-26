/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { Button, Col, Form, Input, Row, TimePicker } from 'antd'
import * as Yup from 'yup'

import moment from 'moment'

function DoctorForm({ onFinish, initivalValues }) {
  return (
    <Form
      layout="vertical"
      onFinish={onFinish}
      initialValues={{
        ...initivalValues,
        ...(initivalValues && {
          timings: [
            moment(initivalValues?.timings[0], 'HH:mm'),
            moment(initivalValues?.timings[1], 'HH:mm'),
          ],
        }),
      }}
    >
      <h1 className="card-title mt-3">Informação Pessoal</h1>
      <Row gutter={20}>
        <Col span={8} xs={24} sm={24} lg={8}>
          <Form.Item
            required
            label="Nome"
            name="firstName"
            rules={[{ required: true }]}
          >
            <Input placeholder="Nome" />
          </Form.Item>
        </Col>
        <Col span={8} xs={24} sm={24} lg={8}>
          <Form.Item
            required
            label="Sobrenome"
            name="lastName"
            rules={[{ required: true }]}
          >
            <Input placeholder="Sobrenome" />
          </Form.Item>
        </Col>
        <Col span={8} xs={24} sm={24} lg={8}>
          <Form.Item
            required
            label="Celular/Whatsaap"
            name="phoneNumber"
            rules={[
              { required: true },
              {
                validator: (_, value) => {
                  if (!value || /^\d+$/.test(value)) {
                    return Promise.resolve()
                  }
                  return Promise.reject(
                    new Error('Por favor entre com Celular/Whatsaap.'),
                  )
                },
              },
            ]}
          >
            <Input placeholder="Ex: 16123457898" type="tel" />
          </Form.Item>
        </Col>

        <Col span={8} xs={24} sm={24} lg={8}>
          <Form.Item
            required
            label="Instagram"
            name="website"
            rules={[{ required: true }]}
          >
            <Input placeholder="Ex: @seunome" />
          </Form.Item>
        </Col>
        <Col span={8} xs={24} sm={24} lg={8}>
          <Form.Item
            required
            label="Endereço"
            name="address"
            rules={[{ required: true }]}
          >
            <Input placeholder="Endereço" />
          </Form.Item>
        </Col>
      </Row>
      <hr />
      <h1 className="card-title mt-3">Informação Profissional</h1>
      <Row gutter={20}>
        <Col span={8} xs={24} sm={24} lg={8}>
          <Form.Item
            required
            label="Especialidade"
            name="specialization"
            rules={[{ required: true }]}
          >
            <Input placeholder="Specialization" />
          </Form.Item>
        </Col>
        <Col span={8} xs={24} sm={24} lg={8}>
          <Form.Item
            required
            label="Experiência"
            name="experience"
            rules={[{ required: true }]}
          >
            <Input placeholder="Experience" type="number" />
          </Form.Item>
        </Col>
        <Col span={8} xs={24} sm={24} lg={8}>
          <Form.Item
            required
            label="Valor do Corte"
            name="feePerCunsultation"
            rules={[{ required: true }]}
          >
            <Input placeholder="Valor do Corte" type="number" />
          </Form.Item>
        </Col>
        <Col span={8} xs={24} sm={24} lg={8}>
          <Form.Item
            required
            label="Horário"
            name="timings"
            rules={[{ required: true }]}
          >
            <TimePicker.RangePicker format="HH:mm" />
          </Form.Item>
        </Col>
      </Row>

      <div className="d-flex justify-content-end">
        <Button className="primary-button" htmlType="submit">
          Enviar
        </Button>
      </div>
    </Form>
  )
}

export default DoctorForm
