#!/bin/bash
set -eux

# git config
git config --global user.name 'github-actions[bot]'
git config --global user.email 'github-actions[bot]@users.noreply.github.com'

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
  git add ..
  git commit -m "${APP_NAME}-${RMG_VER} release"
  git push
fi

# Set up .npmrc for publishing
cat >> ./dist/.npmrc << EOF
//registry.npmjs.org/:_authToken=\${NODE_AUTH_TOKEN}
registry=https://registry.npmjs.org/
always-auth=true
EOF

# Check if it is a patch version
PREV_VER=$(npm show @railmapgen/rmg-palette-resources version | head -n1)
PATTERN='\([0-9]\+\.\)\{2\}'
PREV_MAJ_MIN=$(echo $PREV_VER | grep --colour=never -o $PATTERN)
CUR_MAJ_MIN=$(echo $RMG_VER | grep --colour=never -o $PATTERN)
[ $PREV_MAJ_MIN == $CUR_MAJ_MIN ] && IS_PATCH=true || IS_PATCH=false
echo "IS_PATCH=${IS_PATCH}" >> $GITHUB_ENV

# going to publish package
