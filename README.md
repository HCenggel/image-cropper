# ImageCropper

ImageCropper is a lightweight, pure JavaScript image cropping library with no framework dependencies and easy integration.

### Features

- ✨ **Image Transformations**: Drag/pan, scroll to zoom (0.1x - 10x), rotate, flip horizontally/vertically
- ✂️ **Crop Modes**: Free mode (resizable with handles) and Fixed mode (fixed size without handles)
- 🖥️ **Desktop Support**: Optimized for mouse interactions on desktop platforms
- 📤 **Flexible Export**: Export as JPEG or PNG with adjustable quality (0.1 - 1.0)
- 🔗 **Base64 Output**: Returns base64 data URL for easy integration
- 🎯 **No Dependencies**: Pure JavaScript, lightweight and fast
- 🎨 **Canvas-based**: Minimal CSS dependency, uses Canvas API for rendering

### Installation

Simply include `image-cropper.js` file in your HTML:

```html
<script src="image-cropper.js"></script>
```

### Quick Start

```javascript
// Create a cropper instance
const cropper = new ImageCropper('#container', {
  width: 500,
  height: 500,
  cropMode: 'free'
});

// Load an image
cropper.loadImage('path/to/image.jpg');

// Export the cropped image
const base64Data = cropper.export('image/jpeg', 0.9);
console.log(base64Data);
```

### Configuration Options

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `width` | number | 500 | Canvas width in pixels |
| `height` | number | 500 | Canvas height in pixels |
| `cropMode` | string | `'free'` | Crop mode: `'free'` or `'fixed'` |
| `cropSize` | object | `{width: 200, height: 200}` | Fixed crop size for `'fixed'` mode |
| `rotateIncrement` | number | 90 | Rotation increment in degrees |
| `minScale` | number | 0.1 | Minimum zoom scale |
| `maxScale` | number | 10 | Maximum zoom scale |
| `onCropChange` | function | null | Callback when crop box changes |

### API Methods

#### `loadImage(src)`
Load an image from URL or base64 string.
```javascript
await cropper.loadImage('data:image/jpeg;base64,...');
```

#### `rotate(degrees)`
Rotate the image by specified degrees.
```javascript
cropper.rotate(90);   // Rotate 90° clockwise
cropper.rotate(-90);  // Rotate 90° counter-clockwise
```

#### `flipHorizontal()`
Flip the image horizontally.

#### `flipVertical()`
Flip the image vertically.

#### `setScale(scale)`
Set the image scale (0.1 to 10).
```javascript
cropper.setScale(1.5);
```

#### `setCropMode(mode)`
Set the crop mode: `'free'` or `'fixed'`.
```javascript
cropper.setCropMode('fixed');
```

#### `export(format, quality)`
Export the cropped image as base64 data URL.
```javascript
const jpegData = cropper.export('image/jpeg', 0.9);
const pngData = cropper.export('image/png');
```

#### `reset()`
Reset all image transformations to default state.

### Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

### Demo

Check out the [demo folder](./demo/) for a complete feature demonstration with all functionalities.

### License

MIT
