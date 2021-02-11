<template>
  <div>
    <input class="city" placeholder="Enter city" v-model="citySearch" type="text">
    <h4>{{ countryCode }} {{ cityName }}</h4>
    <table style="width:100%">
      <tr style="text-align: left">
        <th>Средняя температура</th>
        <th>Скорость ветра</th>
        <th>Описание</th>
        <th>Давление</th>
      </tr>
      <tr v-if="$store.state.weather">
        <td>{{ $store.state.weather.main.temp }}</td>
        <td>{{ $store.state.weather.wind.speed }}</td>
        <td>{{ $store.state.weather.weather[0].description }}</td>
        <td>{{ $store.state.weather.main.pressure }}</td>
      </tr>
    </table>
  </div>
</template>

<script>
import './styles/scss/main.scss'
import {ref} from 'vue'
import {mapGetters} from 'vuex'

export default {
  name: 'App',
  setup(){
    const citySearch = ref('')

    return {
      citySearch
    }
  },
  mounted() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((pos) => {
        this.$store.dispatch('fetchWeatherByCoords', {lat: pos.coords.latitude, lon: pos.coords.longitude})
      }, err => console.log(err));
    }
  },
  watch: {
    citySearch() {
      if (this.timeout) clearTimeout(this.timeout)
      this.timeout = setTimeout(() => {
        this.$store.dispatch('fetchWeatherByCity', this.citySearch)
      }, 500)
    }
  },
  computed: {
    ...mapGetters(['countryCode', 'cityName'])
  }
}
</script>

<style lang="scss" scoped>
.city {
  padding: 12px 24px;
  width: 100%;
  border: none;
  font-size: 16px;
}
</style>
