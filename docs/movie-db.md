# Movie DB

### Movies for 

```cypher
:param name => 'Clint Eastwood'
MATCH (a:Actor {name: $name})-[:ACTED_IN]->(m:Movie)<-[:DIRECTED]-(d:Director) WHERE a.name <> d.name RETURN a,m,d
````
