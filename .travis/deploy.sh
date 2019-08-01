et -xe

if [ $TRAVIS_BRANCH == 'master' ] ; then
  eval "$(ssh-agent -s)"
  ssh-add ~/.ssh/id_rsa

  cd public
  git init

  git remote add deploy "travis@lir.com:/var/www/lir.com"
  git config user.name "Travis CI"
  git config user.email "travis@lir.com"

  git add .
  git status # debug
  git commit -m "Deploy"
  git push -f deploy HEAD:master
else
  echo "Not deploying, since this branch isn't master."
fi
