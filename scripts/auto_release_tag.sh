#!/bin/sh
# before running this script do the following actins in bash terminal
# dos2unix auto_release_tag.sh

last_release=$(git ls-remote --sort='-v:refname'| head -n  1)
#  last_release = 0dab56adbe0d6e5ec45870883d807ba76c9f5d56 refs/tags/v1.0

tag_field=$(cut -f 2 <<< $last_release) 
#  tag_field= refs/tags/v1.0

version=${tag_field:11:20}
#  version = 1.0
version_prefix=${version:0:1}
# version_prefix = 1
check=`echo $version | grep -E ^\-?[0-9]*\.?[0-9]+$`
if [ "$check" != '' ]; then
    version_decim_digits=${version:2:4}
    tag=$(echo $version_decim_digits 1 | awk '{print $1 + $2}')
      echo "v"$version_prefix'.'$tag
      # output = v1.1
else
  echo v1.0
fi
