set -xe

if [ $TRAVIS_BRANCH == "master" ] ; then
  echo "Create ssh agent with key"
  eval "$(ssh-agent -s)"
  ssh-add ~/.ssh/travis_rsa

  echo "Set up remote"
  git remote add deploy "travis@46.101.23.183:/var/www/lir.com"
  git config user.name "Travis CI"
  git config user.email "travis@lir.com"

  echo "Set up new ignore file"
  rm -f .gitignore
  cp .travis/deployignore .gitignore
  git add .
  git status # debug
  echo "Commit"
  git commit -m "Deploy"
  git push -f deploy HEAD:master
elif [ $TRAVIS_BRANCH == "staging" ] ; then
  echo "Create ssh agent with key"
  eval "$(ssh-agent -s)"
  ssh-add ~/.ssh/travis_rsa

  echo "Set up remote"
  git remote add deploy "travis@46.101.23.183:/var/www/lir.com"
  git config user.name "Travis CI"
  git config user.email "travis@lir.com"

  echo "Set up new ignore file"
  rm -f .gitignore
  cp .travis/deployignore .gitignore
  git add .
  git status # debug
  echo "Commit"
  git commit -m "Deploy"
  git push -f deploy HEAD:master
else
  echo "Not deploying, since this branch isn't master."
fi
