#!/bin/bash
echo What should the version be?
read VERSION
echo What is your dokku password?
read PASSWORD


docker pull kittishane/endobase:$VERSION && docker tag kittishane/endobase:$VERSION dokku/api:$VERSION && echo $PASSWORD | sudo -S dokku tags:deploy api $VERSION

