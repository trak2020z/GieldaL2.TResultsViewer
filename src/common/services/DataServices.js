import axios from 'axios';

const routePrefix = "https://localhost:5001/api/graph";

export default class DataService {
    static getChartData(type) {
        return axios.get(routePrefix)
            .then(r => r.data)
    }
}
