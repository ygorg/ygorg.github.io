dirFile="dir.pug"

# Prints the list of the directories to a file
# used by index.pug
echo -n "- var directories = [" > $dirFile
for i in * ; do
  test -d "$i" && test "$i" != "empty-example" && test "$i" != "p5" && echo -n "\"$i\", "
done >> $dirFile
echo -n "]" >> $dirFile

pug index.pug
