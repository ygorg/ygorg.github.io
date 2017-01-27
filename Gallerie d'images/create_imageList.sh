#!/bin/bash

if test "$#" -lt "1" -o "$1" = "help" ; then
	echo "create_imageList.sh path|help"
	echo "Entrez un chemin de dossier avec des photos"
	echo "Le script crée le dossier de vignettes"
	exit
fi

fich=$1

if test ! -d "$fich" ; then
	echo "Entrez un chemin valide"
	exit
fi

mkdir -p "galleryImages"

rm -rf "galleryImages/thumbs"
mkdir "galleryImages/thumbs"

rm -rf "galleryImages/pictures"
mkdir "galleryImages/pictures"

cp "$fich/"* "./galleryImages/pictures/"

mogrify "-format" "jpg" "-path" "./galleryImages/thumbs" "-thumbnail" "100x100" "./galleryImages/pictures/"*

echo "var images = [" > images.js


cpt="0"
for i in "galleryImages/thumbs/"*; do

	if ((cpt > 0)) ; then
		echo ","
	fi

	echo -e -n "\t'$i'"
	
	((cpt++))

done  >> images.js

echo "" >> images.js

echo "];" >> images.js