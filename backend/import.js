import fs from 'fs';
import config from './config';
import neo4j from './neo4j';

const neo4jService = neo4j({ config });

async function main() {
  await neo4jService.runInTransaction(async (transaction) => {
    try {
      const stopLines = fs.readFileSync('./stops.txt').toString('utf-8').split('\n');
      const stopTimesLines = fs.readFileSync('./stop_times.txt').toString('utf-8').split('\n');
      console.log("stopLines: ", stopLines.length, "stopTimesLines: ", stopTimesLines.length);
      let s1 = 0;
      for (const line of stopLines) {
        s1 ++;
        if (s1 % 100 === 0) {
          console.log(s1);
        }
        const stop = line.split(',')
        if (stop.length === 4) {
          await transaction.run(`CREATE (station:Station
            {stop_id: {stop_id},
            stop_name: {stop_name},
            stop_lat: {stop_lat},
            stop_long: {stop_long}})
          `,
          {
            stop_id: stop[0],
            stop_name: stop[1],
            stop_lat: stop[2],
            stop_long: stop[3]
          });
        }
      }
      console.log(s1);
      let s2 = 0;
      let prev_node = stopTimesLines.shift();
      for (const route of stopTimesLines) {
        s2 ++;
        if (s2 % 100 === 0) {
          console.log(s2);
        }
        const curr_node = route.split(',');
        if(curr_node.length >= 6) {
          if (curr_node[5] > prev_node[5]) {
            await transaction.run(`MATCH (first_station:Station), (last_station:Station)
              WHERE first_station.stop_id = {first_stop_id}
              AND last_station.stop_id = {last_stop_id}
              CREATE (first_station)-[b:BOUND]->(last_station)
              SET b.distance = {distance}
            `,
            {
              first_stop_id: prev_node[4],
              last_stop_id: curr_node[4],
              distance: parseInt(curr_node[3], 10) - parseInt(prev_node[3], 10)
            });
          }
          prev_node = curr_node;
        }
      }
      console.log(s2);
    } catch(e) {
      throw e;
    }
  });
  console.log('Import done');
  process.exit(0);
}

main();
