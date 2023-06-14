import { useNavigate } from "react-router-dom"
import './Country.css'
const Country = ({id, flag, name, continent}) => {
    const navigate = useNavigate()
    const handleClick = () => {
        navigate(`/home/${id}`);
    }
    return (
        <div className='container' onClick={handleClick}>
            <img src={flag} alt={`Bandera de ${name}`} className="flag"/>
            <div className="data">
                <h3>{name}</h3>
                <h4>{continent}</h4>
            </div> 
        </div>
    )   
}
export default Country;