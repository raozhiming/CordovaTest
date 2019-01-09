#!/bin/bash

clone_clount=0



if [ $# -ge 1 ] ; then
    clone_clount=$1
else
    echo "usage:"
    exit 1
fi

echo "clone clount:"$clone_clount

modifyManifest() {
    echo "manifest"
    dapp_name=$1
    echo $dapp_name
    sed -i '/"id"/c\  "id": "org.elastos.trinity.'$dapp_name'",' splashscreen/manifest.json
    # todo author:name
    sed -i '/"name": /c\  "name": "'$dapp_name'",' splashscreen/manifest.json
}

packageEpk() {
    echo "packageEpk"
    cd splashscreen
    zip -r $1.epk *
    cd ..
    mv splashscreen/$1.epk epk/
}

for (( i = 0; i < $clone_clount; i++ ));do
    modifyManifest "mytest"$i
    packageEpk "mytest"$i
done
