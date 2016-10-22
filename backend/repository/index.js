export class StationRepository {
  constructor({ config, services }) {
    this.neo4j = services.neo4j;
  }
  async find(start, limit) {
    return await this.neo4j.runInTransaction(async (transaction) => {
      const stationList = this.neo4j.getNodes(await transaction.run('MATCH (s:Station) RETURN s SKIP {start} LIMIT {limit}', { start, limit }));
      return stationList.map((station) => {
        return { name: station.properties.stop_name };
      });
    });
  }
}
