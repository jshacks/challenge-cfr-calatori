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
    console.log(start, end)
    console.log('hadnicap 1')
    return await this.neo4j.runInTransaction(async (transaction) => {
      let penis = `MATCH (n:Station {stop_id: {start}}), (m:Station {stop_id: {end}}), p=allShortestPaths((n)-[:BOUND*]-(m))
                                    WITH REDUCE(dist = 0, rel in rels(p) | dist + rel.distance) AS distance, p
                                    RETURN length(nodes(p)), distance
                                    ORDER BY distance
                                    LIMIT 1
                                   `;
      console.log('querry', penis)
      const res = await transaction.run(penis, {start, end});
      console.log('pula me')
      return this.neo4j.getOneScalar(res);
    });
  }
}
