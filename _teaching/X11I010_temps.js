turtleEnabled = false;

// Définition des variables d'objets
var button_clicked = false;
var button_color;
var button_msg_timer = 0;
var button_x = 100;
var button_y = 150;
var button_w = 40;
var button_h = 40;

var ball_is_moving = false;
var ball_x = 0;
var ball_y = 0;


// La fonction draw va être executée toute les millisecondes si on écrit "Loop(0);" à la fin du programme

function draw() {

  //////////////////////////
  // Affichage graphique  //
  //////////////////////////

  // Dessiner mon interface de jeu
  Initialiser();

  // Le bouton
  if (button_clicked) {
    button_color = 'yellow';
  } else {
    button_color = 'blue';
  }
  RectanglePlein(button_x, button_y, button_w, button_h, button_color);

  // La balle
  EllipsePlein(ball_x, ball_y, 50, 100, 'yellow');


  // Si nous avons cliqué sur le bouton il y a moins d'une seconde
  // on affiche un message. new Date().getTime() est un timestamp http://www.timestamp.fr/?
  // On veut afficher un message jusqu'à 1 seconde après que l'on ai cliqué sur le bouton `button_msg_timer`
  // donc que le message disparaisse au temps `button_msg_timer + 1000`. Si le temps actuel `new Date().getTime()`
  // est avant cela alors on affiche le message.
  if (button_msg_timer + 1000 > new Date().getTime()) {
    setCanvasFont('helvetica', '20pt', '');
    Texte(200, 200, 'Vous avez cliqué sur le bouton !', 'black');
    Texte(200, 250, 'Ce message sera affiché pendant 1 seconde', 'black');
    ball_is_moving = true;
  } else {
    ball_is_moving = false;
  }
  
  //////////////////////////
  //   Mécanismes de jeu  //
  //////////////////////////
  // Met à jour la position de la balle
  if (ball_is_moving) {
    ball_x += 1;
    ball_y += 0.5;
    if (ball_x > 400) {
      ball_x = 0;
    }
    if (ball_y > 400) {
      ball_y = 0;
    }
  }

}

function MouseClick(x, y) {

  // Si on clique sur le bouton cela démarre un minuteur
  if (x > button_x && x < button_x + button_w && y > button_y && y < button_y + button_h) {
    button_clicked = !button_clicked;
    // On indique à quel moment on a cliqué sur le bouton et
    //donc le début du minuteur
    button_msg_timer = new Date().getTime();
  }

}

// new Date().getTime() retourne un timestamp, c'est à dire un entier qui représente le nombre de
// milliseconde écoulées depuis le 1er janvier 1970
Ecrire(new Date().getTime());

// Cette ligne va executer la fonction draw toute les millisecondes
Loop(-1);