<!-- Auteur: Ygor Gallina, Audrey Queudet ; Date: 2024/04/09 -->

# TP11 - Gestion de la mémoire


La mémoire virtuelle d'un processus est constituée d'un ensemble de _régions_. Une région est une portion continguë de la mémoire virtuelle d'un processus. A chaque région le système associe des protections et un rôle particulier.

**Objectif**: visualiser et comprendre l'organisation de la mémoire virtuelle des processus.

## Travail à effectuer

1. Compilez puis éxecutez le programme C++ suivant.
2. Compilez maintenant le programme avec l'option `-static`.
3. Quelle différence y a-t-il entre les deux manières de compiler ? (Exécutez plusieurs fois les programmes pour le voir).
4. Que signifient les mots `heap` et `stack` ?
5. A quoi correspondent les deux premiers chiffres de chaque ligne la carte de la mémoire ?

6. A l'aide de la carte de la mémoire:
	1. identifiez les différentes zones mémoires
	2. assignez l'adresse de chaque variable à la zone mémoire
	3. nommez les zones mémoires selon ce qu'elles contiennent

```
2b6a - 4b1a : Variables
	2b6a : x

4b1a - 6b2a : Fonctions
	4b1a : f1
```

7. Quelles sont les adresses des cases 0, 1 et 2 du tableau `tab` ? Qu'ont-elles de particulier ?
8. Quelle est la différence entre l'adresse de `a` dans `une_fonction` et `une_fonction2` ? A quoi est-elle due ?

8. Pour aller plus loin: Que se passe-t-il dans la carte de la mémoire lorsqu'un thread est créé ?

Vous devriez avoir un fichier de cette forme:

```cpp
#include <iostream>
#include <unistd.h> 
#include <stdio.h> // pour snprintf()
#include <cstdlib> // pour system()

using namespace std;

int une_globale;
int une_autre=4;
int * tab;
char* alloc;

void une_fonction2(int &a) {
	int b;
	cout << hex << &a << "adresse de a dans une_fonction2" << endl;
	cout << hex << &b << "adresse de b dans une_fonction2" << endl;
}

void une_fonction(int a) {
	int b;
	cout << hex << &a << "adresse de a dans une_fonction" << endl;
	cout << hex << &b << "adresse de b dans une_fonction" << endl;
	une_fonction2(b);
}

int main() {
	int une_locale;
	tab = new int [3] ;
	for (int i = 0; i < 3 ; i++) {
			tab[i] = 2+i;
	}

	cout << "PID = " << getpid() << endl;
	cout << hex << &une_globale << " : adresse de une_globale" << endl;
	cout << hex << &une_autre << " : adresse de une_autre" << endl;
	cout << hex << &une_locale << " : adresse de une_locale" << endl;
	cout << hex << tab << " : adresse de tab" << endl;
	cout << hex << &tab << " : adresse de &tab" << endl;
	cout << hex << &cout << " : adresse de cout" << endl;
	cout << hex << &"une_constante" << " : adr. \"une_constante\"" << endl;
	cout << hex << (long long)&une_fonction << " : adr. de une_fonction" << endl;
	cout << hex << (long long)&une_fonction2 << " : adr. de une_fonction2" << endl;
	cout << hex << (long long)&exit << " : adresse de exit" << endl;
	// On a besoin de convertir l'adresse de `une_fonction` en `long long` car l'opérateur `<<` converti automatiquement le type de la fonction en booléen

	une_fonction(4);
	
	/* afficher la carte de mémoire */
	cout << endl << "-- Carte de la mémoire --" << endl;
	alloc = new char[30];
	snprintf(alloc, 30, "cat /proc/%d/maps", getpid());
	system(alloc);
	delete [] alloc;
	delete [] tab;
	return 0;
}
```