# WebAudio SampleEditor

Audio / Waveform UI for displaying WebAudio AudioBuffers with zoom, select and looping markers interaction.

![Travis](https://travis-ci.org/rikard-io/sampleeditor.svg?branch=master)

## Features

* Adjustable detail
* No external dependencies
* Should work wherever WebAudio works
* Canvas based, with retina support
* Modular approach. Easy to use just the Waveform for example

## Alternatives

* https://github.com/bbc/waveform-data.js
Probably better performance wise, but I required more musical control.


## Usage

* See index.html

## Scripts

* `yarn build` or `npm run build` - produces production version of SampleEditor under the `dist` folder
* `yarn dev` or `npm run dev` - produces development version SampleEditor and runs a watcher
* `yarn test` or `npm run test` - runs the to-do-tests :)
* `yarn test:watch` or `npm run test:watch` - same as above but in a watch mode

## License

* See LICENSE
