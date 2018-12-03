# Internal

## Index-free adjency
Les données sont accessibles par proximité. Pour aller d'un noeud à un noeud voisin, il suffit de consulter la liste des noeuds.
Dans une base avec des indexes, il faut *toujours* passer par l'indexe.

cf. https://medium.com/@dmccreary/how-to-explain-index-free-adjacency-to-your-manager-1a8e68ec664a

Voir aussi https://slideplayer.com/slide/7933958/


“The node and relationship stores are concerned only with the structure of the graph, not its property data. Both stores use fixed-sized records so that any individual record’s location within a store file can be rapidly computed given its ID. These are critical design decisions that underline Neo4j’s commitment to high-performance traversals.” -- Chapter 6, Graph Databases
