# react-water-wave

[![npm package][npm-badge]][npm]

<a href="https://homerchen19.github.io/react-water-wave/" target="_blank"><img width="1440" alt="screen shot 2018-08-16 at 01 22 16" src="https://user-images.githubusercontent.com/12113222/44156457-3fe9509e-a0f3-11e8-9eb3-c045a3323506.png"></a>

> This is a React wrapper for [sirxemic/jquery.ripples](https://github.com/sirxemic/jquery.ripples)<br />
> It's so cool!<br />

[**DEMO**](https://homerchen19.github.io/react-water-wave/)

This project was bootstrapped with [nwb](https://github.com/insin/nwb).

# Install

```sh
$ yarn add react-water-wave
```

# Example

```jsx
import React from 'react';
import { render } from 'react-dom';
import WaterWave from 'react-water-wave';
import image from './path-to/demo.jpg';

const App = () => (
  <WaterWave
    imageUrl={image}
  >
    {methods => (
      /* children components */
    )}
  </WaterWave>
);

render(<App />, document.querySelector('#root'));
```

Check [demo folder](https://github.com/homerchen19/react-water-wave/tree/master/demo/src) for more complete example.

# Props

Modified from [sirxemic/jquery.ripples#options](https://github.com/sirxemic/jquery.ripples#options)

**Important**: this plugin requires the WebGL extension `OES_texture_float` (and `OES_texture_float_linear` for a better effect) and works only with **same-origin** images.

| Name        | Type   | Default | Description                                                                                                                                                                                |
| ----------- | ------ | ------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| imageUrl    | `*string` | `''`  | The URL of the image to use as the background. If absent the plugin will attempt to use the value of the computed `background-image` CSS property instead. Data-URIs are accepted as well. |
| dropRadius  | `number` | `20`    | The size (in pixels) of the drop that results by clicking or moving the mouse over the canvas.                                                                                             |
| perturbance | `number` | `0.03`  | Basically the amount of refraction caused by a ripple. 0 means there is no refraction.                                                                                                     |
| resolution  | `number` | `256`   | The width and height of the WebGL texture to render to. The larger this value, the smoother the rendering and the slower the ripples will propagate.                                       |
| interactive | `boolean`   | `true`  | Whether mouse clicks and mouse movement triggers the effect.                                                                                                                               |
| crossOrigin | `string` | `''`    | The `crossOrigin` attribute to use for the affected image. For more information see [MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/CORS_settings_attributes).                     |

Other props will be passed to the `<div>` wrapper which is the root DOM element.

# Children Functions

By using [Render Props](https://reactjs.org/docs/render-props.html) pattern to provide the plguin's methods, make sure `Children` is a function that receives an object as its only argument.

### Methods

Modified from [sirxemic/jquery.ripples#methods](https://github.com/sirxemic/jquery.ripples#methods)

| Method     | Parameters                                                 | Description                                                                                                                                                                                                                                                                                                                                      |
| ---------- | ---------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| pause      | none                                                       | Pause the simulation.                                                                                                                                                                                                                                                                                                                            |
| play       | none                                                       | Play the simulation.                                                                                                                                                                                                                                                                                                                             |
| hide       | none                                                       | Hide the effect.                                                                                                                                                                                                                                                                                                                                 |
| show       | none                                                       | Show the effect.                                                                                                                                                                                                                                                                                                                                 |
| drop       | `{x: number, y: number, radius: number, strength: number}` | Manually add a drop at the element's relative coordinates `(x, y)`. `radius` controls the drop's size and `strength` the amplitude of the resulting ripple.                                                                                                                                                                                      |
| destroy    | none                                                       | Remove the effect from the element.                                                                                                                                                                                                                                                                                                              |
| set        | `{ property: string, value }`                              | `propertity` should be one of:<br /> - `dropRadius`<br /> - `perturbance`<br /> - `interactive`<br /> - `imageUrl`: setting the image URL will update the background image used for the effect, but the `background-image` CSS property will be untouched.<br /> - `dropRadius`: setting this won't have any effect until `imageUrl` is changed. |
| updateSize | none                                                       | The effect resizes automatically when the width or height of the window changes. When the dimensions of the element changes, you need to call `updateSize` to update the size of the effect accordingly.                                                                                                                                         |

[npm-badge]: https://img.shields.io/npm/v/react-water-wave.svg
[npm]: https://www.npmjs.org/package/react-water-wave

## License

MIT © [homerchen19](https://github.com/homerchen19)
