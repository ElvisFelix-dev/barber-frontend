/* eslint-disable react/prop-types */
import { useNavigate } from 'react-router-dom'

function Doctor({ doctor }) {
  const navigate = useNavigate()

  const formattedPrice = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(doctor.feePerCunsultation)

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
        <a
          className="link-social"
          href={`https://wa.me/55${doctor.phoneNumber}`}
          target="_blank"
          rel="noreferrer"
        >
          {doctor.phoneNumber}
        </a>
      </p>
      <p>
        <b>Endereço : </b>
        {doctor.address}
      </p>
      <p>
        <b>Instagram : </b>
        <a
          className="link-social"
          href={`http://www.instagram.com/${doctor.website}`}
          target="_blank"
          rel="noreferrer"
        >
          {doctor.website}
        </a>
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
  )
}

export default Doctor
