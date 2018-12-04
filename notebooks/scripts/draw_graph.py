from py2neo import Graph, Relationship
from scripts import vis


graph = Graph()

def draw_result(name, subg):
    nodes = []
    edges = []
    
    for n in subg.nodes:
        nodes.append( {'id': n['name'], 'label': n['name'], 'group': list(n.labels)[0] })

    for n in subg.relationships:
        edges.append({'from': n.start_node['name'], 'to': n.end_node['name']})
        
    return vis.vis_network(name,nodes, edges,True)

def draw_query(graph, name, query):
    subg = graph.run(query).to_subgraph()
    return draw_result(name, subg)