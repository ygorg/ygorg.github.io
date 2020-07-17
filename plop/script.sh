set -e
dirFile="dir.pug"

# Prints the list of the directories to a file
# used by index.pug
echo -n "- var directories = [" > $dirFile
find . -maxdepth 1 -type d | grep -vi "p5\|ressources\|templates" | while read i ; do

    echo -n "\"${i##*/}\", "

done >> $dirFile
echo -n "]" >> $dirFile

pug index.pug