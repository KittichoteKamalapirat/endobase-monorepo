#!/bin/bash

echo What should the version be?
read VERSION

docker build -t kittishane/endobase:$VERSION .
docker push kittishane/endobase:$VERSION     



