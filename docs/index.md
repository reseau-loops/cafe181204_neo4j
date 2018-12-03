class: inverse middle center

# Bases Graphes &amp; Neo4j
Incursion dans le monde des bases graphes  
avec Neo4J

.footnote[marc.dexet(at)ias.u-psud.fr]
.headnote[Café Loops]

---
name: what_is_a_graph
# C'est quoi un "graphe" ?


---

template: what_is_a_graph

Un _graphe_ est une structure composée de 
* noeuds (_vertex_)
* d'arêtes (_edge_)

Les _arêtes_ relient les _noeuds_.

<a href="graphes/graph_01.html" target="_blank">
    <center>
        <img src="graphes/graph_01.png" width="800px">
    </center>
</a>

---

template: what_is_a_graph

Un _graphe_ est une structure composée de 
* noeuds (_vertex_)
* d'arêtes (_edge_)

Les _arêtes_ relient les _noeuds_ et peuvent être **orientées**

<a href="graphes/graph_02.html" target="_blank">
    <center>
        <img src="graphes/graph_02.png" width="800px">
    </center>
</a>

---

template: what_is_a_graph

Un _graphe_ est une structure composée de 
* noeuds (_vertex_)
* d'arêtes (_edge_)

Les _arêtes_ relient les _noeuds_ et peuvent être **orientées**

<a href="graphes/graph_03.html" target="_blank">
    <center>
        <img src="graphes/graph_03.png" width="800px">
    </center>
</a>


---

<a href="graphes/graph_complexe.html" target="_blank">
    <center>
        <img src="graphes/graph_complexe.png" width="800px">
    </center>
</a>

---

<center>
	<img src="https://upload.wikimedia.org/wikipedia/commons/9/9b/Social_Network_Analysis_Visualization.png" width="100%">
</center>

.footnote[.small[Martin Grandjean]]

---
class: inverse middle center
# Pourquoi une base graphe ?
Un peu d'histoire


---
# La gestion des données
Un problème vieux comme l'humanité

## Guidé par les moyens technologiques et le coût.
* argile, papirus, papier, ...
* bandes magnétiques, disques, mémoire

.left-column[
.center[*Bandes magnétiques*]
<center>
    <img src="images/bandes_magnetiques.png" width="300px">
</center>
]

.right-column[
.center[*Disques durs*]
<center>
    <img src="images/ibm350.jpg" width="300px">
</center>
]

---
# Base graphe, un vieux concept

## Les premières bases sont des graphes ('70)
* CODASYL (_Conference on Data Systems Languages_)
* Utilisé en _COBOL_,
* Base _navigationnelle_

.left-column[
.center[*Modèle hiérarchique*]
<center>
    <img src="images/hierachique.png" width="300px">
</center>
]

.right-column[
.center[*Modèle en réseau*]
<center>
    <img src="images/reseau.png" width="300px">
</center>
]


.footnote[.small[ [Cours "bases de données réseau et hiérarchiques" sur sgbd.developpez.com](https://sgbd.developpez.com/tutoriels/cours-complet-bases-de-donnees/?page=bases-de-donnees-reseaux-et-hierarchiques)]]

???
Image http://www.cs.aucegypt.edu/~csci253/DBConcepts%20v2.htm
* Accès aux données en mode **_navigationnel_**   
en mentionnant les relations **_explicitement_**   
pour passer d'un _record_ à un autre.


---
# L'hégémonie des Bases de Données Relationnelles


## Approche par table de données et jointure par clef.
* Orientée _ligne_
<center>
    <img src="images/SGBD_RELATIONNEL.png" width="300px">
</center>

## Standard de fait
* Normalisation [SQL](https://fr.wikipedia.org/wiki/Structured_Query_Language)
* Nombreux éditeurs et produits
	* _Oracle, Postgres, MySQL, MariaDB, SQLServer, SQLite..._
* Un écosystème établi et enseigné.

.footnote[.small[[SQL:2011](https://fr.wikipedia.org/wiki/SQL:2011)]]

???
Vision unifiée: [12 règles de CODD](https://fr.wikipedia.org/wiki/12_r%C3%A8gles_de_Codd)

C'est devenue un standard de fait, et la majorité des 
les applications, sauf cas très spécifique, ont opté pour 
l'usage des bases de donnée relationnelles.

Le mérite en revient à une normalisation, plus ou moins respectée, 
portée par l'ISO


---
# L'hégémonie des Bases de Données Relationnelles

## Propriétés ACID
 * **A**tomicity &rarr; transaction
 * **C**onsistency &rarr; intégrité d'une transaction à une autre
 * **I**solation &rarr; pas d'interférence entre transactions
 * **D**urability &rarr; la pérénité est assurée, même en cas de défaillance

## Une intégrité garantie

* Les règles sont contenues dans la base.
* Schéma, contraintes, gestion des mises à jour en cascade.

## Des qualités exigeantes mais rassurantes

???
l'hégémonie repose sur le respect des propriétés ACID


Ce propriétés sont essentielles pour les grands consommateurs de l'époque que
sont les banques et les assurances.

L'idée est alors que la base de données est une entitée qui a elle seule peut garantir
l'intégrité et la pérénité des données stockées.
Les règles sont contenues dans la base sous forme de contrainte et de typage fort.
Les relations entre tables de données sont gérées par des mécanismes forts.
Comme le DELETE CASCADE

---
# Les limites de l'approche relationelle

## Un trop plein d'ACIDité
* Problèmes de performance complexes dans certains contextes
 * bases distribuées, traitements répartis, sharding...

???
Avec l'explosion du web et des besoins de disponibilité, les acteurs se rendent rapidment compte que le SQL comme solution universelle
n'est plus tenable.


L'ACIDité du SQL, devient un frein. Amazon, par exemple, constate rapidement des problèmes de performance et de manitenance et développe ses propres bases.

--

## Un manque de souplesse 
 * Schemas rigides
 * Evolutions de schéma parfois casse-tête
 * Guerre entre DBA (_Data Base Administrator_) et développeurs

???
De plus, les SGBD, avec les rôles très séparés, donnent parfois lieu à de véritables guerre entre DBA, gardien des données, et développeurs, troublions perpétuels qui veulent apporter de la nouveauté.


--

## Un mélange des genres entre stockage et traitement 
* Traitements dans la base (triggers, procédures),
* Dispersion des règles entre le stockage (la base) et les traitements (applications)

--

.big[.quote[Fin du "One-Size-Fits-All" et émergence du NoSql]]




---
name: graph_renew_sql
# Base graphe, le renouveau NoSQL

---
template: graph_renew_sql

.center[.big[**N**ot **O**nly **SQL**]]


## NoSQL, un mouvement venu du terrain
* Initié par les acteurs du web et du big data,
* Solutions pensées *par* et *pour* les développeurs et ingénieurs systèmes.

--

## Disparité des approches
* Avant tout recherche de solutions en dehors des bases SQL.

???
Les mouvement SQL est proétiforme et se caractérise avant tout par une recherche de solution en dehors du canon SQL.

--

### Propriétés **souvent** (mais pas toujours) associées :
* Open source
* API first
* Simples à installer (...)
* Transfert du contrôle de cohérence vers l'application

.center[.big[.quote[La base de données n'est plus la garante de l'intégrité]]]

---
template: graph_renew_sql

Légitimation par le théorème CAP ([Eric A. Brewer](https://en.wikipedia.org/wiki/Eric_Brewer_(scientist)))

## CAP (Availability, Consistency, Partition tolerance)
* Un SGDB ne pourra jamais avoir que 2 propriétés sur 3.

<center>
    <img src="images/cap_theorem.png" width="500px">
</center>

.footnote[.small[[Maitrisez le théorème de CAP](https://openclassrooms.com/fr/courses/4462426-maitrisez-les-bases-de-donnees-nosql/4462471-maitrisez-le-theoreme-de-cap)]]


???
L'approche NoSQL est légitimée par le théorème CAP qui quelque part brise espèce d'hésitation
à renoncer aux bases SQL réconfortantes et bien connues de tous.

Face aux nouveaux besoins, le théorème CAP dit en gros qu'il ne sera jamais possible de tout avoir.

Autant partir sur de nouvelles solutions.


---
# Base graphe, le renouveau NoSQL

## Passage de ACID à BASE
* **ACID**
 * **A**tomicity &rarr; transaction
 * **C**onsistency &rarr; intégrité d'une transaction à une autre
 * **I**solation &rarr; pas d'interférence entre transactions
 * **D**urability &rarr; la pérénité est assurée, même en cas de défaillance
--

* **BASE**
 * **B**asically **A**vailable &rarr; disponibilité la plupart du temps
 * **S**oft-state &rarr; la consistence n'est pas toujours garantie
 * **E**ventually consistent &rarr; la consistence arrivera à un moment

--

## Proposition d'autres modèles
* Clef-valeur
* Document
* Colonne
* **Graphe**

???

Basic Availability
*   The database appears to work most of the time.

Soft-state
*  Stores don’t have to be write-consistent, nor do different replicas have to be mutually consistent all the time.

Eventual consistency
*  Stores exhibit consistency at some later point (e.g., lazily at read time).



Difference entre base réseau et base graphe
https://stackoverflow.com/questions/5040617/what-is-the-difference-between-a-graph-database-and-a-network-database

En gros, une base graphe est plus flexible alors qu'une base réseau à plus de contraintes.
Une base réseau a une notion de _nested_ avec une relation de _owner-member_


---
# Les bases graphes, quels usages ?

## Traitements des données hautement connectées entre elles
* Avec un nombre indéterminé de liens entre entités 
* Nombreuses relations _Many-to-Many_ 
* Quand la relation est aussi, voire plus importante que la donnée.

## Des modèles flexibles
* Où le schéma et les relations se construisent au fur et à mesure des observations

## Besoins de performance de traversé de graphe
* Algorithmes puissants et rapides (~ ms)
* Analyse de très gros volume de données 

???

Relation + importante que la donnée : 
gestion de bande passante
Etude des échanges entre personnes, villes
Flux 

**Besoins de performance**
OLTP (online Transaction Processing)
OLAP (online Analysis Processing)

---
# Cas d'usage

## La seule limite est l'imagination
* Dépendances de composants (développement, industrie),
* Identity and access management
* Gestion d'infrastructure (CMDB)
* Réseaux sociaux,
* Système de recommandation (produit, diagnostiques ),
* Détection de fraude (circuit fermé),
* Analyse d'impact de maintenance réseaux (SFR)
...

---
class: inverse center
**The Cosmic Web Of Galaxy**
<iframe src="http://cosmicweb.barabasilab.com/" width="100%" height="500px"/>

http://cosmicweb.barabasilab.com/

https://dzone.com/articles/neo4j-30-and-the-graph-of-the-universe


---
class: splash-grey center
**Panama's Paper**

<center>
	<img src="images/panamaspaper.png">
</center>

https://fr.slideshare.net/neo4j/investigating-the-panama-papers-connections-with-neo4j-stefan-komar-neo4j
---
class: inverse middle center
# Effet tableau blanc

---
# La représentation est le modèle

## Pas de transposition dans un autre formalisme
### Avec une base relationnelle
_Modèle UML_
<center>
    <img src="images/graphs-uml-to-db.svg">
</center>

--

_Modèle de données_
<center>
    <img src="images/graphs-uml-to-db2.svg">
</center>


---
# La représentation est le modèle

## Pas de transposition dans un autre formalisme
### Avec une base graphe
_Modèle UML_
<center>
    <img src="images/graphs-uml-to-db.svg">
</center>

--

_Modèle de données_
<center>
    <img src="images/graphs-uml-to-db3.svg">
</center>

--

Et c'est tout...

---

<a href="graphes/graph_hamilton.html" target="_blank">
    <center>
        <img src="graphes/graph_hamilton.png" width="100%">
    </center>
</a>

---
**A vous d'imaginer...**
<center>
    <img src="images/Sketchboard.png" width="100%">
</center>

.footnote[.small[https://sketchboard.me/]]

---

class: splash middle center

.quote[.big[La cohérence doit  
être garantie  
par le processus.]]

--

----

.quote[.big[Le traitement   
redevient  
le seul garant de la cohérence.]]

--

.quote[.big[La base   
redevient   
le garant du stockage de données.]]


---
class: inverse middle center
# Bases graphes, le marché

---
# Bases graphes, le marché

## Les bases graphes sont toujours très minoritaires...

<center>
  <img src="images/2018-11-27_DB-Engines_Ranking_per_database_model_category_SCORE.png" width="600px">
</center>


.footnote[.small[https://db-engines.com/]]

---
# Bases graphes, le marché

## ... mais elles intéressent de plus en plus.

<center>
  <img src="images/2018-11-27_DB-Engines_Ranking_per_database_model_category_all.png" width="800px">
</center>


.footnote[.small[https://db-engines.com/]]


---
# Bases graphes, le marché

## Parmis ces bases, Neo4j

<center>
  <img src="images/2018-11-27_DB-Engines_Ranking.png" width="800px">
</center>


.footnote[.small[https://db-engines.com/]]


---
# Bases graphes, le marché

## Parmis ces bases, Neo4j

<center>
  <img src="images/2018-11-27_DB-Engines_Ranking_graph.png" width="600px">
</center>


.footnote[.small[https://db-engines.com/]]

---
class: black_bkg middle center

# Neo4j
Welcome in the Matrix

<img src="images/wikipedia_Digital_rain_animation_small_letters_shine.gif">

---
# Neo4j, la société

Neo4j est développé par la société suédoise _Neo4j Inc._ 

[200 personnes](https://neo4j.com/staff/)

## Histoire
* **2000**: Constat d'échecs à gérer des données très connectées
* **2002**: 1er prototype de Neo4j
* **2007**: Création de la société Neotechnology.
* **2010**: Neo4j V1 en 2010 (GPL)
* **2016**: Neo4j V3
* **2017**: Neotechnology &rarr; Neo4j, Inc.


## Clients 
* Walmart, UBS, ebay, Cisco, LinkedIn, HP, Airbus...

???
Emil, Peter et Johan se battent pour trouver des connexions entre données dans une base Informix.  
Les requêtes deviennent très complexes et inmaintenables.

Series A and Series B rounds are funding rounds for earlier stage companies and range on average between $1M–$30M.

Series C rounds and onwards are for later stage and more established companies. These rounds are usually $10M+ and are often much larger.

--

## Matrix
* Film de référence et omniprésent dans la culture *neo*4j


---
# Neo4j, la communauté

## Stackoverflow
* tag `neo4j` ~ 17 000 articles 

## Meetup
* 60 000 membres
* 120 groupes 
* https://www.meetup.com/topics/neo4j/all/

## Community.neo4j.com
* https://community.neo4j.com

???
so
numpy ~ 60 000
pandas ~ 88 000

meetup
python 1,846,534 members 2,230 Meetups


---
# Neo4j, le produit

## Base Graphe 
* Transactionnelle ACID
* Développée en open-source (https://github.com/neo4j/neo4j)
* Moteur écrit en Java (8)
* Extensible
* Capacités 
	* 34 milliards de noeuds
	* 34 milliards de relations
* Haute disponibilité (_Entreprise_)

--

## Double licence

* **Community** :  GPL v3
* **Enterprise**: AGPL avec licence commerciale
 * _Community_ + composants _closed source_  

---
class: splash center middle

## Usage Open source
* Version *Entreprise* [utilisable pour des produits open-source](https://neo4j.com/Open-Source/) 

.center[.quote["If you are building an open source project  
to benefit the world at large,  
we are pleased to offer Neo4j Enterprise Edition under the AGPL  
for this express use."]]

---
# Neo4j, l'écosytème

## Une application web 
* _browser_

--

## Des drivers

* _Officiels_ : java, python, javascript, .Net.
* _Community_ : Ruby, PHP, R, Go, Erlang, C/C++, Clojure, Perl, Haskell

--

## Des APIs et des protocoles 
* API HTTP 
* Protocole BOLT : connecté binaire sur TCP ou web sockets.

--

## Un langage CYPHER
```python
CREATE (p:Person {firstName: "name"}) RETURN p
```

---
class: inverse middle center

# Notions de base
Culture Neo4j

---
name: notion_de_base_node
# Node

Un `Node` est une **entité**

---
template: notion_de_base_node

<center>
  <img src="images/node_detail_0.svg">
</center>

Avec

---
template: notion_de_base_node

<center>
  <img src="images/node_detail_1.svg">
</center>

Avec
* des **propriétés** 


---
template: notion_de_base_node

<center>
  <img src="images/node_detail_2.svg">
</center>

Avec
* des propriétés 
* un **label** 

Un label est une étiquette apposé sur le noeud.

---
template: notion_de_base_node

<center>
  <img src="images/node_detail_3.svg">
</center>


Avec
* des propriétés 
* un ou **plusieurs labels** 

---
name: notion_de_base_relationship

# Relationship

Une `relationship` est une **entitée**


---
template: notion_de_base_relationship

<center>
  <img src="images/relationship_details_0.svg">
</center>

Avec
* un noeud de **départ** et un noeud d'**arrivé**


---
template: notion_de_base_relationship

<center>
  <img src="images/relationship_details_1.svg">
</center>

Avec
* un noeud de départ et un noeud d'arrivé
* un et un seul **type**

---
template: notion_de_base_relationship

<center>
  <img src="images/relationship_details_2.svg">
</center>

Avec
* un noeud de départ et un noeud d'arrivé
* un et un seul type
* et des **propriétés**

--

-----

.center[.quote[C'est toujours un lien orienté]]

---
# Node et Relationship

## First-Class Citizen

* `Node` et `RelationShip` &rarr; même *importance*, 
* Pas de type privilégié par rapport à un autre
 * Comme les tables en SQL et la jointure comme un moyen de relier les tables.

--

## Pas de schéma
Absence de **schéma dans la base** qui décrit ce qui doit être.

<center>
    <img src="images/no_schema.svg">
</center>

--

.quote[.big[La cohérence doit être garantie par le processus]]


---
# Label et Type

* `Node` &rarr; zéro ou plusieurs `Label`
* `Relationship` &rarr; un et un seul `Type`

Les `Labels` et `Types` servent à créer des indexes _par_ propriétés   
pour aisement retrouver `Nodes` et `Relationship`.

---
# Properties

Dictionniaire de clef-valeur
* clef : chaîne de caractères
* valeur : scalaire ou liste de scalaire

## Types de scalaire
.left-column[
* _Numérique_ :
 * Integer
 * Float
* Chaîne de caractère
* Booléen
]

.right-column[
* _Spatial_:
  * Point
* _Temporel_:
  *  Date
  *  Time
  *  LocalTime
  *  DateTime
  *  LocalDateTime
  *  Duration
]

---
# Path

Un `Path` est un ensemble de _noeuds_ et de _relations_ reliant 
- un noeud de départ 
- et un noeud d'arrivé

<a href="graphes/graph_path.html" target="_blank">
    <center>
        <img src="graphes/graph_path.png" width="800px">
    </center>
</a>

---
# Traversal

Un `Traversal` est moyen de collecter des  _paths_, des _noeuds_ et des _relations_ en suivant des règles et un algorithme.

## Approche impérative (HOW)
* Framework java uniquement
* Assez hardu
* https://neo4j.com/docs/java-reference/3.4/tutorial-traversal/

## Approche declarative (WHAT)
* Langage CYPHER
---
class: inverse middle center
# Cypher
Celui qui préférait la matrice...


---
# Cypher

* Langage de requêtage et manipulation de graphe,
* Inventé par Neo4j,
* Relations exprimées sous forme de _patterns_.

## OpenCypher

* http://www.opencypher.org/
* Ouverture de Cypher (Apache 2) 
* Devenir le SQL des bases graphes 

## Utilisable
* En ligne de commande
* Dans la console web
* Comme template en programmation


---
name: cypher_101

# Cypher
## Pattern 101


---
template: cypher_101


Ces patterns sont écrits dans l'esprit _Ascii-Art_

--

```
  ______________         ________         ________________
 /              \       |        |       /                \
|| name: Roméo  ||------| : LOVE |----> || name: Juliette ||
 \______________/       |________|       \________________/
```

--

## Exemple de Pattern Cypher

.outline-code-big[
```
({name: "Roméo"})-[:LOVE]->({name: "Juliette"})
```
]

---
template: cypher_101

.center[**Noeud &hArr; parentèses**]

<center>
  <img src="images/node_detail_0.svg" height="50%">
</center>

.center[.mega-huge[.quote[()]]]


---
template: cypher_101

.center[**Relation orientée &hArr; crochets et flèche**]

<center>
  <img src="images/graphs-different_nodes.svg" height="30%">
</center>

.center[.mega-huge[.quote[()-\[\]->()]]]


---
template: cypher_101

.center[**Relation non orientée &hArr; crochets et tirés**]

<center>
  <img src="images/graphs-non-orienté.svg" height="30%">
</center>

.center[.mega-huge[.quote[()-\[\]-()]]]


---
template: cypher_101

.center[**Relation anonyme orientée &hArr; tirés + flèche**]

<center>
  <img src="images/graphs-sans-relation-o.svg" height="30%">
</center>

.center[.mega-huge[.quote[()-->()]]]

---
template: cypher_101

.center[**Relation anonyme non orientée &hArr; tirés**]

<center>
  <img src="images/graphs-sans-relation-no.svg" height="30%">
</center>

.center[.mega-huge[.quote[()--()]]]


---
template: cypher_101

.center[**Propriétés &hArr; accolades**]

<center>
  <img src="images/properties.svg" height="50%">
</center>

.center[.mega-huge[.quote[({name:"foo"})]]]

---
template: cypher_101

.center[**Label,Type &hArr; deux points + nom**]

<center>
  <img src="images/graphs-label.svg" height="50%">
</center>

.center[.mega-huge[.quote[(:Label)]]]


---
template: cypher_101

.center[**variable**]

.center[.mega-huge[.quote[(name)]]]

--

## Expressions valides

.center[.mega-huge[.quote[(name {key:value})]]]
.center[.mega-huge[.quote[(name:Label {key:value})]]]


---
template: cypher_101

## Exemples de pattern
.center[.outline-code-big[
```python
(a:Author)-[r:WRITE]->(b:Book) 
```
]]

--

.center[.outline-code-big[
```python
(a:Author)-->(b:Book) 
```
]]

--

.center[.outline-code-qbig[
```python
(a:Author)-[:WRITE]->(b:Book)<-[:READ]-(r:Reader)
```
]]

--

.center[.outline-code-big[
```python
(a:Author)-->(b:Book)<--(r:Reader)
```
]]

https://neo4j.com/docs/developer-manual/current/cypher/syntax/patterns/

---
name: cypher_clause
# Cypher, les clauses

---
template: cypher_clause

## Types
* Lecture
* Projection
* Création /Modification

## Nombreuses clauses et sous clauses
* Nous n'allons pas toutes les parcourir :)
* https://neo4j.com/docs/developer-manual/current/cypher/clauses/


---
name: cypher_match
# MATCH

---
template: cypher_match

La plus utilisée

```python
MATCH <pattern> RETURN <valeurs> 
```

--

Retourne tous les noeuds de la base (_déconseillé sur les grosses bases_)
```python
MATCH (n) RETURN n
```

--

Tous les noeuds dans la limite de 100
```python
MATCH (n) RETURN n LIMIT 100
```

--

Tous les noeuds dont le nom est _John_
```python
MATCH (n {name: 'John'}) RETURN n
```

--
 
Tous les noeuds que tous les _John_ connaissent
```python
MATCH (n {name: 'John'})-[:KNOW]->(m) RETURN m
```

---
template: cypher_match

## WHERE

* Tous les titres de livres de tous les auteurs dont 
 * le nom est _'Hamilton'_, 
 * le prénom _"Peter"_.

--

**Sans WHERE**
```python
MATCH 
(a:Author {lastname: "Hamilton", firstname: "Peter"})-[:WRITE]->(b:Book)
RETURN b.title 
```

--

**Avec WHERE**
```python
MATCH 
(a:Author)-[:WRITE]->(b:Book)
WHERE a.lastname: "Hamilton" AND a.firstname = "Peter"
RETURN b.title 
```

--

.huge[.center[.quote[Les deux expressions sont équivalentes]]]

---
name: cypher_create
# CREATE

--
template: cypher_create

* Un noeud

```python
CREATE (a:Author {lastname: "Hamilton", firstname: "Peter"})
```

--

* Deux noeuds

```python
CREATE 
(a:Author {lastname: "Hamilton", firstname: "Peter"}),
(b:Book {title: "Pandora's Star"})
```

--

* Une relation

```python
CREATE 
(a:Author {lastname: "Hamilton", firstname: "Peter"}),
(b:Book {title: "Pandora's Star"}),
(a)-[r:WRITE]->(b)
```


---
template: cypher_create

## Combinaison de MATCH et CREATE


```python
MATCH 
(a:Author {lastname: "Hamilton", firstname: "Peter"}),  
(b:Book {title: "Pandora's Star"})

CREATE (a)-[r:WRITE]->(b)
```


---
name: cypher_modificate
# SET /REMOVE

Les clauses `SET` et `REMOVE` s'utilisent toujours avec une variable

---
template:  cypher_modificate

* Ajout de la date de naissance

```python
MATCH 
(a:Author {lastname: "Hamilton", firstname: "Peter"}) 

SET a.birthDate = date('1960-03-02')
```

---
template:  cypher_modificate

* Suppression de la date de naissance

```python
MATCH 
(a:Author {lastname: "Hamilton", firstname: "Peter"}) 

REMOVE a.birthDate
```

---
template:  cypher_modificate

## Utilisation d'un dictionnaire

--

* Ecrasement des propriétés avec `=`

```python
MATCH 
(a:Author {lastname: "Hamilton", firstname: "Peter"}) 

SET a = { lastname: "Foo", firstname: "BAR"}
```

--

* Complétions des propriétés avec `+=`

```python
MATCH 
(a:Author {lastname: "Hamilton", firstname: "Peter"}) 

SET a += { birthDate : date('1960-03-02'),  nationality: "british"}
```

---
# MERGE

Une instruction synthétisant `MATCH` et `CREATE`

MERGE créé les entitée manquantes pour répondre à un pattern.

Si elles existent, **`MERGE` ne fait rien**.

```python
MERGE (a:Author {lastname: "Hamilton", firstname: "Peter"}) 
```
--

* Création du livre _Pandora's star_ et de la relation.

```python
MATCH 
(a:Author {lastname: "Hamilton", firstname: "Peter"}) 
MERGE (a)-[r:WRITE]->(b:Book {title: "Pandora's Star"})
```

--

`ON CREATE` et `ON MATCH`

```python
MERGE (a:Author {lastname: "Hamilton", firstname: "Peter"}) 
ON CREATE 
	SET a.created = timestamp()
ON MATCH 
	SET a.lastSeen = timestamp()
```
---

# Procédures APOC _Awesome Procedures On Cypher_


## Une APOC pour chaque situation
* Plus de 350 dans les sandox
* Installable comme des plugins 
 (un simple .jar)
* Fournis par la communauté (neo4j-contrib) 

## Exemple de catégories
* Indexes et recherche textuelle
* Phonétique
* Conversion
* Algorithmes graphes 
* Spatiale (geocode !)
* Intégration (JSON, CSV, JDBC, XML, ElasticSearch,...)
* Manipulation de graphes (refactoring)
* Tâches d'administraion et récurrentes
* triggers
* ...

.footnote[[Neo4j APOC](https://neo4j-contrib.github.io/neo4j-apoc-procedures/)]


---
# Procédures APOC _Awesome Procedures On Cypher_

## Utilisation

### Avec CALL

```python
MATCH (n:Airport {iata: "ORY"}),(m:Airport {iata: "AVN"})

CALL apoc.algo.dijkstra(n,m,'DISTANCIATED','distance') YIELD path, weight

RETURN path, weight
```

### En ligne

```python
RETURN example.join(['A','quick','brown','fox'],' ') as sentence
```

---
# Cypher documentation

## Référence

https://neo4j.com/docs/cypher-manual/current/introduction/

## Refcard
https://neo4j.com/docs/pdf/cypher-refcard-3.4.pdf

<center>
  <img src="images/cypher-refcard.png" width="80%">
</center>



---
class: inverse middle center
# Play time

---
# Un service Neo4j c'est 

* Une base (et *une seule* par service)
* Une API Rest et une URI **bolt://**
* Une console web (neo4j browser)

<center>
  <img src="images/neo4j-browser.png" width="100%">
</center>

---

<center>
  <img src="images/neo4j-browser-02.png" width="100%">
</center>

---

<center>
  <img src="images/neo4j-browser-03.png" width="100%">
</center>

---

<center>
  <img src="images/neo4j-browser-04.png" width="100%">
</center>

---
name: how_to_play
# Comment jouer



---
template: how_to_play

## Installation sur une machine
* https://neo4j.com/docs/operations-manual/current/installation/
* Linux, Mac OS, Windows
* OpenJDK 8

---
template: how_to_play

## Docker

Le plus simple pour jouer à domicile

```bash
$ MY_BASE="$HOME/neo4j/evaluation"

docker run --rm \
--publish=7474:7474 \
--publish=7687:7687  \
--env=NEO4J_AUTH=none  \
--volume=$MY_BASE:/data  neo4j 
```

---
template: how_to_play

## Sandbox
* Machines virtuelles d'une durée limitée (3 jours)
* Plusieurs use cases 

<center>
  <img src="images/sandbox_01.png" width="80%">
</center>

---
class: inverse middle center
# DEMOs

---
class: inverse middle center
# Architecture de Neo4j
Jettons un coup d'oeil sous le capot


---
name: architecture
# Architecture de Neo4j


---
template: architecture

<center>
  <img src="https://s3.amazonaws.com/dev.assets.neo4j.com/wp-content/uploads/20160712093043/neo4j-native-graph-databse-architecture.png" width="80%">
</center>

---
template: architecture

## Native Graph
* Moteurs et format de stockage _dédiés_

### Index-free adjacency
* Pas d'index **partagé** ou **global**
* Chaque noeud contient un index local de ses voisins

### Traverser un graphe
* Suivre les _relations_
* Coût proportionel au graphe parcouru, pas au volume total de données.
  * La recherche par index &rarr; _O_( ln(n) )
  * Le saut à une position &rarr; _O_(1)

.footnote[[Analyse de la complexité des algorithmes](https://fr.wikipedia.org/wiki/Analyse_de_la_complexit%C3%A9_des_algorithmes)]  

???
Pas de HOTSPOT sur les indexes.

A database engine that utilizes index-free adjacency is one in which each node main‐
tains  direct  references  to  its  adjacent  nodes.  Each  node,  therefore,  acts  as  a  micro-
index  of  other  nearby  nodes,  which  is  much  cheaper  than  using  global  indexes.  It
means that query times are independent of the total size of the graph, and are instead
simply proportional to the amount of the gra

O(log(n)) vs O(1)




---
template: architecture
<center>
    <img src="https://image.slidesharecdn.com/neo4jinternals-120521030150-phpapp02/95/an-overview-of-neo4j-internals-12-1024.jpg?cb=1337569396" width="100%">
</center>

---
template: architecture


## All Is Linked List
* Tout est _liste chaînée_
* Tous les enregistrements sont de tailles fixes

## Calcul de position direct

```python 
position(id,nature) = id * node_block_size(nature)
```

Parcourir un graphe consiste à
* calculer la position d'une structure,
* atteindre l'enregistrement,
* parcourir la liste de valeurs.

Le parcours est réversible.

---
template: architecture


Chaque enregistrement comporte des ID permettant de calculer la position du début de la liste suivante


## Noeud

```cpp
struct node_record { 
  bool in_use;          // noeud utilisé

  int first_relation;   // id première relation de la liste des relations
  int first_property;   // id première propriété de la liste des propriétés
}
```

.footnote[.small[[NodeRecord](https://github.com/neo4j/neo4j/blob/3.5/community/kernel/src/main/java/org/neo4j/kernel/impl/store/record/NodeRecord.java)]]
---
template: architecture


Chaque enregistrement comporte des ID permettant de calculer la position du début de la liste suivante

## Relation

```cpp
struct relationship_record {
    bool in_use;        // noeud utilisé

    int first_node;     // id du premier noeud de la relation (x)->( )
    int second_node;    // id du second noeud de la relation  ( )<-( ) 

    int relation_type;  // id du type de relation

    int first_node_prev_relation;
    int first_node_next_relation;

    int second_node_prev_relation;
    int second_node_next_relation;
}
```


.footnote[.small[[RelationshipRecord](https://github.com/neo4j/neo4j/blob/3.5/community/kernel/src/main/java/org/neo4j/kernel/impl/store/record/RelationshipRecord.java)]]

---
template: architecture

# Exemple
<center>
	<img src="images/native_graph-Page-1 (0).svg" width="90%">
</center>

---
template: architecture

# Exemple
<center>
	<img src="images/native_graph-Page-1 (1).svg" width="90%">
</center>

---
template: architecture

# Exemple
<center>
	<img src="images/native_graph-Page-1 (2).svg" width="90%">
</center>

---
template: architecture

# Exemple
<center>
	<img src="images/native_graph-Page-1 (3).svg" width="90%">
</center>

---
template: architecture

# Exemple
<center>
	<img src="images/native_graph-Page-1 (4).svg" width="90%">
</center>


---
template: architecture

# Exemple
<center>
	<img src="images/native_graph-Page-1 (5).svg" width="90%">
</center>

---
template: architecture

# Exemple
<center>
	<img src="images/native_graph-Page-1 (6).svg" width="90%">
</center>


---
class: inverse middle center
# Côté développement

---
# Drivers

## Les drivers officiels
* java, python, javascript, .Net., Go
* Exclusivement le protocole _bolt://_
* Pool de connexion


## Les drivers officieux
* Fournis par la communauté
* [Ruby](https://neo4j.com/developer/ruby/), [PHP](https://neo4j.com/developer/php/), [R](https://neo4j.com/developer/r/), [Erlang](https://neo4j.com/developer/erlang_elixir/), [C/C++](https://neo4j.com/developer/c/), [Clojure](https://neo4j.com/developer/clojure/), [Perl](https://neo4j.com/developer/perl/), [Haskell](https://neo4j.com/developer/haskell/)
* Beaucoup utilisent l'_API HTTP_.

.footnote[[Drivers Neo4j](https://neo4j.com/docs/driver-manual/current/get-started/)]

---
# Mécanisme transactionnel

<center>
    <img src="images/transactions.png" width="80%">
</center>

---
# HTTP API

* Chasse l'API REST (deprecated), 
* Un seul endpoint

`db/data/transaction/commit`


```python
POST http://localhost:7474/db/data/transaction/commit

accept: application/json
content-type: application/json
authorization: Basic bmVvNGo6cG9pbnRlcnMtY3JhbXBzLXJha2U=

---

{
  "statements": [
    {
      "statement": "MATCH path=(n)-[r]-(p) RETURN n, r, p LIMIT 1",
      "resultDataContents" : [ "graph" ]
    }
  ]
}
```

.footnote[[Documentation HTTP API](https://neo4j.com/docs/http-api/current/)]

---
# HTTP API

.outline-13[

```json
{
   "results":[
      {
         "columns":["n","r","p"],
         "data":[
            {
               "graph":{
                  "nodes":[
                     {  "id":"0",
                        "labels":["Service"],
                        "properties":{"name":"Informatique"}
                     },
                     {  "id":"53",
                        "labels":["Person"],
                        "properties":{"name":"Andrée Laforest"}
                     }
                  ],
                  "relationships":[
                     {  "id":"6",
                        "type":"MEMBER_OF",
                        "startNode":"53",
                        "endNode":"0",
                        "properties":{}
                     }
                  ]
               }
            }
         ]
      }
   ],
   "errors":[]
}
```
]

---
name: java_inside

# Java inside

---
template: java_inside

## Ecosystème natif
* Intégralité du moteur et des extensions
* Entièrement sous Maven

--

## Accès bas niveau et hacking
* [API `kernel`](https://github.com/neo4j/neo4j/tree/3.5/community/kernel/src/main/java/org/neo4j/kernel) pour le hacking
* API `Traversal`

--

## Possibilité de créer ses propres `Traversal` 
 * Niveau expert
 * Choix des algorithmes `org.neo4j.graphalgo` (AStar, Dijkstra, )
 * Optimisation des requêtes 

---
template: java_inside
## Traversal (expert)

<center>
	<img src="https://neo4j.com/docs/java-reference/current/images/graphdb-traversal-description.svg">
</center>



---
template: java_inside
## Traversal simple

```java
private Traverser getFriends(
            final Node person ) {

        TraversalDescription td = graphDb.traversalDescription()
                .breadthFirst()
                .relationships( RelTypes.KNOWS, Direction.OUTGOING )
                .evaluator( Evaluators.excludeStartPosition() );


        return td.traverse( person );
    }

```
- Depuis le node _person_,  
- trouve tous les amis   
- et les amis d'amis   
- à travers la relation de type `:KNOWS` _sortante_.
- en excluant les noeuds de dépat de chaque relation 


---
template: java_inside
 
## Embedded with Neo
* Possibilité d'utiliser en base interne applicative
	* La base est démarrée par l'application

```java
GraphDatabaseService graphDb = new GraphDatabaseFactory()
            .newEmbeddedDatabaseBuilder( databaseDir )
            .newGraphDatabase();
```

* Tests "unitaires" avec base réelle en mémoire  

```java
graphDb = new TestGraphDatabaseFactory()
		.newImpermanentDatabase( databaseDir );
```

---
# Python

## Neo4j driver
* Semblable à un driver SQL
* Des requêtes Cypher
* Des curseurs

```python
from neo4j.v1 import GraphDatabase

driver = GraphDatabase.driver('bolt://localhost:7687')

names = ['Fifi', 'Riri', 'Loulou']

with driver.session() as session:
        for name in names:
            session.run('CREATE (:Person {name : {name}})', name=name)
```


---
# Python

## Py2neo
* Wrapper du driver officiel
* Intégration avec `Pandas`, `numpy`, `Sympy`
* Notion de graphe local et serveur

```python
from py2neo import Graph, Node, Relationship

graph = Graph()
donald = Node('Character',name='Donald')

for name in ['Fifi', 'Riri', 'Loulou']:
    nephew = Node('Character',name=name)
    graph.create(Relationship(donald, 'PARENT_OF',nephew))
```

.footnote[[py2neo](https://py2neo.org/v4/)]

---
class: inverse middle center

# Demo python
Si pas trop en retard


---
# OGM _Object Graph Mapping_

## L'application est le modèle
* Le meilleure moyen de garantir la cohérence.
* La bonne pratique est d'utiliser un OGM ( équivalent ORM)

.center[.big[.quote[La cohérence est garantie   
par la formalisation  
du modèle.]]]


---
# Java

## OGM Neo4j 
.footnote[[Manuel](https://neo4j.com/docs/ogm-manual/current/)]

```java
@NodeEntity
class Person {
    String name;

    @Relationship(type = "WORK_IN")
    Set<Project> projects;

    @Relationship(type = "MEMBER_OF")
    Service service;
}


@NodeEntity
class Service {
    String name;

    @Relationship(type="MEMBER_OF", direction = Relationship.INCOMING)
    Set<Person> members;
}
...

```

---
# Python

## neomodel

OGM à la Django

```python
from neomodel import (StructuredNode, StringProperty, RelationshipTo, RelationshipFrom)


class Person(StructuredNode):
    name = StringProperty(unique_index=True, required=True)
    projects = RelationshipTo('Project', 'WORK_IN')
    service = RelationshipTo('Project', 'MEMBER_OF')

class Service(StructuredNode):
    name = StringProperty(unique_index=True, required=True)
    members = RelationshipFrom('Person','MEMBER_OF')

...

```

* Très bien documenté &hearts;


---
class: inverse middle center

# Démo OGM neomodel
Si pas trop en retard



---
# Procédures APOC _Awesome Procedures On Cypher_

## Création

* Dynamique d'extension encouragée et bien [documentée](https://neo4j.com/docs/java-reference/current/extending-neo4j/procedures/) 

```java
public class Join
{
    @UserFunction
    @Description("example.join(['s1','s2',...], delimiter) - join the given strings with the given delimiter.")
    public String join(
            @Name("strings") List<String> strings,
            @Name(value = "delimiter", defaultValue = ",") String delimiter) {
        if (strings == null || delimiter == null) {
            return null;
        }
        return String.join(delimiter, strings);
    }
}

```
.footnote[[Exemple de création APOC](https://neo4j.com/blog/intro-user-defined-procedures-apoc/)]


---
class: inverse middle center
# Ce qui fâche
dans notre contexte ESR

---
class: splash middle center

# La version community est-elle insuffisante ?

TLDR; **Pas vraiment**

---
# La version community est-elle insuffisante ?
## Des fonctionnalités critiques manquantes

Comparatif (https://neo4j.com/subscriptions/)

* User Role-based security 
* Multi-Clustering (partition of clusters)
* Auto reuse of deleted space
* Property existence constraints
* Cypher query tracing, monitoring and metrics
* Node Key schema constraints

---
# La version community est-elle insuffisante ?

## Des rapports troubles avec la communauté OpenSource
* Retrait des versions _Enterprise_ depuis la [version 3.3.0](https://blog.igovsol.com/2017/11/14/Neo4j-330-is-out-but-where-are-the-open-source-enterprise-binaries.html) 

## Une politique tarifaire obscure
* Uniquement sur rendez-vous commercial
* Impossible à budgétiser dans notre contexte

.big[.quote[Possibilité de bénéficier de la licence EDU en cours d'étude]]

---
# Les solutions libres 

## Open Native Graph DB
https://www.graphfoundation.org/projects/ongdb/

Un fork de Neo4j avec les parties enterprise

Pour tester

```bash
 docker run        \
 --publish=7474:7474 \
 --publish=7687:7687  \
 --volume=$HOME/neo4j/data:/data \
 --env=NEO4J_AUTH=none  \
 graphfoundation/ongdb-enterprise:3.4
```

---
# Les solutions libres 

## Graph Stack io
https://graphstack.io/

```bash
docker run \
       --publish=7474:7474 \
       --publish=7687:7687 \
       --volume=$HOME/neo4j/data:/data \
       --env=NEO4J_AUTH=none  \
       graphstack/neo4j-enterprise:3.4
```

---
class: inverse middle
# Conclusion

* Une approche libératrice pour toute une classe de problèmes
* Un produit mature et séduisant
* Une communauté motrice
* Une politique commerciale inquiétante

# Merci 

---
class: inverse middle center
# Annexes et références

---

# Bases graphes
* [Graph Databases: Their Power and Limitations Jaroslav Pokorný](https://hal.inria.fr/hal-01444505/document)

---
# Tutos

* https://stph.scenari-community.org/contribs/nos/Neo4j2/co/Neo4j-2.html
* https://blog.octo.com/bases-de-donnees-graphes-un-tour-dhorizon/

---
# Neo4j internals

* https://fr.slideshare.net/thobe/an-overview-of-neo4j-internals
* https://www.slideshare.net/anikishaev/neo4j-after-1-year-in-production
* https://hackernoon.com/life-after-1-year-of-using-neo4j-4eca5ce95bf5
* https://image.slidesharecdn.com/neo4jinternals-120521030150-phpapp02/95/an-overview-of-neo4j-internals-12-728.jpg?cb=1337569396

---
# Cas d'études

## Cas volovo
https://fr.slideshare.net/neo4j/volvo-cars-build-a-car-with-neo4j

## Cosmic Web
* http://cosmicweb.kimalbrecht.com/viz/#1

## Panama's paper
https://fr.slideshare.net/neo4j/investigating-the-panama-papers-connections-with-neo4j-stefan-komar-neo4j


---
# Index-free adjacency
## Pro
* https://neo4j.com/blog/native-vs-non-native-graph-technology/

## Cons
* https://www.arangodb.com/2016/04/index-free-adjacency-hybrid-indexes-graph-databases/
