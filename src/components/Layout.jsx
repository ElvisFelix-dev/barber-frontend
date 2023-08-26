/* eslint-disable react/jsx-key */
/* eslint-disable react/prop-types */
import { useState } from 'react'
import '../layout.css'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { Badge, Row, Col, Avatar } from 'antd'
import { UserOutlined } from '@ant-design/icons'

import cleberLogo from '../assets/cleberLogo.jpg'

function Layout({ children }) {
  const [collapsed, setCollapsed] = useState(false)
  const { user } = useSelector((state) => state.user)

  const navigate = useNavigate()
  const location = useLocation()

  const userMenu = [
    {
      name: 'Home',
      path: '/',
      icon: 'ri-home-line',
    },
    {
      name: 'Agendamentos',
      path: '/appointments',
      icon: 'ri-file-list-line',
    },
  ]

  const doctorMenu = [
    {
      name: 'Home',
      path: '/',
      icon: 'ri-home-line',
    },
    {
      name: 'Agendamentos',
      path: '/barber/appointments',
      icon: 'ri-file-list-line',
    },
    {
      name: 'Perfil',
      path: `/barber/profile/${user?._id}`,
      icon: 'ri-user-line',
    },
  ]

  const adminMenu = [
    {
      name: 'Home',
      path: '/',
      icon: 'ri-home-line',
    },
    {
      name: 'Usuários',
      path: '/admin/userslist',
      icon: 'ri-user-line',
    },
    {
      name: 'Barbers',
      path: '/admin/doctorslist',
      icon: 'ri-user-star-line',
    },
    {
      name: 'Perfil',
      path: '/profile',
      icon: 'ri-user-line',
    },
  ]

  const menuToBeRendered = user?.isAdmin
    ? adminMenu
    : user?.isDoctor
    ? doctorMenu
    : userMenu
  const role = user?.isAdmin ? 'Admin' : user?.isDoctor ? 'Barbeiro' : 'Cliente'
  return (
    <div className="main">
      <div className="d-flex layout">
        <div className="sidebar">
          <Row
            justify="center"
            align="middle"
            style={{ height: '30px', marginTop: '30px' }}
          >
            <Col
              span={24}
              className="sidebar-header"
              style={{ textAlign: 'center' }}
            >
              <img src={cleberLogo} className="logo" alt="Logo" />
              <h1 className="role" style={{ marginTop: '10px' }}>
                {role}
              </h1>
            </Col>
          </Row>

          <div className="menu">
            {menuToBeRendered.map((menu) => {
              const isActive = location.pathname === menu.path
              return (
                <div
                  className={`d-flex menu-item ${
                    isActive && 'active-menu-item'
                  }`}
                >
                  <i className={menu.icon}></i>
                  {!collapsed && <Link to={menu.path}>{menu.name}</Link>}
                </div>
              )
            })}
            <div
              className={`d-flex menu-item `}
              onClick={() => {
                localStorage.clear()
                navigate('/login')
              }}
            >
              <i className="ri-logout-circle-line"></i>
              {!collapsed && <Link to="/login">Sair</Link>}
            </div>
          </div>
        </div>

        <div className="content">
          <div className="header">
            {collapsed ? (
              <i
                className="ri-menu-2-fill header-action-icon"
                onClick={() => setCollapsed(false)}
              ></i>
            ) : (
              <i
                className="ri-close-fill header-action-icon"
                onClick={() => setCollapsed(true)}
              ></i>
            )}

            <div className="d-flex align-items-center px-4">
              <Badge
                count={user?.unseenNotifications?.length || 0} // Certifica-se de que seja um número válido
                onClick={() => {
                  navigate('/notifications')
                }}
                className="badge-container"
              >
                <Avatar
                  icon={<UserOutlined />}
                  className="header-action-icon-avatar"
                  style={{ backgroundColor: '#87d068' }}
                />
              </Badge>

              <Link
                className="anchor mx-2"
                to="/profile"
                style={{ textDecoration: 'none' }}
              >
                {user?.name}
              </Link>
            </div>
          </div>

          <div className="body">{children}</div>
        </div>
      </div>
    </div>
  )
}

export default Layout
