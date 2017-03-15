const host = 'http://node-api.hamzatei.fr';
const endPoints = {
  pets: '/pets'
};

export class Api {
  constructor() {
    this.myHost = Api.getHost;
    this.myEndpoint = Api.endPoints;
  }

  static getHost() {
    return host;
  }

  static endPoints(name) {
    return endPoints[name];
  }
}

export default Api;