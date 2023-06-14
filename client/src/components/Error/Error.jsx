import './Error.css'
import { NavLink } from 'react-router-dom';

const Error = () => {
    return (
        <div className="container_error">
            <h2>Se ha producido un error</h2>
            <img src="https://cdn.pixabay.com/photo/2017/02/12/21/29/false-2061131_1280.png" alt="success" />
            <div className='btn_container'>
                <NavLink className='btn_item' to='/home'>Inicio</NavLink>
            </div>
        </div>
    )
}
export default Error;