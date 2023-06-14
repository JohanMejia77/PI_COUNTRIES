import './ActivitySuccess.css'
import { NavLink } from 'react-router-dom';


const ActivitySuccess = () => {
    return (
        <div className="container_success">
            <h2>La actividad se creó correctamente</h2>
            <img src="https://cdn.pixabay.com/photo/2017/03/28/01/46/check-mark-2180770_1280.png" alt="success" />
            <div className='btn_container'>
                <NavLink className='btn_item' to='/home'>Inicio</NavLink>
                <NavLink className='btn_item' to='/activity'>Crear otra actividad</NavLink>
            </div>
        </div>
    )
}
export default ActivitySuccess;