# Inspiration de https://sites.google.com/view/coeurhistorique/accueil
import matplotlib.pyplot as plt
import pandas as pd


def rgb_to_hex(rgb):
    return '%02x%02x%02x' % rgb


img = plt.imread('DirtyBiology.png')

data = []
for i in range(img.shape[0]):
    acc = []
    for j in range(img.shape[1]):
        # Convertis les composants RGB de l'image en hexa (avec les coordonés)
        hex_ = rgb_to_hex(tuple(map(int, img[i, j, :3] * 255)))
        acc.append(f'{j+241}:{i+151} {hex_}')
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
