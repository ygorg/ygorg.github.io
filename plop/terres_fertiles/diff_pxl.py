#curl -X 'GET' 'https://api.codati.ovh/pixels/zone/?minx=241&miny=151&maxx=289&maxy=250' -H 'accept: application/json' > 2111161423.json
import matplotlib.pyplot as plt
import numpy as np
import json


def rgb_to_hex(rgb):
    return '%02x%02x%02x' % rgb

def hex_to_rgb(hex):
    return tuple(int(hex[i:i + 2], 16) for i in (0, 2, 4))


def load_json(json_path):
    # Prend en entrée un fichier qui vient de l'API de codati
    # Sort une matrice (largeur, hauteur, RGB) entre 0 et 255
    with open(json_path) as f:
        data = json.load(f)

    min_x = min(p['x'] for p in data)
    min_y = min(p['y'] for p in data)
    max_x = max(p['x'] for p in data)
    max_y = max(p['y'] for p in data)

    img = np.zeros((max_y - min_y + 1, max_x - min_x + 1, 3))
    for p in data:
        img[p['y'] - min_y, p['x'] - min_x, :] = hex_to_rgb(p['hexColor'][1:])
    return img, min_x, min_y


def load_img(img_path):
    # Charge l'image de référence du pixel art
    img = plt.imread(img_path)
    img = img[:, :, :3]  # C'est du RGBA mais on veut que RGB
    return img * 255


img_now, min_x, min_y = load_json('211116-2052.json')
img_now = img_now[:-1, :, :] #dans ma requête il y avait une colonne en trop a la fin oups
img_ref = load_img('DirtyBiology.png') # l'image de référence
img_ref = img_ref[1:, :, :] # La première colonne ne fait pas partie des Terres Fertiles

def compute_diff(a, b):
    # On calcule la similarité entre les pixels de a et de b
    # puis on fait la somme pour les 3 composantes RGB
    val_diff = np.abs(a-b).sum(-1)
    # La en gros on trie les valeurs, mais on ne peut pas trier toutes les valeurs
    # d'une matrice (seulement pas colonne ou ligne). Donc on transforme la
    # matrice 2D en une liste 1D
    tmp = np.argsort(val_diff.reshape(-1))
    # On retrouve les indices de la matrice avec la division entière et le modulo
    # Genre si on a une matrice 3x2, (1, 2) c'est la 2em ligne et la 3em valeur mais c'est la 5em valeur en tout
    # et 5 // 3 = 1 ; 5 % 3 = 2 !
    xs = tmp // a.shape[1]
    ys = tmp % a.shape[1]

    res = []
    # Pour chaque coordonés de la matrice du plus différent au plus similaire
    for x, y in zip(xs[::-1], ys[::-1]):
        # Si les valeurs sont proche c'est ok (par exemple pour l'histoire du 10edb8 et 10e0b8)
        if val_diff[x,y] < 30:
            continue
        # On renvoie les coordonées et la similarité
        res.append((x, y, val_diff[x,y]))
    return res


#[{"x":241,"y":151,"indexInFlag":46950,"index":45240,
#"hexColor":"#10535F",
#"author":"4262b650-47ec-4096-bc6d-03a303efe401","pseudo":"FloV"}
data = []
for i in range(img_ref.shape[0]):
    acc = []
    for j in range(img_ref.shape[1]):
        # Convertis les composants RGB de l'image en hexa (avec les coordonés)
        hex_ = rgb_to_hex(tuple(map(int, img_ref[i, j, :3])))
        acc.append('#' + hex_)
    data.append(acc)

print(json.dumps(data))

"""res = compute_diff(img_now, img_ref)
# On affichage un peu pété des 30 pixels les plus différent à modifier...
for x, y, d in res[:30]:
    print(y + min_x, x + min_y,
          rgb_to_hex(tuple(map(int, img_ref[x, y]))),
          rgb_to_hex(tuple(map(int, img_now[x, y]))))
"""