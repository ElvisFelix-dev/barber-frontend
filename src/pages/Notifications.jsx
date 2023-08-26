/* eslint-disable react/jsx-key */
import { Tabs } from "antd";
import api from "../service/api";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Layout from "../components/Layout";
import { hideLoading, showLoading } from "../redux/alertsSlice";
import { setUser } from "../redux/userSlice";

function Notifications() {
  const {user} = useSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const markAllAsSeen=async()=>{
    try {
        dispatch(showLoading());
        const response = await api.post("/api/user/mark-all-notifications-as-seen", {userId : user._id} , {
            headers: {
                Authorization : `Bearer ${localStorage.getItem("token")}`
            }
        });
        dispatch(hideLoading());
        if (response.data.success) {
          toast.success(response.data.message)
          dispatch(setUser(response.data.data));
        } else {
          toast.error(response.data.message);
        }
      } catch (error) {
        dispatch(hideLoading());
        toast.error("Algo deu Errado");
      }
  }

  const deleteAll=async()=>{
    try {
        dispatch(showLoading());
        const response = await api.post("/api/user/delete-all-notifications", {userId : user._id} , {
            headers: {
                Authorization : `Bearer ${localStorage.getItem("token")}`
            }
        });
        dispatch(hideLoading());
        if (response.data.success) {
          toast.success(response.data.message)
          dispatch(setUser(response.data.data));
        } else {
          toast.error(response.data.message);
        }
      } catch (error) {
        dispatch(hideLoading());
        toast.error("Algo deu Errado");
      }
  }
  return (
    <Layout>
      <h1 className="page-title">Notificações</h1>
      <hr />

      <Tabs>
        <Tabs.TabPane tab="Não Lidas" key={0}>
          <div className="d-flex justify-content-end">
            <h1 className="anchor" onClick={()=>markAllAsSeen()}>Marcar como lidas</h1>
          </div>

          {user?.unseenNotifications.map((notification) => (
            <div className="card p-2 mt-2" onClick={()=>navigate(notification.onClickPath)}>
                <div className="card-text">{notification.message}</div>
            </div>
          ))}
        </Tabs.TabPane>
        <Tabs.TabPane tab="Lidas" key={1}>
          <div className="d-flex justify-content-end">
            <h1 className="anchor" onClick={()=>deleteAll()}>Deletar todas</h1>
          </div>
          {user?.seenNotifications.map((notification) => (
            <div className="card p-2 mt-2" onClick={()=>navigate(notification.onClickPath)}>
                <div className="card-text">{notification.message}</div>
            </div>
          ))}
        </Tabs.TabPane>
      </Tabs>
    </Layout>
  );
}

export default Notifications;
