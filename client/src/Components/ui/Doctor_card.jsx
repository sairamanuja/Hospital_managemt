import PropTypes from 'prop-types'
import {  useNavigate } from 'react-router-dom'

const DoctorCard = ({ image, name, speciality, doctorId }) => {
 const navigate = useNavigate();
 console.log(doctorId)
  return (
    <div className=" rounded-lg p-4 shadow-lg w-[180px]" onClick={() => navigate(`/doctor/${doctorId}`)}>
      <div className="flex flex-col items-center">
        <div className="flex justify-center h-[100px]">
          <img 
            src={image} 
            alt={name} 
            className="w-20 h-20 rounded-full mr-4" 
          />
        </div>
        <div className='pb-1'>
          <p className="text-green-500">● Available</p>
          <h2 className="text-lg font-bold">{name}</h2>
          <p className="text-gray-600">{speciality}</p>
        </div>
      </div>
    </div>
  )
}

DoctorCard.propTypes = {
  image: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  speciality: PropTypes.string.isRequired,
  doctorId: PropTypes.string.isRequired,
}

export default DoctorCard
