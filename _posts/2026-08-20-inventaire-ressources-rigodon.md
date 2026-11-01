---
layout: post
title:  "CMTRA - Inventaire des ressources autour du Rigodon"
date:   2026-08-20 10:00:00 +0900
---

* TOC
{:toc}

Ce post est une version textuelle revue et augmentée (voir historique git du fichier) de l'"Inventaire des ressoureces autour du Rigodon" mis en ligne par le CMTRA en septembre 2021.
J'essaie au maximum d'établir si la piste contient du chant (si j'ai accès à un enregistrement).

[Document original](https://www.intranet.cmtra.org/avec/lib/elfinder-2.0-rc1/files/NOS%20ACTIONS/Action%20culturelle/Operation%20Rigodon/Inventaire/inventaire%20Rigodon.pdf)


# Inventaire des ressources autour du Rigodon
{:.no_toc}

Dans le souhait de centraliser et valoriser les sources nombreuses et éparses ayant trait au rigodon, plusieurs membres impliqués dans l'étude et la pratique du rigodon se sont réunis au sein d'un groupe de travail accompagné par le CMTRA. En découle cet inventaire non exhaustif mais déjà bien fourni de collectes, enquêtes, publications livre, CD et DVD, objets pédagogiques, textes ou vidéos en ligne, pouvant alimenter la connaissance de chacun. Si les ressources ne sont pas disponibles en ligne, que le lieu de consultation n'est pas indiqué, elles se trouvent peut-être dans la bibliothèque d'associations ou de particuliers. Contactez-nous !

Si vous souhaitez contribuer à l'inventaire, vous pouvez écrire au CMTRA : collections@cmtra.org.

Merci à vous et bonnes recherches !

L'équipe du CMTRA tient à remercier Guillaume Veillet, Patrick Mazellier, Robin Vargoz, Christian Vignon, Véronique Éluard, Jean-Paul Biessy, Jean-Michel Effantin, Olivier Richaume pour leur travail.

## Bibliographie

<div id="bibliography-list">
  <input class="fuzzy-search" placeholder="Rechercher..."/>
  <span class="sort" data-sort="year">Tri par année</span>
  <span class="sort" data-sort="terroir">Tri par terroir</span>
<ul class="list">
{% for entry in site.data.rigodon_bibliography %}
	<li data-year="{{entry.sort_year | default: entry.year}}" data-entry="{{entry.type}}" data-terroir="{{entry.terroir}}" data-link="{{entry.link}} {{entry.partition}} {{entry.consulter}} {{entry.acheter}}">
		<span style="display: none" class="words">
			{%- for attr in entry -%}
			  {{ attr[1] | append: "" | slugify: "latin" | replace: "-", " "}} {% endfor -%}
		</span>
		<div>
			{% if entry.consulter %}
				<a href="{{entry.consulter}}" target="_blank"><img width="24px" src="/assets/icons/book.svg"/></a>
			{% endif %}
			{% if entry.partition %}
				<a href="{{entry.partition}}" target="_blank"><img width="24px" src="/assets/icons/sheet_music.svg"/></a>
			{% endif %}
			{% if entry.link %}
				<a href="{{entry.link}}" target="_blank"><img width="24px" src="/assets/icons/info.svg"/></a>
			{% endif %}
			{% if entry.acheter %}
				<a href="{{entry.acheter}}" target="_blank"><img width="24px" src="/assets/icons/shopping_cart.svg"/></a>
			{% endif %}
			<!---->
			{{entry.author}}.{% if entry.year %} ({{entry.year}}).{% endif %} <span style="font-style: italic">{{entry.title}}</span>.
			{% if entry.booktitle %}
			In {% if entry.editor %}{{entry.editor}}, {% endif %}<span>"{{entry.booktitle}}"</span>
			{% endif %}
			{% if entry.pages %} (pp. {{entry.pages}}).{% endif %}
			{% if entry.publisher %} {{entry.publisher}}{% if entry.address %}, {{entry.address}}{% endif %}.{% endif %}
		</div>
		<div>
			{% if entry.note %}<span class="note">{{entry.note}}</span>{% endif %}
			{% if entry.terroir %}<span>{{entry.terroir}}</span>{% endif %}
		</div>
	</li>
{% endfor %}
</ul>
</div>


## Autres ressources en ligne

* Doc sonore « Chemin de Rigodon » par Caroline Fontana
	- [labandesonore.fr](https://www.labandesonore.fr/rigodons/)
* Émission Musiques de sacs et de cordes, sur le violon des alpes
	- Alpes
	- [radioblv.com](https://www.radioblv.com/work/musiques-de-cordes-et-de-sacs/#media-audio-counter-46)
* Territoire Dansé (cartographie des pratiques de danse dans la Drôme)
	- Drôme
	- [maison-de-la-tour.fr](http://www.maison-de-la-tour.fr/territoire-danse/#/)
* Chaine youtube Cie du Rigodon / violon avec Perrine Bourel...
	- [youtube.com](https://www.youtube.com/channel/UCASQ8rcr7kTpSf_1dK9_WZw)
* Enregistrement de Rural Café
	- [youtube.com](https://www.youtube.com/watch?v=xPjqLNgU7NI)
- Impro rigodon dansé Duo Vargoz - Gros bal du vercors 2019
	- Vercors
	- [youtube.com](https://www.youtube.com/watch?v=X0P0A_uQf4A)
- Folk des Terres Froides - Barco Viro
	- [youtube.com](https://www.youtube.com/watch?v=fuMDkeRsBMM)
- Airs de rigodon du Gapençais par Rural Café (violon, cornemuse, bouzouki, contrebasse, percus...)
	- [youtube.com](https://www.youtube.com/watch?v=FLz0N4_c_UQ)
- Rigodon du Vercors Las filhas de la San Marti - Violon : Patrick Mazellier / Atelier danse Véronique Elouard, 2017
	- Vercors
	- [youtube.com](https://www.youtube.com/watch?v=wk-mjE7cZAE)
- CMTRA, Ce que l’archive sonore ne transmet pas : l’exemple du rigodon, 2022
	- [infrasons.prg](https://infrasons.org/article/37/Ce-que-l-archive-sonore-ne-transmet-pas-l-exemple-du-rigodon/)
- Danses traditionnelles en vivarais, L'Echo des Garrigues, 2023
	- Ardèche
	- #1 Veni ve la font rigodon valse [youtube.com](https://www.youtube.com/watch?v=zPh5ktiuluo)
	- #2 Chasteu [youtube.com](https://www.youtube.com/watch?v=QyqPDeOhdTg)
	- #3 Rigodons Les filles de mai, Quand ma mio vin me veire [youtube.com](https://www.youtube.com/watch?v=3PbStHaEuOc)
	- #4 Les Vires du Coiron : A Lavilledieu, Coquinas de Peire [youtube.com](https://www.youtube.com/watch?v=QQAXUM7HQaI)

## Archives sonores inédites

- Fonds Claude Flagel / Terres d'Empreintes
	- Champsaur.
	- La famille de Claude Flagel (1932-2020) a récemment confié à Guillaume Veillet et Terres d'Empreintes 3 bandes inédites de collectage enregistrées auprès du violoneux Émile Escalle de Molines en Champsaur. Déjà numérisées par Claude Flagel lui-même, elles datent de 1972, et figurent donc parmi les collectes les plus anciennes (la plus ancienne ?) concernant M. Escalle. Cotes de pré-inventaire FLA-S-114/115/116. (Contenu en cours d'écoute et de documentation)
- Fonds Guillaume Veillet / Terres d'Empreintes
	- Champsaur.
	- Quelques mentions du violoneux Félicien Philippe (du Château d'Ancelle) dans une série d'entretiens réalisés en février 2019 à Gap et Ancelle sur son histoire familiale (notamment auprès des frères Maizel d'Ancelle, ayant bien connu ce violoneux).
- Fonds Devigne à la BnF (enquête de 1939).
	- [comitehistoire.bnf.fr](http://comitehistoire.bnf.fr/dictionnaire-fonds/roger-d%C3%A9vigne)
- Fonds Francine Lancelot-Coursange
	- Ardèche, Haut et bas Vivarais, Cévennes et Coiron
	- Travail d'inventaire et relevés effectués par P Mazellier dans le cadre des Rencontres 2019
	- [nakala.fr](https://nakala.fr/collection/10.34847/nkl.ecb6831m) ? [calames.abes.fr](https://calames.abes.fr/pub/#details?id=FileId-3413) ?
- Fonds Michel Colleu
	- Champsaur
	- Enregistrement d'Emile Escalle dans les années 1970
- Fonds Association Mont-Joia
	- Champsaur
	- Enquêtes de 1978 auprès d'Emile Escalle / MMSH
	- [calames.abes.fr](https://calames.abes.fr/pub/ms/Calames-2023111717445134880)
- Enquêtes de Dominique Laperche et Aline Sevila
	- Ardèche (Coiron)
	- Non déposées
- Fonds MnATP
	- Champsaur
	- Enquête de Brigitte Cardon-Labossière en 1973 auprès d'Emile Escalle (cote 73.30) / MMSH
	- [calames.abes.fr](https://calames.abes.fr/pub/ms/Calames-20211214111243542)
- Fonds Christian Portron / CDMD05
	- Champsaur
	- Enquête auprès d'Emille Escalle vers 1982 / MMSH
	- [calames.abes.fr](https://calames.abes.fr/pub/ms/Calames-202312071458319461) ? [calames.abes.fr](https://calames.abes.fr/pub/ms/Calames-202212151504381) ?
- Fonds Jean-Paul Dumas / CDMD05
	- Champsaur
	- Enquête auprès d'Emille Escalle vers 1980 / MMSH
- Fonds Olivier Richaume & Valérie Pasturel / CDMD05
	- Hautes-Alpes
	- Diverses enquêtes (musique, témoignages) dans les Hautes-Alpes dans les années 1990 / MMSH
	- [calames.abes.fr](https://calames.abes.fr/pub/ms/Calames-202312071458319461) ? [calames.abes.fr](https://calames.abes.fr/pub/ms/Calames-202212151504381) ?
- Fonds Junqué-Oc/Jean Moureu
	- Monts de Lacaune
	- Quelques airs de rigodon joués par Charles Alexandre / Inoc Aquitania
	- [occitanica.eu](https://www.occitanica.eu/items/show/57066) (il faut cliquer sur les titres pour les écouter)
- Fond Patrick Mazellier
	- Champsaur Triéves, Vercors, Vivarais..
	- Musée Dauphinois / CMTRA / Ainsi que quelques fonds non déposés / [ruralcafe.com](http://www.ruralcafe.com/recherches-et-ethnomusicologie/)

### Patrimoine Oral

Ce document rassemble au format tableur les archives disponibles sur le site Patrimoine Oral [notion.com](https://app.notion.com/p/3e655ac9ef7280dc8d32ce02295ff0d5) (ou .xlsx ici [frama.space](https://as-queer-as-folk.frama.space/s/C6Y7rcQj3ZMD69s)). Les fichiers audio correspondants sont aussi ici [frama.space](https://as-queer-as-folk.frama.space/s/LiXqTCBrMaEjZoR) <span style="font-size: 0.7rem;">(mot de passe: une danse un _ et un nom de montagne, pas de majuscules)</span>. Pour en savoir plus sur la [méthodologie](/2026/08/20/rigodon-archives-inedites.html
).

- Fonds Patrice Lejeune
	- Vercors + Plateau Ardéchois
	- [patrimoine-oral.org](http://patrimoine-oral.org/dyn/portal/index.seam?page=alo&aloId=37296&fonds=8&nat=3&cid=1198)
- Fonds Sylvette Béraud-Williams
	- Ardèche (Boutières)
	- [patrimoine-oral.org](http://patrimoine-oral.org/dyn/portal/index.seam?page=alo&aloId=37689&fonds=8&nat=3&cid=1346)
- Fonds Charles Joisten / Musée Dauphinois
	- Champsaur
	- [patrimoine-oral.org](http://patrimoine-oral.org/dyn/portal/index.seam?page=alo&aloId=31770&fonds=8)
- Fonds Pierre Adolphe Bérard, dit Patacol
	- Valbonnais (Isère)
	- [patrimoine-oral.org](http://patrimoine-oral.org/dyn/portal/index.seam?page=alo&aloId=40777&fonds=8&nat=3&cid=3368)
- Fonds Sylvestre Ducaroy
	- Bresse
	- [patrimoine-oral.org](http://patrimoine-oral.org/dyn/portal/index.seam?page=alo&aloId=27194&fonds=&nat=3&cid=345)
- Enquête auprès d'un chanteur à danser du plateau du Coiron (Jean-François Dutertre)
	- Ardèche (Coiron)
	- [patrimoine-oral.org](http://patrimoine-oral.org/dyn/portal/index.seam?page=alo&aloId=29759&fonds=3&cid=50)


## Enregistrements de collecte édités

<div id="edited-list">
  <input class="fuzzy-search" placeholder="Rechercher..."/>
  <span class="sort" data-sort="year">Tri par année</span>
  <span class="sort" data-sort="terroir">Tri par terroir</span>
<ul class="list">
{% for entry in site.data.rigodon_edited %}
	<li data-year="{{entry.sort_year | default: entry.year}}" data-entry="{{entry.type}}" data-terroir="{{entry.terroir}}" data-link="{{entry.link}} {{entry.partition}} {{entry.consulter}} {{entry.acheter}}">
		<span style="display: none" class="words">
			{%- for attr in entry -%}
			  {{ attr[1] | append: "" | slugify: "latin" | replace: "-", " "}} {% endfor -%}
		</span>
		<div>
			{% if entry.consulter %}
				<a href="{{entry.consulter}}" target="_blank"><img width="24px" src="/assets/icons/headphones.svg"/></a>
			{% endif %}
			{% if entry.partition %}
				<a href="{{entry.partition}}" target="_blank"><img width="24px" src="/assets/icons/sheet_music.svg"/></a>
			{% endif %}
			{% if entry.link %}
				<a href="{{entry.link}}" target="_blank"><img width="24px" src="/assets/icons/info.svg"/></a>
			{% endif %}
			{% if entry.acheter %}
				<a href="{{entry.acheter}}" target="_blank"><img width="24px" src="/assets/icons/shopping_cart.svg"/></a>
			{% endif %}
			<!---->
			{{entry.author}}.{% if entry.year %} ({{entry.year}}).{% endif %} <span style="font-style: italic">{{entry.title}}</span>.
			{% if entry.booktitle %}
			In {% if entry.editor %}{{entry.editor}}, {% endif %}<span>"{{entry.booktitle}}"</span>
			{% endif %}
			{% if entry.pages %} (pp. {{entry.pages}}).{% endif %}
			{% if entry.publisher %} {{entry.publisher}}{% if entry.address %}, {{entry.address}}{% endif %}.{% endif %}
		</div>
		<div>
			{% if entry.note %}<span class="note">{{entry.note}}</span>{% endif %}
			{% if entry.terroir %}<span>{{entry.terroir}}</span>{% endif %}
		</div>
		<ul>
		{% for p in entry.pistes %}
			   <li>{{ p }}</li>
		{% endfor %}
		</ul>
	</li>
{% endfor %}
</ul>
</div>

## Discographie : réinterprétations

<div id="interpretation-list">
  <input class="fuzzy-search" placeholder="Rechercher..."/>
  <span class="sort" data-sort="year">Tri par année</span>
  <span class="sort" data-sort="terroir">Tri par terroir</span>
<ul class="list">
{% for entry in site.data.rigodon_interpretation %}
	<li data-year="{{entry.sort_year | default: entry.year}}" data-entry="{{entry.type}}" data-terroir="{{entry.terroir}}" data-link="{{entry.link}} {{entry.partition}} {{entry.consulter}} {{entry.acheter}}">
		<span style="display: none" class="words">
			{%- for attr in entry -%}
			  {{ attr[1] | append: "" | slugify: "latin" | replace: "-", " "}} {% endfor -%}
		</span>
		<div>
			{% if entry.consulter %}
				<a href="{{entry.consulter}}" target="_blank"><img width="24px" src="/assets/icons/headphones.svg"/></a>
			{% endif %}
			{% if entry.partition %}
				<a href="{{entry.partition}}" target="_blank"><img width="24px" src="/assets/icons/sheet_music.svg"/></a>
			{% endif %}
			{% if entry.link %}
				<a href="{{entry.link}}" target="_blank"><img width="24px" src="/assets/icons/info.svg"/></a>
			{% endif %}
			{% if entry.acheter %}
				<a href="{{entry.acheter}}" target="_blank"><img width="24px" src="/assets/icons/shopping_cart.svg"/></a>
			{% endif %}
			<!---->
			{{entry.author}}.{% if entry.year %} ({{entry.year}}).{% endif %} <span style="font-style: italic">{{entry.title}}</span>.
			{% if entry.booktitle %}
			In {% if entry.editor %}{{entry.editor}}, {% endif %}<span>"{{entry.booktitle}}"</span>
			{% endif %}
			{% if entry.pages %} (pp. {{entry.pages}}).{% endif %}
			{% if entry.publisher %} {{entry.publisher}}{% if entry.address %}, {{entry.address}}{% endif %}.{% endif %}
		</div>
		<div>
			{% if entry.note %}<span class="note">{{entry.note}}</span>{% endif %}
			{% if entry.terroir %}<span>{{entry.terroir}}</span>{% endif %}
		</div>
		<ul>
		{% for p in entry.pistes %}
			   <li>{{ p }}</li>
		{% endfor %}
		</ul>
	</li>
{% endfor %}
</ul>
</div>


## Archives Audiovisuelles

- Film (muet), filmé à Clelles en 1946, durée 1mn - Déposé au musée Dauphinois par Geneviève Chuzel et Patrick Mazellier
	- Trièves.
	- Musée Dauphinois / Non visible pour le grand public actuellement
- Montage divers films sur le rigodon réalisé pour l'exposition « Les violons du Rigodon » 1994 dont film sur Escalle, A Istier...
	- Triéves, Beaumont, Matheysine, Coiron..
	- Montage de films anciens et contemporains concernant principalement la danse du rigodon réalisés par Olivier Richaume dans le cadre de l'exposition Les violons du Rigodon (1994)
- Extrait film Adieu Paysans (Audrey Maurion, 2014), images d'archives 1947 ?
	- très court extrait de 10 secondes entre 0'40 et 0'50
- Extrait film Enterrement de la vie de garçon, 1965
	- Voiron (38) / Nom du groupe inconnu
- RIGODONS & TRADITIONS voir DVD Pas à Pas...
	- Vercors, Trièves, Dévoluy, Champsaur
	- Film sur 4 régions avec la participation "d'anciens" dansant leur RIGODON.


## A classer
Bout de rigodon chanté:
https://www.labandesonore.fr/inventaire-rigodon/
https://www.youtube.com/watch?v=TvJZ-3eLBeA
https://www.youtube.com/watch?v=DMVHdRoVegs


<script src="https://cdnjs.cloudflare.com/ajax/libs/list.js/2.3.1/list.min.js"></script>

<style>
#bibliography-list.li {
		margin-bottom: 10px;
}
.note {
	color: grey;
}
.sort {
  padding:5px 15px;
  border-radius: 6px;
  border:none;
  display:inline-block;
  color:#fff;
  text-decoration: none;
  background-color: #666;
}
.sort:hover {
  text-decoration: none;
  background-color:#888;
}
.sort.asc::before{
	content: "⬆";
}
.sort.desc::before{
	content: "⬇";
}

html {
	scroll-behavior: smooth;
}

.section-nav, #markdown-toc {
  /*display: none;*/
  position: fixed;
  top: 62px;
  right: 5px;
  width: 10em;
  white-space: nowrap;
  font-size: 1em;
  padding-left: 0;
  border-left: 1px solid #e8e8e8;
  background-color: rgba(255, 255, 255, 0.7);
  @media (max-width: 1024px) {
	display: block;
  }

	list-style: none;
	margin: 0;
	padding: 0;
  ul, ol {
	list-style: none;
	margin: 0;
	padding: 0;
  }
  li {margin-left: 1rem;}
  li.active > a {
	color: #333;
	font-weight: 500;
  }

  a {
	overflow: hidden;
	text-overflow: ellipsis;

	text-decoration: none;
	display: block;
	padding: .125rem 0;
	color: #ccc;
	transition: all 50ms ease-in-out;
  }
  a:hover, a:focus {
	color: #666;
  }
}
</style>

<script>
function createScrollObserver(element) {
	//From https://codepen.io/bramus/pen/ExaEqMJ
	if (element === null) {
		return;
	}
	if (typeof element === 'string') {
		element = document.querySelector(element);
	}

	const observer = new IntersectionObserver(entries => {
		entries.forEach(entry => {
			const id = entry.target.getAttribute('data-heading');
			if (entry.intersectionRatio > 0) {
				element.querySelector(`li a[href="#${id}"]`).parentElement.classList.add('active');
			} else {
				element.querySelector(`li a[href="#${id}"]`).parentElement.classList.remove('active');
			}
		});
	});

	// Track all sections that have an `id` applied
	document.querySelectorAll('section[data-heading]').forEach((section) => {
		observer.observe(section);
	});
}

function main() {
	createScrollObserver('#markdown-toc');
	var options = {
		valueNames: [
			{data: ['year', 'terroir', 'entry', 'link']},
			'words'
		],
		searchColumns: ['words']
	};
	new List('bibliography-list', options);
	new List('edited-list', options);
	new List('interpretation-list', options);
}

// Ajoute les sections pour le IntersectionObserver
document.addEventListener('DOMContentLoaded', () => {
	// From perplexity AI
	const headings = Array.from(document.querySelectorAll('h1, h2'));
	if (!headings.length) return;

	const body = document.querySelector('.post-content');

	for (let i = 0; i < headings.length; i++) {
	  const h = headings[i];
	  if (h.tagName !== 'H2') continue; // only wrap sections starting at h2

	  // 1. Create section
	  const section = document.createElement('section');
	  // 2. Move nodes after this h2 until next h1/h2 into section
	  let next = h.nextSibling;
	  while (next) {
		if (next.nodeType === 1 && /^(H1|H2)$/.test(next.nodeName)) break;
		let tmp = next;
		next = next.nextSibling;
		section.appendChild(tmp);
	  }

	  // 4. Insert section where h2 originally was
	  section.setAttribute('data-heading', h.id);
	  //h.id = null;
	  body.insertBefore(section, h); // h is now inside section, but insertBefore still works

	  section.insertBefore(h, section.firstChild);
	}
});

document.addEventListener('DOMContentLoaded', main);
</script>