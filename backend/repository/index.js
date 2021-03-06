export class StationRepository {
  constructor({ config, services }) {
    this.neo4j = services.neo4j;
  }
  async find(start, limit) {
    return await this.neo4j.runInTransaction(async (transaction) => {
      const stationList = this.neo4j.getNodes(await transaction.run('MATCH (s:Station) RETURN s ORDER BY s.stop_name SKIP {start} LIMIT {limit}', { start, limit }));
      return stationList.map((station) => {
        return { name: station.properties.stop_name, id: station.properties.stop_id };
      });
    });
  }

  async shortest(start, end) {
    return await this.neo4j.runInTransaction(async (transaction) => {
      let query = `
        MATCH (n:Station {stop_id: {start}}), (m:Station {stop_id: {end}}), p=shortestPath((n)-[:BOUND*]-(m)) return nodes(p);
      `;
      return await transaction.run(query, {start, end}).then((res) => {
        return this.neo4j.getNodes(res);
      });
    });
  }
}
