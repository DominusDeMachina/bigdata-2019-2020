# neo4J Database

## What is graph?

A graph is composed of two elements: a node and a relationship. Each node represents an entity (a person, place, thing, category or other piece of data), and each relationship represents how two nodes are associated. This general-purpose structure allows you to model all kinds of scenarios – from a system of roads, to a network of devices, to a population’s medical history or anything else defined by relationships.

## What is a Graph Database?

A graph database is an online database management system with Create, Read, Update and Delete (CRUD) operations working on a graph data model.

Unlike other databases, relationships take first priority in graph databases. This means your application doesn’t have to infer data connections using things like foreign keys or out-of-band processing, such as MapReduce.
The data model for a graph database is also significantly simpler and more expressive than those of relational or other NoSQL databases.
Graph databases are built for use with transactional (OLTP) systems and are engineered with transactional integrity and operational availability in mind.

### There are two important properties of graph database technologies:

- #### Graph Storage
  Some graph databases use native graph storage that is specifically designed to store and manage graphs, while others use relational or object-oriented databases instead. Non-native storage is often much more latent.
- #### Graph Processing Engine
  Native graph processing (a.k.a. “index-free adjacency”) is the most efficient means of processing graph data since connected nodes physically “point” to each other in the database. Non-native graph processing uses other means to process CRUD operations.

# What Are the Advantages of Using a Graph Database?

- #### Performance
  For intensive data relationship handling, graph databases improve performance by several orders of magnitude. With traditional databases, relationship queries will come to a grinding halt as the number and depth of relationships increase. In contrast, graph database performance stays constant even as your data grows year over year.
- #### Flexibility
  With graph databases, IT and data architect teams move at the speed of business because the structure and schema of a graph model flexes as applications and industries change. Rather than exhaustively modeling a domain ahead of time, data teams can add to the existing graph structure without endangering current functionality.
- #### Agility
  Developing with graph databases aligns perfectly with today’s agile, test-driven development practices, allowing your graph database to evolve in step with the rest of the application and any changing business requirements. Modern graph databases are equipped for frictionless development and graceful systems maintenance.
