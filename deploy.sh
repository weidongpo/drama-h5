@echo off
echo Building...
call npm run build

echo Deploying to gh-pages...
cd dist
git init
git add -A
git commit -m "deploy"
git push -f git@github.com:weidongpo/drama-h5.git master:gh-pages
cd ..
echo Done!
