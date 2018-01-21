![Travis](https://travis-ci.org/rikard-io/SampleEditorView.svg?branch=master)

# WebAudio SampleEditorView

Audio / Waveform UI for displaying WebAudio AudioBuffers with zoom, select and looping markers interaction. Much like what you would find in a DAW.

![Alt text](/screenshot.gif?raw=true "Screenshot")

## Warning

This repo is in it's early stage. May not be appropriate for production.

## Install

`npm i -D sample-editor-view` or `yarn add -D sample-editor-view`

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

### Create / Init:
```
let editor = new SampleEditorView({...})

// ... load / create buffer

editor.buffer = buffer
```

### options

All options can be sent to the constructor in an object, or updated / read later
with: `editor.props.[propName] = x`.
Setting a property will also cause a rerendering of the updated part.

| Property  | Default | Description |
| --------------- |:-------:|----------------------------------------:|
| hZoom             | 1       | Horizontal zoom level. In ratio where 1 shows the full duration and 2 show half the duration. |
| vZoom             | 2       | Vertical zoom level. A multiplier used when drawing the hight of the waveform.                |
| offset            | 0       | Offset in seconds from where to start reading from the buffer.                                |
| background        | '#ddd'  | Background color. |
| color             | '#222'  | Foreground color (text and waveform). |
| selectBackground  | '#222'  | Background select color. |
| selectColor       | '#ddd'  | Foreground select color (waveform). |
| width             | 640     | Width in pixels. Multiply with window.devicePixelRatio and adjust CSS to adopt to retina / high-res. |
| height            | 320     | Height in pixels. Multiply with window.devicePixelRatio and adjust CSS to adopt to retina / high-res. |
| channel           | 0       | What buffer-channel to read from. |
| resolution        | 1       | Level of detail, should be kept between 1-N, where 1 means to draw every pixel and N every N:th pixel |
| startPosition     | 0       | Position of start marker |
| uiZoomStickiness  | 0.1     | When panning / zooming, this is used to prevent accidental zooming (when panning). |
| duration          | 'auto'  | What duration to use to determine max pan / offset etc. 'auto' means using the buffer duration. |
| loop              | true    | Show or hide loop markers. |
| loopStart         | 0       | Start position for loop markers, in seconds. |
| loopEnd           | 1       | End position for loop markers, in seconds. |
| selectStart       | 0       | Start position for selection, in seconds. |
| selectEnd         | 0       | End position for selection, in seconds. |
| quantize          | 0.0125  | Snapping or quantize duration in seconds. 0.125 would snap to 1/16th note in 120 bpm. |
| buffer            | null    | What AudioBuffer to read from. |

## Developing

* Run any dev server or the file system
* `yarn build` or `npm run build` - produces production version of SampleEditorView under the `dist` folder
* `yarn dev` or `npm run dev` - produces development version SampleEditorView and runs a watcher
* `yarn test` or `npm run test` - runs the to-do-tests :)
* `yarn test:watch` or `npm run test:watch` - same as above but in a watch mode

## License

* See LICENSE
