---
layout: post
title:  "Rigodon dans des archives inédites"
date:   2026-08-20 10:00:00 +0900
---

## Patrimoine Oral

Ce travail à pour objectif d'accéder en une étape à tout les collectages de rigodons présents dans la base Patrimoine Oral.

### Découverte

Ma méthode pour identifier tout les collectages à propos de rigodon à été la suivante:
Pour chaque fond repertorié dans l'[Inventaire des ressources autour du Rigodon](https://www.intranet.cmtra.org/avec/lib/elfinder-2.0-rc1/files/NOS%20ACTIONS/Action%20culturelle/Operation%20Rigodon/Inventaire/inventaire%20Rigodon.pdf) je recherche les notices correspondantes en cherchant le nom du ou de la collecteur·ice dans le champs "Qui ?" de la Recherche Avancée. (Attention la page "Fond" ne montre que 200 notices du fond, utiliser la recherche avancée assure de visualiser toutes les notices).

Par exemple dans le fond Patrice Lejeune j'ai consulté [cette page](https://patrimoine-oral.org/dyn/portal/index.seam?page=alo&aloId=37296&fonds=8&nat=3&cid=1198) ainsi que toutes les notices individuelles, puis les notices "Enquête auprés d'un ..." qui contiennent elles même des notices.

Je parcours la liste des notices, et sélectionne celles qui comportent un mot ressemblant à "rigodon" dans le titre ("rigaudon") et celles qui n'ont pas de nom (comme "Air de danse à l'harmonica", "Chant", "chansonnette en occitan", "Parole : description d'une procession") et celles qui pourraient être un rigodon (selon mes connaissances, par exemple "Chanson: Ma maire n'avia qu'un anhèl (2)").
Ainsi, j'ai pu râter certaines notices qui ne mentionnent pas "rigodon" dans leur titre.

J'ai aussi cherché "rigodon rigaudon" dans la recherche plein texte de patrimoine oral et suivi la même méthode. De cela en est ressortie les Rigodons des conscrits de Bresse qui n'ont aucun rapport avec la danse Rigodon présente dans les Alpes.
Ainsi que des notices contenant le mot-clé rigodon mais qui n'en sont pas (par exemple des valses etc... jouée par des informateur jouant aussi des rigodons).

(J'ouvre tout les onglets qui m'interessent, télécharge les audio correspondant (leur nom est une suite incongrue de chiffres et lettres), puis utilise un script python qui télécharge les notices grâce à leur URL et renomme les fichiers audio en fonction des notices, /!\ les urls des notices et les fichiers audio doivent être dans le même ordre).

### Selection

Je met les notices sélectionnées au format excel puis je les annote OUI si elles concernent le rigodon, NON sinon.
Certaines notices contiennent plusieurs document audio, ainsi je transforme le excel pour avoir une ligne par fichier audio.

### Consolidation

Une fois le travail de découverte puis selection effectué, je consolide les champs des notices pour le partage.
J'ai choisis de ne pas conserver certains colonnes qui apportent peu d'information (par exemple: "Affichage notice", "Ecouter - Voir", "Niveau de consultation", "Nature du document") et j'ai ajouté des colonnes pour pouvoir accéder facilement à la notice (l'"URL" et le "AloID" qui est la partie de l'url permettant d'identifier une notice en particulier, toutes les notices n'ont pas de numéro d'inventaire (!) mais elles ont toute un aloID).
Les colonnes "Responsabilité - Intervenant", "Genre du document", "Instrument", "Incipit chanson" et "Langue" ont été consolidées (le format amélioré et vérifiées à la main pour correspondre à l'enregistrement). J'ai noté le nom du rigodon ou les premières paroles dans "Incipit chanson".


- A faire:
	- ajouter une colonne parole ?
	- faire une colonne "Air" pour regrouper les rigodons avec le même air mais des paroles différentes ?
[Tableau au format Notion](https://app.notion.com/p/3e655ac9ef7280dc8d32ce02295ff0d5)
[Audios correspondants](https://as-queer-as-folk.frama.space/s/LiXqTCBrMaEjZoR) (mdp : rigodon_alpes)

- Patrice Lejeune
	- OK
- Sylvette Beraud-Williams
	- OK
- Charles Joisten
	- OK
- Pierre Adolphe Bérard (patacol)
	- OK
- Jean François Dutertre
	- OK
- Sylvestre Ducaroy
	- OK
	- Seulement des rigodons de conscrits.
- Francine Lancelot-Coursange
	- nakala
		- rien sur le rigodon seulement un fichier pdf https://nakala.fr/10.34847/nkl.feaf2j4m
	- calames
		- rien sur le rigodon ?? longs enregistrements de fêtes et farandoleurs
	- Patrimoine oral
		-54 notices sans audio accessible (cf. mucem)
- Mont-Joia
	- C'est où ?
- MnATP
	- cf. le mucem
- CDMD05
	- c'est ou ? A Gap, nouveau nom : CEDRA

## MUCEM

### Archives publiques fonds du MNATP

Est-ce que ça pourrait être intéréssant ?

- Enquête sur l'ethnologie folklorique
	- Archives Nationales : 20130277/128-20130277/149.
- Enquêtes sur les fêtes
	- Enquêtes menées par Marie-France Gueusquin.
	- Archives Nationales : 20130277/182-20130277/194.
- Mission Equihen sur le carnaval
	- Dates de l'enquête : 1965-1969.
	- Archives Nationales : 20130277/206.
- Enquête sur la fête de la moisson
	- Aussi nommée « enquête ATP IV ».
	- Archives Nationales : 20130277/167.
- Enquête sur l'atlas folklorique de la France
	- Archives Nationales : 20130277/133-20130277/149.
- Enquête sur le folklore enfantin
	- Aussi nommée « enquête ATP II » dans le premier versement.
	- Dates de l'enquête : 1937.
	- Archives Nationales : 20130277/167 ; 20130648/1-20130648/12.


Monique Brandily??

### Archives sonores

Ce que j'ai demandé au MuCEM:
- 1964.30 Velay, Vivarais.; Francine Lancelot
- 1965.59 Mission Vivarais; Francine Lancelot
- 1967.61 RCP Châtillonnais. Danse; Francine Lancelot
- 1953.04 Airs de galoubet provençal; Francine Lancolet
- 1969.52 Musique instrumentale dans le Gard; Francine Lancelot
- 1965.08 Cévennes. Enreg. L. Radioyès
- 1965.33 Aubrac. Enreg. F. Lancelot


Fond Francine Lancelot sur la Farandole : est-ce qu'il y a que du galoubet tambourin, fifre ou du violon ou accordéon par exemple?

Ce que je pourrais demander:
- 1951.03 Danses de Haute-Savoie
- 1957.11 Haute-Savoie, St-Véran Airs de danse, accordéon
- 1964.23 Hautes-Alpes, St-Véran 1963
- 1961.08 Enreg. effectués dans le Comté de Nice


## Pour comparaison
Je recherche "contiens au moins un mot" : "rigaudon rigodon" au 22/09/2026 il y a 92 résultats.

```python
aloID = ['28993', '28996', '28997', '29004', '29005', '29020', '29160',
'29168', '29182', '29183', '29196', '29470', '29477', '29490', '29492',
'29496', '30209', '30212', '30355', '30360', '30365', '30366', '30448',
'30449', '30451', '30461', '30492', '30496', '30498', '30502', '30511',
'30557', '30558', '31449', '31624', '31626', '31630', '31637', '31849',
'31856', '31936', '31939', '31940', '31941', '31942', '31943', '31944',
'31945', '31986', '31987', '36815', '36821', '36827', '37086', '37107',
'37123', '37128', '37132', '37153', '37154', '37157', '37170', '37183',
'37239', '37253', '37254', '37263', '37264', '40341', '40572', '40616',
'40654', '40659', '40783', '40784', '40785', '40786', '40787', '40789',
'40790', '40791', '40793', '40794', '40795', '40796', '40797', '40798',
'40799', '40800', '40910', '40940', '40941']
```