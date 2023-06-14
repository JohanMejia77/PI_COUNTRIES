import { getCountries, getActivities } from '../../redux/slices/countriesSlice';
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from 'react-redux'
import './ContainerCountries.css'
import Country from "../Country/Country";
import SearchBar from '../SearchBar/SearchBar';
import Loading from '../Loading/Loading';
import Filters from '../Filters/Filters';
import Sorts from '../Sorts/Sorts';
import Error from '../Error/Error';

const ContainerCountries = () => {
    const [currentPage, setCurrentPage] = useState(0);
    const [numberPage, setNumberPage] = useState(1);
    const dispatch = useDispatch();
    const {filtered} = useSelector((state) => state.countries);
    const {countries} = useSelector((state) => state.countries);
    const loading = useSelector((state) => state.countries.loading);
    const error = useSelector((state) => state.countries.error);
    const endIndex = currentPage + 10;

    const filteredCountries = () => {
        return filtered.slice(currentPage, currentPage + 10)
    }

    const nextPage = () => {
        if (endIndex < filtered.length) {
            setNumberPage(numberPage + 1);
            setCurrentPage(currentPage + 10);
        }
    };
    const previusPage = () => {
        if(currentPage > 0) {
            setNumberPage(numberPage - 1);
            setCurrentPage(currentPage - 10);
        }
    }

    useEffect(() => {
        if (!filtered[0]) {
            dispatch(getCountries());
            dispatch(getActivities());
        }
    }, [dispatch, filtered, countries]);

    if (loading) {
        return (
            <Loading/>
        )
    }
    
    if (error) {
        return (
            <Error/>
        )
    }
    return (
        <div>
            <div className='options'>
                <SearchBar 
                setCurrentPage={setCurrentPage}
                setNumberPage={setNumberPage}/>
                <Filters
                setCurrentPage={setCurrentPage}
                setNumberPage={setNumberPage}/>
                <Sorts
                setCurrentPage={setCurrentPage}
                setNumberPage={setNumberPage}/>
            </div>
            <div className='containerCountries'>
            {filteredCountries().map((country) => (
                <Country
                key={country.id}
                id={country.id}
                flag={country.image}
                name={country.name}
                continent={country.continent}
                />
          ))}
            </div>
            <div className='pages'>
                <p className='page'>{numberPage}</p>
                <div className='buttons'>
                {currentPage > 0 ? <button className='btn' onClick={previusPage}>Anteriores</button> : null}
                {endIndex < filtered.length ? <button className='btn' onClick={nextPage}>Siguientes</button> : null}
                </div>
            </div>
        </div>
    );
}
export default ContainerCountries;