import http from 'http';
import { SioRpcServer  } from 'siorpc-server';
import config from './config';
import RpcApi from './api';
import neo4jService from './neo4j';

const neo4j = neo4jService({ config });

const services = { neo4j };
const apiParams = { config, services };

const rpcApi = new RpcApi(apiParams);

(async function main() {
  try {
    const appServer = http.createServer();

    const sioRpcServer = new SioRpcServer(appServer);
    rpcApi.register(sioRpcServer);

    appServer.listen(config.api.port, () =>
      console.log(`API active at ${config.api.url} running on local port: ${config.api.port}`)
    );
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
}());
