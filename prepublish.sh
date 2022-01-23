#!/bin/bash
set -eux

# git config
git config --global user.name "RMG Build Agent"
git config --global user.email rmg.build.agent@users.noreply.github.com

# variables
export APP_NAME=rmg-palette-resources
BRANCH=$(git branch | grep \* | cut -d ' ' -f2 | tr '/' '.')

# npm config
npm config set tag-version-prefix "${APP_NAME}-"

cd ./package

### BUMP VERSION
if [ "$BRANCH" = "master" ]
then
  # build with a normal version
  npm --no-git-tag-version version patch
  export RMG_VER=$(node -p "require('./package.json').version")
else
  # skipped
  echo skipped
fi

# build
npm run build

### PUSH TAG AND COMMIT
if [ "$BRANCH" = "master" ]
then
  git add -u
  git commit -m "${APP_NAME}-${RMG_VER} release"
  git push
fi

# Set up .npmrc for publishing
cat >> ./dist/.npmrc << EOF
//registry.npmjs.org/:_authToken=\${NODE_AUTH_TOKEN}
registry=https://registry.npmjs.org/
always-auth=true
EOF

# going to publish package