import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { countryNotFound } from '../utils/countryNotFound';
import { delay } from '../utils/delay';
import { fetchCountries } from "../utils/fetchCountries";
import { fetchActivities } from "../utils/fetchActivities";

export const getAllCountries = createAsyncThunk('countries/getAllCountries', async () => {
    const countries = await fetchCountries();
    await delay(1000);
    return countries;
});
export const getCountries = createAsyncThunk('countries/getCountries', async () => {
    const countries = await fetchCountries();
    await delay(500);
    return countries;
});
export const getCountriesByName = createAsyncThunk('countries/getCountriesByName', async (input) => {
    const countries = await fetchCountries(input);
    await delay(500);
    return countries;
  });
export const getActivities = createAsyncThunk('activities/getActivities', async () => {
    const activities = await fetchActivities();
    return activities;
})
const initialState = {
    allCountries: [],
    countries: [],
    filtered: [],
    activities: [],
    loading: false,
    error: null,
};

export const countriesSlice = createSlice({
    name: "countries",
    initialState,
    reducers: {
        filterContinent: (state, action) => {
            const filtered = state.countries.filter(country => country.continent === action.payload)
            document.getElementById('activities').value = 'Todas';
            if(action.payload === 'Todos'){
                state.filtered = state.countries;
            }
            else{
                state.filtered = filtered
            }
        },
        filterActivity: (state, action) => {
            const filtered = state.countries.filter(country => {
                return country.activities.some(activity => activity.name === action.payload);
            });
            document.getElementById('continents').value = 'Todos';
            if(action.payload === 'Todas'){
                state.filtered = state.countries;
            }
            else{
                state.filtered = filtered;
            }
        },
        sortName: (state, action) => {
            if(action.payload === '(Z-A)'){
                document.getElementById('population').value = '-';
                const stateFiltered = [...state.filtered];
                const filtered = stateFiltered.sort((a, b) => b.name.localeCompare(a.name));
                state.filtered = filtered;
            }
            else if (action.payload === '(A-Z)') {
                document.getElementById('population').value = '-';
                state.filtered = state.filtered.sort((a, b) => a.name.localeCompare(b.name));
            }
        },
        sortPopulation: (state, action) => {
            if(action.payload === 'Más alta'){
                state.filtered = state.filtered.sort((a, b) => b.population - a.population)
            }
            else if (action.payload === 'Más baja'){
                state.filtered = state.filtered.sort((a, b) => a.population - b.population)
            }
            else {
                const sortAlphabetic = document.getElementById('alphabetic').value;
                if(sortAlphabetic === '(A-Z)'){
                    state.filtered = state.filtered.sort((a, b) => a.name.localeCompare(b.name));
                }
                else {
                    state.filtered = state.filtered.sort((a, b) => b.name.localeCompare(a.name));
                }
            }
        },
    },
    extraReducers: (builder) => {
        builder
        .addCase(getAllCountries.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(getAllCountries.fulfilled, (state, action) => {
            state.allCountries = action.payload;
            state.loading = false;
            state.error = null;
        })
        .addCase(getAllCountries.rejected, (state) => {
            state.loading = false;
            state.error = true;
        })
        .addCase(getCountries.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(getCountries.fulfilled, (state, action) => {
            state.countries = [...action.payload];
            state.filtered = [...action.payload];
            const filteredActivities = state.countries.length && state.activities.length ? state.activities.filter(activity => {
                return state.countries.some(country => {
                  return country.activities.some(countryActivity => countryActivity.id === activity.id);
                });
            }) : [];
            state.activities = filteredActivities;
            state.loading = false;
            state.error = null;
        })
        .addCase(getCountries.rejected, (state) => {
          state.loading = false;
          state.error = true;
        })
        .addCase(getCountriesByName.pending, (state) => {
          state.loading = true;
          state.error = null;
        })
        .addCase(getCountriesByName.fulfilled, (state, action) =>{
            if(!action.payload.length){
                state.filtered = countryNotFound;
                state.countries = countryNotFound;
                state.loading = false;
            }
            else{
                state.countries = [...action.payload];
                state.filtered = [...action.payload];
                const filteredActivities = state.countries.length && state.activities.length ? state.activities.filter(activity => {
                    return state.countries.some(country => {
                      return country.activities.some(countryActivity => countryActivity.id === activity.id);
                    });
                }) : [];
                state.activities = filteredActivities;
                state.loading = false;
                state.error = null;
            }
        })
        .addCase(getCountriesByName.rejected, (state) => {
          state.loading = false;
          state.error = true;
        })
        .addCase(getActivities.pending, (state) => {
            state.error = null;
        })
        .addCase(getActivities.fulfilled, (state, action) => {
            state.activities = action.payload;
            state.error = null;
        })
        .addCase(getActivities.rejected, (state) => {
            state.error = true;
        })
      },
});

export default countriesSlice.reducer;
export const { filterContinent, filterActivity, sortName, sortPopulation } = countriesSlice.actions;