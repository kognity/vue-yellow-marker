**Warning! This project is not maintained any more.**
Be aware that it has security issues in some dependencies. They can be fixed by updating dependecies versions.

# Vue Yellow Marker
Adds a text selection and highlighting functionality to your VUE components.

[![Build Status](https://travis-ci.org/Kognity/vue-yellow-marker.svg?branch=master)](https://travis-ci.org/Kognity/vue-yellow-marker)

![Example](https://github.com/Kognity/vue-yellow-marker/raw/master/doc/vue-yellow-marker-screen.png)

## Installation

```
npm install @kognity/vue-yellow-marker --save
```

## Usage



```javascript
import { HighlightMixin } from "@kognity/vue-yellow-marker";

export default {
  name: "MyComponent",
  mixins: [
    HighlightMixin,
  ],
  ...
  ...
}
```

## Live demo

See [live examples in codesandbox](https://codesandbox.io/s/github/harabchuk/vue-yellow-marker-examples/tree/master/)

## License

MIT
