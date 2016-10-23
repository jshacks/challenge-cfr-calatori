export class StationRepository {
  constructor({ config, services }) {
    this.neo4j = services.neo4j;
  }
  async find(start, limit) {
    return await this.neo4j.runInTransaction(async (transaction) => {
      const stationList = this.neo4j.getNodes(await transaction.run('MATCH (s:Station) RETURN s SKIP {start} LIMIT {limit}', { start, limit }));
      return stationList.map((station) => {
        return { name: station.properties.stop_name, id: station.properties.stop_id };
      });
    });
  }

  async shortest(start, end) {
    return await this.neo4j.runInTransaction(async (transaction) => {
      let penis = `MATCH (n:Station {stop_id: {start_id}}), (m:Station {stop_id: {end_id}})
                   call apoc.algo.dijkstra(n, m, 'BOUND>', 'distance') YIELD path, weight
                   return path, weight
                   `,
                   {
                     start_id: start,
                     end_id: end
                   };
      const res = await transaction.run(penis, {start, end});
      return this.neo4j.getOneScalar(res);
    });
  }
}
