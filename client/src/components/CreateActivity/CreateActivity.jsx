import './CreateActivity.css'
import { getAllCountries, getCountries, getActivities } from '../../redux/slices/countriesSlice';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import {NavLink, useNavigate} from 'react-router-dom'
import Loading from "../Loading/Loading";
import './CreateActivity.css'
import axios from 'axios';

const CreateActivity = () => {
    const API = "http://localhost:3001/activity"
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const {allCountries} = useSelector(state => state.countries)
    const [showLoading, setShowLoading] = useState(false);
    const [formErrors, setFormErrors] = useState({});
    const [form, setForm] = useState({
        name: '',
        difficult: '',
        duration: '',
        season: 'Todo el año',
        countries: [],
    })
    useEffect(() => {
        let isMounted = true;
        if(isMounted) {
            dispatch(getAllCountries())
            validateForm();
        }
        return () => {
            isMounted = false;
          };
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [form]);
    
    const validateForm = () => {
        const errors = {};
      
        if (!/^[A-Za-z\s]{5,35}$/.test(form.name))  {
          errors.name = 'Ingrese una actividad válida';
        }
      
        const difficult = parseInt(form.difficult);
        if (isNaN(difficult) || difficult < 1 || difficult > 5) {
          errors.difficult = 'Ingrese un número del 1 al 5';
        }
      
        const duration = parseInt(form.duration);
        if (isNaN(duration) || duration < 1 || duration > 8) {
          errors.duration = 'Ingrese un número de horas válido';
        }
      
        if (!form.countries.length) {
          errors.countries = 'Seleccione al menos un país';
        }
      
        setFormErrors(errors);
    };      
    const handleInput = (event) => {
        const { name, value } = event.target;
        
        if (name === 'difficult' && parseInt(value) > 5) {
          event.target.value = '5';
        } 
        else if (name === 'difficult' && parseInt(value) < 1) {
            event.target.value = '1';
          } 
        else if (name === 'duration' && parseInt(value) > 8) {
          event.target.value = '8';
        }
        else if (name === 'duration' && parseInt(value) < 1) {
            event.target.value = '1';
        }
        
        setForm({
          ...form,
          [name]: event.target.value
        });
      }
      
    const handleCountries = (event) => {
        if(!form.countries.find(country => country === event.target.value) && event.target.value !== "Elija los paises") {
            setForm({
                ...form,
                countries: [...form.countries, event.target.value]
            })
        }
    }
    const handleDelete = (event) => {
        event.preventDefault();
        setForm({
          ...form,
          countries: form.countries.filter(
            (country) => country !== event.target.value
          ),
        });
    };
    const handleSubmit = async (event) => {
        event.preventDefault();
        if (formErrors.name || formErrors.difficult || formErrors.duration || formErrors.countries){
            setFormErrors({
                ...formErrors,
                submit: 'El formulario no es válido'
            })
        }
        else{
            setShowLoading(true);
            try {
                await new Promise((resolve) => setTimeout(resolve, 1000));
                await axios.post(API, form);
                navigate("/success");
                dispatch(getCountries())
                dispatch(getActivities());
            } catch (error) {
                navigate("/error");
            } finally {
                setShowLoading(false);
            }
        }   
    }
    return (
        <>  
        {showLoading ? ( // Mostrar el componente Loading si showLoading es true
        <Loading />
        ) : (
            <div className='activity_container'>
            <NavLink className='close_form' to='/home'>Cerrar</NavLink>
            <form className='activity_form'>
                <h2 className='text_center'>Crear Actividad</h2>

                <label htmlFor="name">Nombre</label>
                <input type='text' id='name'className='input_activity' onChange={handleInput} name='name'></input>
                {formErrors.name && <p className="error_message">{formErrors.name}</p>}

                <label htmlFor="difficult">Dificultad</label>
                <input type="number" className='input_activity' id='difficult' onChange={handleInput} name='difficult'/>
                {formErrors.difficult && <p className="error_message">{formErrors.difficult}</p>}

                <label htmlFor="duration">Duración</label>
                <input type="number" className='input_activity' id='duration' onChange={handleInput} name='duration'/>
                {formErrors.duration && <p className="error_message">{formErrors.duration}</p>}

                <label htmlFor="season">Temporada</label>
                <select name="season" className='select_season' id='season' onChange={handleInput}>
                    <option value="Todo el año" defaultValue='true'>Todo el año</option>
                    <option value='Primavera'>Primavera</option>
                    <option value="Verano">Verano</option>
                    <option value="Otoño">Otoño</option>
                    <option value="Invierno">Invierno</option>
                </select>
                <h3 className='text_center'>Seleccione los paises</h3>
                <select name="countries" className='select_country_activity' onChange={handleCountries}>
                    <option value='Elija los paises'>--Elija los paises--</option>
                    {allCountries.map(country => {
                        return(
                            <option value={country.id} key={country.id}>{country.name}</option>
                        )
                    })}
                </select>
                {formErrors.countries && <p className="error_message">{formErrors.countries}</p>}
                {form.countries.length ? 
                <div className='countries_state'>
                {form.countries.map((country, i) => (
                <span key={i}value={country} className='country_state'>
                  {country}
                  <button
                    onClick={handleDelete}
                    value={country}
                    className='close_country'
                  >
                    x
                  </button>
                </span>
                ))}
                </div>
                : null}
                <button className='btn_activity' onClick={handleSubmit}>Crear actividad</button>
                {formErrors.submit && <p className="error_submit">{formErrors.submit}</p>}
            </form>
        </div>
        )}
        </>
    )
}
export default CreateActivity;