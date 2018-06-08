#!/bin/bash
bundle exec jekyll build
rsync -rtvu --delete --exclude .git _site/ ../thegreatape.github.io
cp CNAME ../thegreatape.github.io/
cd ../thegreatape.github.io/
git add .
git commit -m "Publishing at `date`"
git push origin master
