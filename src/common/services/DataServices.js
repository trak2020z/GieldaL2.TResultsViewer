import axios from 'axios';

const route = "https://gieldal2tresultsviewerapi.azurewebsites.net/api/graph";

export default class DataService {
    static getChartData(dateFrom, dateTo) {
        return axios.get(route, {
            params: {
                DateFrom: dateFrom,
                DateTo: dateTo
            }
        })
            .then(r => r.data)
    }
}
