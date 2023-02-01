# Installation guide

## Install dependencies

`npm i`

## Pull front end

`git submodule init`

`git submodule update --recursive --remote`

## Build front end

`cd front-end && npm install`

`npm run build`

## Copy built content into client folder

`npm run preserve`

`cp -r front-end/build/* client`

## Start dev server

`npm run start:dev`
