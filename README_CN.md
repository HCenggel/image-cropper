# ImageCropper

一个轻量级、纯JavaScript的图片裁剪库，无框架依赖，易于集成。

### 特性

- ✨ **图片变换**: 支持拖动/平移、滚轮缩放（0.1x - 10x）、旋转、水平/垂直翻转
- ✂️ **裁剪模式**: 自由模式（可调整大小，带手柄）和固定模式（固定尺寸，无手柄）
- 🖥️ **桌面支持**: 针对桌面端鼠标操作优化
- 📤 **灵活导出**: 支持导出为JPEG或PNG格式，质量可调（0.1 - 1.0）
- 🔗 **Base64输出**: 返回base64数据URL，便于集成
- 🎯 **无依赖**: 纯JavaScript实现，轻量且快速
- 🎨 **Canvas渲染**: 最小化CSS依赖，使用Canvas API绘制

### 安装

只需在HTML中引入 `image-cropper.js` 文件：

```html
<script src="image-cropper.js"></script>
```

### 快速开始

```javascript
// 创建裁剪器实例
const cropper = new ImageCropper('#container', {
  width: 500,
  height: 500,
  cropMode: 'free'
});

// 加载图片
cropper.loadImage('path/to/image.jpg');

// 导出裁剪后的图片
const base64Data = cropper.export('image/jpeg', 0.9);
console.log(base64Data);
```

### 配置选项

| 选项 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `width` | number | 500 | 画布宽度（像素） |
| `height` | number | 500 | 画布高度（像素） |
| `cropMode` | string | `'free'` | 裁剪模式：`'free'` 或 `'fixed'` |
| `cropSize` | object | `{width: 200, height: 200}` | 固定模式下的裁剪尺寸 |
| `rotateIncrement` | number | 90 | 旋转增量（度） |
| `minScale` | number | 0.1 | 最小缩放比例 |
| `maxScale` | number | 10 | 最大缩放比例 |
| `onCropChange` | function | null | 裁剪框变化时的回调函数 |

### API 方法

#### `loadImage(src)`
从URL或base64字符串加载图片。
```javascript
await cropper.loadImage('data:image/jpeg;base64,...');
```

#### `rotate(degrees)`
按指定角度旋转图片。
```javascript
cropper.rotate(90);   // 顺时针旋转90°
cropper.rotate(-90);  // 逆时针旋转90°
```

#### `flipHorizontal()`
水平翻转图片。

#### `flipVertical()`
垂直翻转图片。

#### `setScale(scale)`
设置图片缩放比例（0.1 到 10）。
```javascript
cropper.setScale(1.5);
```

#### `setCropMode(mode)`
设置裁剪模式：`'free'` 或 `'fixed'`。
```javascript
cropper.setCropMode('fixed');
```

#### `export(format, quality)`
导出裁剪后的图片为base64数据URL。
```javascript
const jpegData = cropper.export('image/jpeg', 0.9);
const pngData = cropper.export('image/png');
```

#### `reset()`
重置所有图片变换到默认状态。

### 浏览器支持

- Chrome（最新版）
- Firefox（最新版）
- Safari（最新版）
- Edge（最新版）

### 在线演示

查看 [demo 文件夹](./demo/) 获取完整功能演示，包含所有功能特性。

### 许可证

MIT
