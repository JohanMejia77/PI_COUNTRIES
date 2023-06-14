import { filterContinent, filterActivity } from "../../redux/slices/countriesSlice";
import { useDispatch, useSelector } from "react-redux";
import './Filters.css'

const Filters = ({ setCurrentPage, setNumberPage }) => {
const dispatch = useDispatch();
const { countries, activities } = useSelector(state => state.countries);


const handleContinent = (event) => {
  dispatch(filterContinent(event.target.value));
  setCurrentPage(0);
  setNumberPage(1);
};

const handleActivity = (event) => {
  dispatch(filterActivity(event.target.value));
  setCurrentPage(0);
  setNumberPage(1);
};

const continents = countries.reduce((arr, country) => {
      if (!arr.find(item => item.continent === country.continent)) {
      arr.push(country);
      }
      return arr;
}, []);

return (
  <div className="filters">
    <div className="filters_option">
      <label htmlFor="continents" className="filters_label">Continentes</label>
      <select name="continents" id="continents" onChange={handleContinent}>
        <option value="Todos">Todos</option>
        {
          continents.map(country => (
            <option value={country.continent} key={country.id}>{country.continent}</option>
          ))
        }
      </select>
    </div>
    <div className="filters_option">
      <label htmlFor="activities" className="filters_label">Actividades</label>
      <select name="activities" id="activities" onChange={handleActivity} className="select_activities">
        {!activities.length ?
          <option>Sin actividades</option>
          : <>
            <option value="Todas" key="0">Todas</option>
            {
              activities.map(activity => (
                <option key={activity.id} value={activity.name}>{activity.name}</option>
              ))
            }
          </>
        }
      </select>
    </div>
  </div>
);
}
export default Filters;;