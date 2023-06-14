import './NotFound.css';
import { NavLink } from 'react-router-dom';

const NotFound = () => {
    return (
        <div className="notFound">
            <h1>404</h1>
            <p>Not Found</p>
            <NavLink className='home' to='/home'>Regresar al inicio</NavLink>
        </div>
    )
}
export default NotFound;