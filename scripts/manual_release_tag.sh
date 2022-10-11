# #!/bin/sh
# dos2unix manual_release_tag.sh
last_release=$(git -c 'versionsort.suffix=v2_beta' ls-remote --sort=-v:refname | head -n  1)
#  last_release = 0dab56adbe0d6e5ec45870883d807ba76c9f5d56 refs/tags/v1.0

tag_field=$(cut -f 2 <<< $last_release) 
#  tag_field= refs/tags/v1.0.0

version=$(echo $tag_field |cut -d/ -f 3)
#  version = 1.0.0

echo  $version
