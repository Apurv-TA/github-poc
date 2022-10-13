#!/bin/sh

last_release=$(git ls-remote --sort "-v:refname" -t | grep -E "alpha-v*" | head -n 1)
#  last_release = 47a4bb049a2eef1598c5e62f482733bf68d68aa8 refs/tags/alpha-v1.2

tag_field=$(cut -f 2 <<< $last_release) 
#  tag_field= refs/tags/alpha-v1.2

prefix=$(echo $tag_field | cut -d / -f 3 | cut -d - -f 1)
# prefix= alpha

version_tag=$(echo $tag_field | cut -d / -f 3 | cut -d - -f 2)
# version_tag= 1.2

version=${version_tag:1}
#  version = 1.0

version_prefix=${version:0:1}
# version_prefix = 1

check=`echo $version | grep -E ^\-?[0-9]*\.?[0-9]+$`
if [ "$check" != '' ]; then
    version_decim_digits=${version:2:4}
    tag=$(echo $version_decim_digits 1 | awk '{print $1 + $2}')
      echo $prefix-"v"$version_prefix'.'$tag
      # output = alpha-v1.3
else
  echo alpha-v1.0
fi
