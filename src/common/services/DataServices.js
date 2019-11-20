import axios from 'axios';

const route = "https://gieldal2tresultsviewerapi.azurewebsites.net/api/graph";

export default class DataService {
    static getChartData(type) {
        return axios.get(route)
            .then(r => r.data)
    }
}
