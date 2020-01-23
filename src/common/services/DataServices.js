import axios from "axios";

const route = "https://aplikacjeinternetowel2a.azurewebsites.net/api/graph";

/** Class containing axios GET request to API with date range params */
export default class DataService {
  static getChartData(dateFrom, dateTo) {
    return axios
      .get(route, {
        params: {
          DateFrom: dateFrom,
          DateTo: dateTo
        }
      })
      .then(r => r.data);
  }
  static deleteData() {
    return axios
      .delete(route)
      .then((response) => {
        console.log(response);
      }, (error) => {
        console.log(error);
      }
    )
  }
}
