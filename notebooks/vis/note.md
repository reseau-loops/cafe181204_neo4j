## Installer visjs

Normalement les librairies sont dans le répertoire _vis/_

Si vous souhaitez avoir la dernière version, descendez les librairies _vis.js_ et _vis.css_ depuis http://visjs.org/#download_install dans un répertoire _vis/_.

```
vis/
  vis.js
  vis.css
```

### Afficher les résultats dans _vis_

_vis_ fait correspondre une liste de _nodes_ et de _edges_.

```js
var nodes = [{"id": 1, "label": "Harry", "group": "United States"}, 
             {"id": 2, "label": "Barak Obama", "group": "United States"}, 
             {"id": 3, "label": "Miley Cyrus", "group": "United States"}, 
             {"id": 4, "label": "Pope Francis", "group": "Vatican"}, 
             {"id": 5, "label": "Vladimir Putin", "group": "Rusia"}];
var edges = [{"from": 1, "to": 2}, 
             {"from": 1, "to": 3}, 
             {"from": 2, "to": 4}, 
             {"from": 2, "to": 5}];
```

Pour convertir les résultats issus de _py2neo_, nous utiliserons des scripts de conversions.