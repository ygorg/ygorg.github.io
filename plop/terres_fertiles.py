# Inspiration de https://sites.google.com/view/coeurhistorique/accueil
import matplotlib.pyplot as plt
import pandas as pd


def rgb_to_hex(rgb):
    return '%02x%02x%02x' % rgb

"""
#curl -X 'GET' 'https://api.codati.ovh/pixels/zone/?minx=241&miny=151&maxx=289&maxy=250' -H 'accept: application/json' > 2111161423.json
import numpy as np
def hex_to_rgb(hex):
    return tuple(int(hex[i:i + 2], 16) for i in (0, 2, 4))
img = np.zeros(100, 50, 3)
with open('2111161423.json') as f:
    data = json.load(f)
for p in data:
    img[p['y']-151,p['x']-241,:] = hex_to_rgb(p['hexColor'][1:])
plt.imwrite(img/255, 'aaaaaaa.png')
"""

# TODO: calculer la diff entre l'image et l'actuel



img = plt.imread('DirtyBiology.png')

data = []
# La première colonne ne fait pas partie des Terres Fertiles,
# on décale donc l'image d'un pixel cf l.31 et 36
for i in range(1, img.shape[0]):
    acc = []
    for j in range(img.shape[1]):
        # Convertis les composants RGB de l'image en hexa (avec les coordonés)
        hex_ = rgb_to_hex(tuple(map(int, img[i, j, :3] * 255)))
        acc.append(f'{j+241}:{i+151-1} {hex_}')
    data.append(acc)

# On utilise pandas pour convertir notre tableau en tableau HTML et colorer les cases
df = pd.DataFrame(data)
style = 'background-color: {}'
tmp = df.style.applymap(lambda x: style.format('#' + x.split(' ')[1]))\
        .set_table_styles([{'selector': 'td', 'props': 'border: 0; text-align: center; font-size: .75em'}])

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
    f.write(style)
    f.write("""
Crédit : SheeroChana#6208

<img src='./DirtyBiology.png'></img>

<a href="terres_fertiles.py">Source</a>

</body>
""")
