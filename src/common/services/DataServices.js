import axios from 'axios';

const routePrefix = "https://localhost:44356/api/graph/last";

export default class DataService {
    static getChartData(type) {
        return axios.get(routePrefix)
            .then(r => r.data)
    }
}
