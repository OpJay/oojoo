# OoJoo

OoJoo is a lightweight JavaScript library that easily adds beautiful flowing stars effects to web pages.

## Features

- 🌟 Customizable number of stars, size, and rotation speed
- ✨ Natural star twinkling effect
- 🎮 Intuitive controller interface
- 🌐 Multi-language support (Korean, English, Japanese, Chinese)
- 📱 Responsive design
- 🚀 Lightweight performance

## Installation

```html
<script src="oojoo.js"></script>
```

## Usage

```javascript
// Initialize with default settings
const oojoo = new OoJoo();

// Or initialize with custom options
const oojoo = new OoJoo({
  numberOfStars: 300,      // Number of stars
  minStarSize: 0.6,        // Minimum star size (px)
  maxStarSize: 2.4,        // Maximum star size (px)
  twinkleDuration: 5,      // Twinkle duration (seconds)
  rotationDuration: 240    // Rotation period (seconds)
});
```

## Options

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `numberOfStars` | number | 220 | Number of stars to create |
| `minStarSize` | number | 0.6 | Minimum star size (pixels) |
| `maxStarSize` | number | 2.4 | Maximum star size (pixels) |
| `twinkleDuration` | number | 5 | Star twinkling period (seconds) |
| `rotationDuration` | number | 240 | Time for one full rotation (seconds) |

## Methods

```javascript
// Change number of stars
oojoo.setNumberOfStars(300);

// Change rotation speed
oojoo.setRotationDuration(180);

// Change star size range
oojoo.setStarSize(0.8, 3.0);

// Change twinkle duration
oojoo.setTwinkleDuration(3);

// Pause animation
oojoo.pause();

// Resume animation
oojoo.resume();

// Remove effect
oojoo.destroy();
```

## Demo

Visit the [demo page](https://example.com/demo) to see the library's demo and various examples.

## License

MIT License

Copyright (c) 2024 Jay Choi

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.