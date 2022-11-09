turtleEnabled = false;

// Définition des images
var background_url = 'https://www.spriters-resource.com/resources/sheets/71/73775.png';
var background = PreloadImage(background_url);
var sprite_url = 'http://www.videogamesprites.net/FinalFantasy1/Party/After/RedWizard-Front.gif';
var sprite = PreloadImage(sprite_url);

// Définition des variables d'objets
var player_x = 0;
var player_y = 0;

// On définie la taille de notre surface de jeu
var MAX_WIDTH=1100;
var MAX_HEIGHT=700;


// Définition de la fonction "draw_player" qui prend deux arguments: x et y
// On ne la définit qu'une seule fois, et on l'appelle en écrivant "draw_player(0, 0);" par exemple

function draw_player(x, y) {
  // Affiche une image aux coordonnées (x, y) comme si l'espace était une grille dont les cases font 50 pixels 
  DrawImageObject(sprite, x * 50, y * 50, 50, 50); // L'image fait 50x50 pixels comme la grille
}


// La fonction draw va être executée toute les millisecondes si on écrit "Loop(0);" à la fin du programme
function draw() {
  
  //////////////////////////
  // Affichage graphique  //
  //////////////////////////
  
  // Dessiner mon interface de jeu
  Initialiser();
  // Le fond
  DrawImageObject(background, 0, 0, MAX_WIDTH, MAX_HEIGHT);
  
  // Le personnage
  draw_player(player_x, player_y);
  
}

// Ces fonction sont des fonction évènementielles. Elles ne sont executée que lorque la
// souris bouge, qu'un clic est effectué ou qu'une touche du clavier est pressée
function MouseMove(x, y) {}

function MouseClick(x, y) {}


function Keypressed(key) {
  // Modification de la représentation interne des objets
  // Voir le site https://keycode.info/ pour avoir le code de chaque touche du clavier
  if (key == 37) {
    // Fleche Gauche
    player_x -= 1;
    // Si le x sort de l'espace de jeux (s'il est inférieur à 0) on reste à 0.
    if (player_x <= 0) {
      player_x = 0;
    }
  }
  if (key == 38) {
    // Fleche Haut
    player_y -= 1;
    if (player_y <= 0) {
      player_y = 0;
    }
  }
  if (key == 39) {
    // Fleche Droite
    player_x += 1;
    // Si le x sort de l'espace de jeux (s'il est supérieur a MAX_WIDTH) on reste à MAX_WIDTH.
    if (player_x >= Math.floor(MAX_WIDTH/50)) {
      player_x = Math.floor(MAX_WIDTH/50)-1;
    }
  }
  if (key == 40) {
    // Fleche Bas
    player_y += 1;
    if (player_y >= Math.floor(MAX_HEIGHT/50)) {
      player_y = Math.floor(MAX_HEIGHT/50)-1;
    }
  }
}


// Cette ligne va executer la fonction draw toute les millisecondes
Loop(0);


