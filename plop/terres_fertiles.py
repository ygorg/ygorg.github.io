# Inspiration de https://sites.google.com/view/coeurhistorique/accueil
import matplotlib.pyplot as plt
import pandas as pd


def rgb_to_hex(rgb):
    return '%02x%02x%02x' % rgb


def hex_to_rgb(hex):
    return tuple(int(hex[i:i + 2], 16) for i in (0, 2, 4))


def pos_to_border(x, y):
    res = []
    if x % 10 == 0:
        res += ['edge-left']
    elif (x + 1) % 10 == 0:
        res += ['edge-right']
    if y % 10 == 0:
        res += ['edge-top']
    elif (y + 1) % 10 == 0:
        res += ['edge-bottom']
    return ' '.join(res)


def cell_to_border_color(content):
    coor, color = content.split(' ')
    x, y = coor.split(':')
    return pos_to_border(int(x), int(y))


def cell_to_background_color(content):
    coor, color = content.split(' ')
    return 'background-color: #{};'.format(color)


"""
#curl -X 'GET' 'https://api.codati.ovh/pixels/zone/?minx=241&miny=151&maxx=289&maxy=250' -H 'accept: application/json' > 2111161423.json
import numpy as np
img = np.zeros(100, 50, 3)
with open('2111161423.json') as f:
    data = json.load(f)
for p in data:
    img[p['y']-151,p['x']-241,:] = hex_to_rgb(p['hexColor'][1:])
plt.imwrite(img/255, 'aaaaaaa.png')
# TODO: calculer la diff en % entre l'image et l'actuel
"""

orig_x, orig_y = 241, 151
file_img = 'DirtyBiology.png'

img = plt.imread(file_img)
img = img[1:,]  # La première colonne ne fait pas partie des Terres Fertiles
data = []
for i in range(img.shape[0]):
    acc = []
    for j in range(img.shape[1]):
        # Convertis les composants RGB de l'image en hexa (avec les coordonés)
        hex_ = rgb_to_hex(tuple(map(int, img[i, j, :3] * 255)))
        acc.append(f'{j+orig_x}:{i+orig_y} {hex_}')
    data.append(acc)

# On utilise pandas pour convertir notre tableau en tableau HTML et colorer les cases
df = pd.DataFrame(data)

# On ajoute le background-color pour chaque pixel
# On ajoute les styles généraux: on affiche pas les header, on gère les bordures
# On ajoute les classes pour les bordures
tmp = df.style.applymap(lambda x: cell_to_background_color(x))\
        .set_table_styles([
            {'selector': 'td',
             'props': 'border: 2px solid white; text-align: center; font-size: .75em; padding: 5px 2px 5px 2px;'},
            {'selector': 'th',
             'props': 'display: none'},
            {'selector': '',
             'props': 'border-collapse: collapse'},
            {'selector': '.edge-left', 'props': 'border-left: 2px solid black'},
            {'selector': '.edge-right', 'props': 'border-right: 2px solid black'},
            {'selector': '.edge-top', 'props': 'border-top: 2px solid black'},
            {'selector': '.edge-bottom', 'props': 'border-bottom: 2px solid black'}
        ])\
        .set_td_classes(df.applymap(cell_to_border_color))

html_tmp = tmp.render().replace('\n', '')
style, table = html_tmp.split('</style>')
style += '</style>'
table = table.replace('/tr>', '/tr>\n')

with open('terres_fertiles_pixel_art.html', 'w') as f:
    f.write("""
<!DOCTYPE html>
<html>
<head>
   <meta charset="utf-8">
   <meta name="viewport" content="width=device-width, initial-scale=1">
   <title>Terres Fertiles</title>
</head>
<body>""")
    f.write(table)
    # Si on met le style avant la table, il n'a pas le temps de charger
    f.write(style)
    f.write("""
Crédit : SheeroChana#6208

<img src='{}'></img>

<a href="{}">Source</a>

</body>
""".format(file_img, __file__))
