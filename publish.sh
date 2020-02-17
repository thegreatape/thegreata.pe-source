#!/bin/bash
sed -i'' -e 's/^url:/#url:/' _config.yml
bundle exec jekyll build
sed -i'' -e 's/^#url:/url:/' _config.yml
rsync -rtvu --delete --exclude .git _site/ ../thegreatape.github.io README.md
cp CNAME ../thegreatape.github.io/
cd ../thegreatape.github.io/
git add .
git commit -m "Publishing at `date`"
git push origin master
