import { FaSearch } from "react-icons/fa";
import './SearchBar.css';
import { useDispatch } from "react-redux";
import { useState } from "react";
import { NavLink } from 'react-router-dom'
import { getCountries, getCountriesByName } from "../../redux/slices/countriesSlice";

const SearchBar = ({setCurrentPage, setNumberPage}) => {
    const dispatch = useDispatch();
    const [input, setInput] = useState('');

    const handleSearch = () => {
        if(input.length > 0) {
            dispatch(getCountriesByName(input));
            setCurrentPage(0)
            setNumberPage(1)
        }
    }
    const handleReload = () => {
        dispatch(getCountries());
        setCurrentPage(0)
        setNumberPage(1)
    }

    return (
        <div className="search_bar">
            <FaSearch className="search_icon"/>
            <input type="text" onChange={(event)=> setInput(event.target.value)} value={input} className="input_search" placeholder="Nombre de un país"></input>
            <button onClick={handleSearch} className="search_button">Buscar</button>
            <button onClick={handleReload} className="reload">Restablecer</button>
            <NavLink to='/activity' className='link_activity'>
                <button className="create_activity">Crear actividad</button>
            </NavLink>
        </div>
    )
}
export default SearchBar;