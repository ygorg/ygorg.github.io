# TP Données non structurées et sémantique

Si vous avez déjà installé python passez directement à [l'installation des paquets](#libraries).

## Pré-requis

- Avoir accès à python et un terminal.
- Avec linux et mac aucun soucis.
- Avec windows,
	- invité de commande : si vous êtes **très** à l'aise avec, utilisez le (mais je n'ai aucune connaissance donc j'aurais du mal à vous aider si ça ne fonctionne pas, et certaines bibliothèque peuvent avoir des soucis de compatibilité)
	- [WSL](https://docs.microsoft.com/en-us/windows/wsl/install-win10) (Windows Subsystem for Linux):  le sous-système linux est très pratique je vous le conseil. (mais seulement compatible avec windows 10)

### Installer python >=3.7

- Sous linux avec le gestionnaire de paquet
	1. `$ sudo apt install python3` pour ubuntu
- Sous macos
	1. via le gestionnaire de paquet [homebrew](https://brew.sh/)
		- installer homebrew
		- puis `$ brew install python3`
	2. via le site internet [python](https://www.python.org/downloads/)
- Sous windows
	1. via WSL: cf. linux
	2. via [anaconda](https://www.anaconda.com/products/individual).
		- **/!\\**  cela installe python dans windows il faudra donc utiliser l'invite de commande de windows !
	3. via [google collab](https://colab.research.google.com/notebooks/intro.ipynb)
	4. via le site internet [python](https://www.python.org/downloads/)
		- **/!\\** à utiliser en dernier recours !

### Vérifications

[`pip`](https://pip.pypa.io/en/stable/) le gestionnaire de paquet python [devrait déjà](https://pip.pypa.io/en/stable/installing/#do-i-need-to-install-pip) être installé si vous utilisez une version *récente* (>3.5) de python.

Vérifiez que vous arrivez à lancer un interpreteur python et que pip est installé:
- `$ python3` (devrait afficher la version de python)
	- opt: vérifiez si `$ python` lance la même version de python
- `$ python3 -m pip -V` vérifie si pip est installé, affiche la version de pip et le python auquel il est lié
	- opt: vérifiez si `$ pip -V` est lié à la même version de python

- Si `pip` n'est pas installé
	- `python3 -m ensurepip --upgrade`
	- sinon `curl https://bootstrap.pypa.io/get-pip.py; python3 get-pip.py`


## Bibliothèques python {#libraries}

Installez les paquets suivant avec `python3 -m pip install PAQUET` ou `pip install PAQUET` (si vous êtes sûr que vous utilisez le bon pip !)

##### Nécéssaire

- **jupyter** : pour utiliser les jupyter notebook
- **nltk** : bibliothèque de NLP
	- puis ouvrir un interpreteur python et lancer la commande
	- `import nltk; nltk.download(['punkt', 'snowball_data', 'words'])`
- **matplotlib** : pour faire des graphiques
- **sklearn** : pour faire de l'apprentissage automatique

##### A titre informatif

Ces modules sont très utilisés en TALN, mais ne seront pas utilisés dans ce TP.
- **pandas** : pour gérer des données tabulaires
- **spacy** : bibliothèque de NLP
	- puis `$ python3 -m spacy download fr` pour télécharger le modèle français
- **stanza** : pour utiliser stanford coreNLP
- **gensim** : pour utiliser des plongements de mots (embedding)

## Complément sur les multiples versions de python et pip

En général plusieurs versions de python sont installé sur un même ordinateur. Un python2 pour la compatibilité et une ou plusieurs versions de python3 suivant votre utilisation de python. Il est commun de devoir lancer la commande `python3.7` (par exemple) pour lancer la version que l'on veut, car `python` ne lance pas la bonne version. Chaque version de python à sa propre version de `pip`, c'est pourquoi je préfère utiliser `python3.7 -m pip install PAQUET` (par exemple) plutôt que `pip` qui peut être lié à python2 ou une autre version de python3 !