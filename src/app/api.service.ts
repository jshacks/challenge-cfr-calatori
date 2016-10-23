import { Injectable } from '@angular/core';
import { SioRpcClient } from 'siorpc-client';

@Injectable()
export class ApiService {
  public sioRpc;

  constructor() {
    this.sioRpc = new SioRpcClient('http://cfr-calatori.tk:18080');
  }

  getStations(noStations = 2000) {
    return this.sioRpc.call('ro.jshacks.getStations', 0, noStations);
  }
}
