#!/bin/bash
while getopts b:v: flag
do
    case "${flag}" in
        b) branch=${OPTARG};;
        v) version=${OPTARG};;
    esac
done

if [ $branch == release ];then
    echo alpha-$version
elif [ $branch == dev ];then
    echo beta-$version
else
    echo $version
fi
