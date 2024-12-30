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