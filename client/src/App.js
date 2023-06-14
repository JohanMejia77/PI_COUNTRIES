import './App.css';
import { Routes, Route } from 'react-router-dom';
import Landing  from './components/Landing/Landing';
import ContainerCountries from './components/ContainerCountries/ContainerCountries';
import Detail from './components/Detail/Detail';
import CreateActivity from './components/CreateActivity/CreateActivity';
import ActivitySuccess from './components/ActivitySuccess/ActivitySuccess';
import Error from './components/Error/Error';
import NotFound from './components/NotFound/NotFound';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<Landing/>}/>
        <Route path='/home' element={<ContainerCountries/>}/>
        <Route path='/home/:id' element={<Detail/>}/>
        <Route path='/activity' element={<CreateActivity/>}/>
        <Route path='/success' element={<ActivitySuccess/>}/>
        <Route path='/error' element={<Error/>}/>
        <Route path='*' element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
