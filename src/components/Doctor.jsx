/* eslint-disable react/prop-types */
import { useNavigate } from "react-router-dom";

function Doctor({ doctor }) {
  const navigate = useNavigate(); 

  const formattedPrice = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(doctor.feePerCunsultation);


  return (
    <div
      className="card p-2 cursor-pointer"
      onClick={() => navigate(`/book-appointment/${doctor._id}`)}
    >
      <h1 className="card-title">
        {doctor.firstName} {doctor.lastName}
      </h1>
      <hr />
      <p>
        <b>Celular/Whatsaap : </b>
        {doctor.phoneNumber}
      </p>
      <p>
        <b>Endereço : </b>
        {doctor.address}
      </p>
      <p>
        <b>Valor do Corte : </b>
        {formattedPrice}
      </p>
      <p>
        <b>Horário : </b>
        {doctor.timings[0]} - {doctor.timings[1]}
      </p>
    </div>
  );
}

export default Doctor;
