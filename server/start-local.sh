#!/bin/bash

mkdir -p /var/lib/data/
docker build . -t sonic
docker run -p 3000:3000 -v /var/lib/data/:/var/lib/data/ sonic:latest
