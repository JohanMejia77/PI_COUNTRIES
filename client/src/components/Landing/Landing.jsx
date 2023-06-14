import './Landing.css'
import { NavLink } from 'react-router-dom';
const Landing = () => {
    return (
        <div className='landing'>
            <h1>Países del mundo</h1>
            <NavLink className='startBtn' to='/home'>Ingresar</NavLink>
        </div>
    )  
}
export default Landing;