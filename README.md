[ygorg.github.io](https://ygorg.github.io/)

https://github.com/rbenv/rbenv#readme

```bash
gem install bundler jekyll
cd ygorg.github.io
bundle install
bundle exec jekyll serve
```

```bash
for i in ../../_hobbies_large/.../*.jpg
do
	magick "$i" -define jpeg:extent=300KB "${i##*/}"
done

# mp4 are always lighter than gifs
# speed up X5 (0.2=1/5), -r framerate, -an remove audio
ffmpeg -i extra.mov -filter:v "setpts=0.2*PTS,scale=512:-1," -r 15 -an extra.mp4

```


```bash
# removing deleted-files to shrink repo size
brew install git-filter-repo
git clone git@github.com:ygorg/ygorg.github.io.git
git filter-repo --analyze
cat <(tail -n +3 .git/filter-repo/analysis/path-deleted-sizes.txt) <(tail -n +3 .git/filter-repo/analysis/directories-deleted-sizes.txt) | cut -w -f5- | sed 's/\t/ /g'
git filter-repo --paths-from-file <(cat <(tail -n +3 .git/filter-repo/analysis/path-deleted-sizes.txt) <(tail -n +3 .git/filter-repo/analysis/directories-deleted-sizes.txt) | cut -w -f5- | sed 's/\t/ /g') --invert-paths
git filter-repo --analyze  # ensure *-deleted-sizes.txt are empty
git push origin --force --all  # push new commit tree
```