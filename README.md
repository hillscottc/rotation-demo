# Ad Rotation Demo

Task Description

Write a program that:
* Consumes both `rotations.csv` and `spots.csv`
* Generates output that shows cost per view by 'CPV by creative' and 'CPV by rotation by day'
  * "Creative" = Business lingo for a TV ad
  * "Rotation" = The timerange on a TV network that an ad airs in

## Implementation

This is ES2017 Node project. Building the project uses Babel to transpile /src to /dist. The [Javascript Standard Style](https://standardjs.com/) is used.

A custom module of functions ([src/data-parsers.js](src/data-parsers.js)) is used to handle the task. The ouput is very basic, but the functions are highly re-useable.

## Installation

Clone this repo, then run `npm install`.
```sh
$ git clone https://github.com/hillscottc/rotation-demo
$ cd rotation-demo
$ npm install
```

## Usage

You can run the code (`npm start`) to see very basic output, solving the task.
```
$ npm start
```

## Testing
[Jest](https://facebook.github.io/jest/) is used for testing.
```
$ npm test
```
