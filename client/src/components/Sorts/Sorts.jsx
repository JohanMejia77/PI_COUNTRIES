import { useDispatch } from "react-redux";
import { sortName, sortPopulation } from "../../redux/slices/countriesSlice";
import './Sorts.css'

const Sorts = ({setCurrentPage, setNumberPage}) => {
    const dispatch = useDispatch();

    const handleSortName = (event) => {
        dispatch(sortName(event.target.value));
        setCurrentPage(0)
        setNumberPage(1)
    }
    const handlePopulation = (event) => {
        dispatch(sortPopulation(event.target.value));
        setCurrentPage(0)
        setNumberPage(1)
    }
    return (
        <div className="sorts">
            <div className="sort_option">
                <label htmlFor="name" className="sort_label">Ordenar por nombre</label>
                <select name="name" id='alphabetic' onChange={handleSortName}>
                    <option value="(A-Z)">(A-Z)</option>
                    <option value="(Z-A)">(Z-A)</option>
                </select>
            </div>
            <div className="sort_option">
                <label htmlFor="population" className="sort_label">Población</label>
                <select name="population" id='population' onChange={handlePopulation}>
                    <option value='-' defaultChecked>-</option>
                    <option value="Más alta">Más alta</option>
                    <option value="Más baja">Más baja</option>
                </select>
            </div>
        </div>
    )
}
export default Sorts;