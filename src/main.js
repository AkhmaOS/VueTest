import {createApp} from 'vue'
import {createStore} from 'vuex'
import axios from 'axios'
import App from './App.vue'

const appId = '886705b4c1182eb1c69f28eb8c520e20'
const baseUrl = 'http://api.openweathermap.org/data/2.5/weather?'

const store = createStore({
    state: {
        weather: null,
    },
    actions: {
        fetchWeatherByCity: async ({commit}, city) => {
            try {
                const {data} = await axios.get(`${baseUrl}appid=${appId}&q=${city}`)
                commit('setWeather', data)
            } catch (e) {
                commit('setWeather', null)
            }
        },
        fetchWeatherByCoords: async ({commit}, coords) => {
            try {
                const {data} = await axios.get(`${baseUrl}appid=${appId}&lat=${coords.lat}&lon=${coords.lon}`)
                commit('setWeather', data)
            } catch (e) {
                commit('setWeather', null)
            }
        }
    },
    mutations: {
        setWeather: (state, weather) => {
            state.weather = weather
        }
    },
    getters:{
        cityName(s){
            return s.weather ? s.weather.name : ''
        },
        countryCode(s){
            return s.weather ? s.weather.sys.country : ''
        }
    }
})

createApp(App).use(store).mount('#app')
