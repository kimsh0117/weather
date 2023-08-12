import axios from 'axios'
import { WEATHER_API_URL} from "@/constants";

export const weatherApi = axios.create({
  baseURL: WEATHER_API_URL,
})