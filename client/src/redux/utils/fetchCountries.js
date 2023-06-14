import axios from "axios";
import { delay } from "./delay";
const API_COUNTRIES = 'http://localhost:3001/countries';


export const fetchCountries = async (input) => {
    try {
        if(!input){
            const response = await axios.get(API_COUNTRIES);
            const responseOrdered = response.data.sort((a, b) => a.name.localeCompare(b.name))
            await delay(1000);
            return responseOrdered;
        }
        const response = await axios.get(`${API_COUNTRIES}?name=${input}`);
        const responseOrdered = response.data.sort((a, b) => a.name.localeCompare(b.name))
        await delay(1000);
        return responseOrdered;
    } catch (error) {
        if (error.response.status === 404) {
            return [];
        }
    }
};