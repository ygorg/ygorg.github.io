
// Définition de la fonction "poly2degre" qui prend 4 arguments (x, a, b et c)
// Exemple de fonction qui renvoie le résultat à un X d'un polynome du second degré
function poly2degre(x, a, b, c) {
  result = (a * x * x) + (b * x) + c;
  return result;
}


// Appel de la fonction "poly2degre" et stockage de son résultat dans la
//  variable "resultat"
// La fonction "poly2degre" demande 4 arguments alors on lui donne 4 valeurs
// L'ordinateur va remplacer "poly2degre(1, 1, 2, 3)" par son résultat (ici 6)
resultat = poly2degre(1, 1, 2, 3);
Ecrire("Affichage de Ecrire(resultat);");
Ecrire(resultat);
// On peut aussi écrire
Ecrire("Affichage de Ecrire(poly2degre(1, 1, 2, 3));");
Ecrire(poly2degre(1, 1, 2, 3));


// Quand on écrit
Ecrire("Affichage de Ecrire('Bonjour');");
Ecrire('Bonjour');
// on appelle la fonction "Ecrire" avec 1 argument
// Mais cette fonction ne renvoie rien, elle s'occupe de faire un affichage
Ecrire("Affichage de temporaire = Ecrire('Bonjour')");
temporaire = Ecrire('Bonjour');
Ecrire("Affichage de Ecrire(temporaire);");
Ecrire(temporaire);


function test(a, b, c) {
  Ecrire('Parametre a : ' + a);
  Ecrire('Parametre b : ' + b);
  Ecrire('Parametre c : ' + c);
}

test(3); // Affiche 3, undefined, undefined
// Dans la plupart des langages de programmation si un argument n'est pas donnée
//  le programme s'arrête et affiche une erreur

// Variables globales
var position_finish_line = 200;
var position_x = 0;

// Fonction qui dessine une ligne d'arrivée elle ne renvoie rien, elle sert à
//  regrouper un ensemble de ligne de code qui fait une chose précise, et permet
//  d'abstraire son utilisation. Par exemple, grâce à la fonction il est facile
//  de changer la position de la ligne d'arrivée.
function draw_finish_line(x, y, w, h) {
  // x, y, w et h sont des variables locales, elles n'existent que dans cette
  //  fonction
  var color; // Variable locale
  w = Math.floor(w / 2);
  h = Math.floor(h / 10);
  Texte(20, 20, w + ' '+ h);
  for (var i = 0; i < 2; i++) {
    for (var j = 0; j < 10; j++) {
      if ((i % 2) != (j % 2)) {
        color = 'white';
      } else {
        color = 'black';
      }
      RectanglePlein(x + i*w, y + j*h, w, h, color);
    }
  }
}

// Fonction qui dessine le joueur
// Faire une fonction pour ça permet de modifier l'apparence du joueur très
//  facilement
function draw_player(x) {
  RectanglePlein(x, 300, 10, 20);
}

// Fonction qui renvoie vrai ou faux suivant si le joueur à gagné
// On aurais pu ne donner aucun parametre à cette fonction et utiliser les
//  variables globales
function has_win(player_x, finish_line_x) {
  if (player_x > finish_line_x) {
    return true;
  } else {
    return false;
  }
}


// Met à jour la position du joueur
// position_x est une variable globale !
function move_player() {
  // Si on écrit "var position_x;" alors la variable globale position_x ne sera
  //  pas modifiée 
  position_x = position_x + 1;
}

// Affiche un message pour signifier que le jeu est gagné
function display_win_message() {
  setCanvasFont('helvetica', '100pt', '');
  Texte(300, 400, 'Gagné !', 'black');
  setCanvasFont('helvetica', '12pt', '');
}


// Boucle principale
// En utilisant le maximum de fonction
// Cela permet de bien découper le code et si les fonctions sont bien nommées on
//  comprend le code juste en lisant sans pour autant savoir exactement comment
//  le code fonctionne derrière
function draw() {
  Initialiser();
  move_player(); // Modifie position_x
  
  draw_finish_line(position_finish_line, 250, 20, 100);
  draw_player(position_x);
  
  if (has_win(position_x, position_finish_line)) {
    display_win_message();
  }
}

Loop(-1);
// Loop est une fonction qui met en place un chronomètre de 1 milliseconde et
//  dès que ce chronomètre arrive à 0 il est remis a 1 milliseconde et la
//  fonction draw est appelée.
// On dit que draw est une fonction !asynchrone! comme MouseClick et Keypressed.
// Le programme continue après que Loop ai été appellée, mais dès qu'un
//  évenement arrive (un clic de souris, chronomètre arrive à 0, quelqu'un
//  enfonce une touche du clavier, ...) le programme fait une "pause" dans son
//  execution et execute la fonction liée à l'évènement
// https://www.w3schools.com/js/js_events.asp

// Le programme ne reste pas indéfiniment dans Loop :
Ecrire("Après Loop(-1);");

// Sans utiliser aucune fonction
// C'est moins lisible et si on veut modifier quelque chose c'est plus complexe
//  car perdu dans le tas
function draw2() {
  var color, w, h;
  Initialiser();
  position_x += 1;

  w = Math.floor(20 / 2);
  h = Math.floor(100 / 10);
  Texte(20, 20, w + ' '+ 250);
  for (var i = 0; i < 2; i++) {
    for (var j = 0; j < 10; j++) {
      if ((i % 2) != (j % 2)) {
        color = 'white';
      } else {
        color = 'black';
      }
      RectanglePlein(x + i*w, y + j*250, w, h, color);
    }
  }
  
  RectanglePlein(position_x, 300, 10, 20);
  
  if (player_x > finish_line_x) {
    setCanvasFont('helvetica', '100pt', '');
    Texte(300, 400, 'Gagné !', 'black');
    setCanvasFont('helvetica', '12pt', '');
  }
}




