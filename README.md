# PokeApp
## Overview
Pokemon team builder app built with react native,pokeapiv2 and firebase.

![Status](https://img.shields.io/badge/status-prototype-yellow)
[![Maintenance](https://img.shields.io/badge/Maintained%3F-yes-green.svg)](https://github.com/Ramos95/PokeApp/graphs/commit-activity)
[![Maintenance](https://img.shields.io/badge/Mantainer-Ramos95-brightgreen)](https://github.com/Ramos95)

## Features

- Team management (create,update,delete)
- Add 3 to 6 pokemons by team
- Pokemon list by region
- Firebase authentication and store

## Tech

PokeApp uses the next technologies listed

- [React Native](https://reactnative.dev/) - cross plataform mobile development framework
- [Firebase](https://firebase.google.com/) -web and mobile development platform
- [PokeAPiV2](https://pokeapi.co/) -pokemon data REST api


## Running the app

PokeApp requires [Node.js](https://nodejs.org/) v10+ and [React Native](https://reactnative.dev/) 0.60+ to run.

Install the dependencies and devDependencies and run the app.

```sh
cd PokeApp
npm i
npx react-native start
npx react-native run-android
```

Link the assets (fonts) if necessary

```sh
npx react-native link
```

## ISSUES

At the moment the app is still in prototype and the current issues are present

- Pokemon list gets buggy and slow 
- Navigation headers resize when screen is loaded
- Need loading indicators to inform when action is being fetched
- Even tho user can save their data to firestore, there is still no implementation to retreive it
- App if only configured for android devices 
