import config from './config';
import neo4j from './neo4j';

const neo4jService = neo4j({ config });

async function main() {
  await neo4jService.runInTransaction(async (transaction) => {
    try {
      await transaction.run('MATCH (n) DETACH DELETE n');
    } catch(e) {
      throw e;
    }
  });
  console.log('Clean-up done');
  process.exit(0);
}

main();
