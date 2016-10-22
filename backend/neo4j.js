import { v1 as neo4j } from 'neo4j-driver';

class Neo4jUtils {
 constructor(driver) {
   this.driver = driver;
 }
 createSession() {
   return this.driver.session();
 }
 getProperties(node) {
   return node.properties;
 }
 getLabels(node) {
   return node.labels;
 }
 getId(node) {
   return node.identity;
 }
 getCount(result) {
   return result.records.length;
 }
 getNodes(result, column = 0) {
   return result.records.map(record => record._fields[column]); // eslint-disable-line no-underscore-dangle
 }
 getOneNode(result, column = 0) {
   return result.records[0]._fields[column]; // eslint-disable-line no-underscore-dangle
 }
 getRelationships(result, column = 0) {
   return result.records.map(record => record._fields[column]); // eslint-disable-line no-underscore-dangle
 }
 getOneRelationship(result, column = 0) {
   return result.records[0]._fields[column]; // eslint-disable-line no-underscore-dangle
 }
 getScalars(result, column = 0) {
   return result.records.map(record => record._fields[column]); // eslint-disable-line no-underscore-dangle
 }
 getOneScalar(result, column = 0) {
   return result.records[0]._fields[column]; // eslint-disable-line no-underscore-dangle
 }
 async runInTransaction(functionReturningPromise) {
   const session = this.createSession();
   const transaction = session.beginTransaction();
   try {
     const functionResult = await functionReturningPromise(transaction);
     transaction.commit().subscribe({
       onCompleted: () => {
         session.close();
       },
       onError: (error) => {
         session.close();
         throw error;
       },
     });
     return functionResult;
   } catch (error) {
     transaction.rollback();
     session.close();
     throw error;
   }
 }
}

const neo4jservice = ({ config }) => {
 const driver = neo4j.driver(config.neo4j.url, neo4j.auth.basic(config.neo4j.user, config.neo4j.password));
 process.on('exit', () => {
   driver.close();
 });
 return new Neo4jUtils(driver);
};

export default neo4jservice;
