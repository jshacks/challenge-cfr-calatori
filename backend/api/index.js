import { StationRepository } from '../repository';

export default class RpcApi {
  constructor({ config, services }) {
    console.log('API initialized');
    this.repository = new StationRepository({ config, services });
  }
  register(sioRpcServer) {
    this.sioRpcServer = sioRpcServer;
    this.sioRpcServer.declare('ro.jshacks.getStations', async (start, limit) => {
      return await this.repository.find(start, limit);
    });

    this.sioRpcServer.declare('ro.jshacks.shortestPath', async (start, end) => {
      return await this.repository.shortest(start, end);
    });

    this.sioRpcServer.run();
  }
}
