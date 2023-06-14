import axios from "axios";
import { useEffect, useState } from "react";
import { NavLink, useParams, useNavigate } from 'react-router-dom';
import './Detail.css'
import Loading from "../Loading/Loading";
import { countryNotFound } from '../../redux/utils/countryNotFound';

const Detail = () => {
  const [country, setCountry] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const { id } = useParams();
  const navigate = useNavigate();
  
  useEffect(() => {
    let isMounted = true;
    const getCountry = () => {
      if (id === 'UKN') {
        setTimeout(() => {
          if (isMounted) {
            setCountry(countryNotFound[0]);
            setIsLoading(false);
          }
        }, 1000);
      } else {
        axios.get(`http://localhost:3001/countries/${id}`)
          .then(res => {
            setTimeout(() => {
              if (isMounted) {
                setCountry(res.data);
                setIsLoading(false);
              }
            }, 200);
          });
      }
    };
    getCountry();

    return () => {
        isMounted = false;
    };
  }, [id, country]);

  const handleDelete = (event) => {
    const infoActivity = event.target.value.split(',')
    try {
      const body = {
        activityId: infoActivity[0],
        countryId: infoActivity[1],
      }
      axios.delete('http://localhost:3001/activity/', { data: body })
    } catch (error) {
      navigate('/error');
    }
  }     
  return (
      <div className="detail">
          {isLoading ? (
              <Loading/>
          ) : (
              <div className="detail_container">
                  <img src={country.image} alt={country.name} className="flag_detail"/>
                  <div className="data_container">
                      <h3>{country.name} <span>({country.id})</span></h3>
                      
                      <h4 className="countryData">Capital: {country.capital}</h4>
                      <h4 className="countryData">Población: {country.population}</h4>
                      <h4 className="countryData">Subregión: {country.subregion}</h4>
                      <h4 className="countryData">Área: {country.area} km²</h4>
                      <h4 className="countryData">Continente: {country.continent}</h4>
                      <NavLink to='/home' className='btnClose'>
                          Cerrar
                      </NavLink>
                  </div>
                  {id !== 'UKN' ?
                  <div className="activities">
                  <h3 className="title_activities">Actividades</h3>
                    <div className="activity_item">
                    {!country.activities.length ?
                    <p>No tiene actividades</p>
                    : country.activities.map(activity => {
                      return (
                        <div className="activity_items" key={activity.id}>
                          <button
                          onClick={handleDelete}
                          value={[activity.id, country.id]}
                          className='close_activity'
                          >
                          Eliminar
                          </button>
                          <p key={activity.id}><span>Nombre:</span> {activity.name}</p>
                          <p><span>Dificultad:</span> {activity.difficult}/5</p>
                          <p><span>Duración en horas:</span> {activity.duration}</p>
                          <p><span>Estación:</span> {activity.season}</p>
                        </div>
                      )
                    })
                    }
                    </div>
                  </div>
                  : null
                  }
                  
              </div>
          )}
      </div>
  );
};
export default Detail;