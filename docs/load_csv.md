```cypher
LOAD CSV WITH HEADERS FROM "https://data.enseignementsup-recherche.gouv.fr/explore/dataset/fr-esr_referentiel_metier_referens_3/download/?format=csv&timezone=Europe/Berlin&use_labels_for_header=true" AS line FIELDTERMINATOR ';'
MERGE 
(bap:BAP 
	{code: line.`Code de la branche d’activité professionnelle`,
	 label: line.`Branche d’activité professionnelle`}
)
MERGE (codeEmploiType:EmploiType {
	code: line.`Code emploi type`,
    label: line.`Intitulé de l’emploi type`
})
MERGE (codeEmploiType)-[:IS_IN]->(bap)
    
return bap, codeEmploiType
```


