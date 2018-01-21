![Travis](https://travis-ci.org/rikard-io/SampleEditor.svg?branch=master)

# WebAudio SampleEditor

Audio / Waveform UI for displaying WebAudio AudioBuffers with zoom, select and looping markers interaction.

![Alt text](/screenshot.gif?raw=true "Screenshot")

## Warning

This repo is in it's early stage. May not be appropriate for production.

## Features

* Adjustable detail - Fast rendering when precision is not important
* No external dependencies
* Should work wherever WebAudio works
* Canvas based with customizable rendering size (for retina)
* Modular approach. Easy to use just the Waveform for example
* Quantize selection and looping points to a time interval

## Alternatives

* https://github.com/bbc/waveform-data.js
Probably better performance-wise, but much bigger in scope. Also missing some more DAW-like features I required.

## Usage

* See index.html
* options:

## Developing

* Run any dev server or the file system
* `yarn build` or `npm run build` - produces production version of SampleEditor under the `dist` folder
* `yarn dev` or `npm run dev` - produces development version SampleEditor and runs a watcher
* `yarn test` or `npm run test` - runs the to-do-tests :)
* `yarn test:watch` or `npm run test:watch` - same as above but in a watch mode

## License

* See LICENSE
