/**
 * ImageCropper - 纯JavaScript图片裁剪库
 * 支持图片拖动、缩放、旋转、翻转，提供自由和固定两种裁剪模式
 * 无需任何框架依赖，轻量且易于集成
 */
class ImageCropper {
    /**
     * 构造函数 - 初始化图片裁剪器
     * @param {string|HTMLElement} container - 容器元素的选择器或DOM元素
     * @param {Object} options - 配置选项
     * @param {number} options.width - 画布宽度，默认500px
     * @param {number} options.height - 画布高度，默认500px
     * @param {string} options.cropMode - 裁剪模式：'free'(自由模式) 或 'fixed'(固定模式)，默认'free'
     * @param {Object} options.cropSize - 固定模式下的裁剪尺寸 {width, height}，默认{width: 200, height: 200}
     * @param {number} options.rotateIncrement - 旋转增量（角度），默认90
     * @param {number} options.minScale - 最小缩放比例，默认0.1
     * @param {number} options.maxScale - 最大缩放比例，默认10
     * @param {Function} options.onCropChange - 裁剪框位置变化的回调函数
     */
    constructor(container, options = {}) {
        // 获取容器元素：支持选择器字符串或直接传入DOM元素
        this.container = typeof container === 'string' ? document.querySelector(container) : container;

        // 合并配置选项，设置默认值
        this.options = {
            width: options.width || 500,
            height: options.height || 500,
            cropMode: options.cropMode || 'free',
            cropSize: options.cropSize || {width: 200, height: 200},
            rotateIncrement: options.rotateIncrement || 90,
            minScale: 0.1,
            maxScale: 10,
            onCropChange: options.onCropChange || null
        };

        // 创建Canvas元素
        this.canvas = document.createElement('canvas');
        this.canvas.width = this.options.width;
        this.canvas.height = this.options.height;
        this.canvas.style.border = '1px solid #ccc';
        this.container.appendChild(this.canvas);

        // 获取Canvas上下文
        this.ctx = this.canvas.getContext('2d');

        // 图片相关状态
        this.image = null;
        this.imageState = {
            x: 0,                    // 图片中心X坐标
            y: 0,                    // 图片中心Y坐标
            scale: 1,                // 缩放比例
            rotation: 0,             // 旋转角度（度）
            flipX: 1,                // 水平翻转：1(不翻转) 或 -1(翻转)
            flipY: 1                 // 垂直翻转：1(不翻转) 或 -1(翻转)
        };

        // 裁剪框状态
        this.cropBox = {
            x: (this.options.width - (this.options.cropMode === 'free' ? 200 : 150)) / 2,
            y: (this.options.height - (this.options.cropMode === 'free' ? 200 : 150)) / 2,
            width: this.options.cropMode === 'free' ? 200 : 150,
            height: this.options.cropMode === 'free' ? 200 : 150
        };

        // 交互状态标志
        this.isDraggingImage = false;      // 是否正在拖动图片
        this.isDraggingCropBox = false;   // 是否正在拖动裁剪框
        this.isResizing = false;           // 是否正在调整裁剪框大小
        this.resizeHandle = null;          // 当前激活的调整手柄
        this.lastMouseX = 0;               // 上次鼠标X坐标
        this.lastMouseY = 0;               // 上次鼠标Y坐标

        // 调整手柄的尺寸（像素）
        this.handleSize = 8;

        // 初始化事件监听器并渲染初始画面
        this.initEventListeners();
        this.render();
    }

    /**
     * 加载图片
     * @param {string} src - 图片的URL或base64数据
     * @returns {Promise<Image>} 返回加载完成的Image对象
     */
    loadImage(src) {
        return new Promise((resolve, reject) => {
            const img = new Image();
            // 设置跨域属性，允许加载跨域图片
            img.crossOrigin = 'anonymous';
            img.onload = () => {
                this.image = img;
                // 图片加载完成后自动居中显示
                this.centerImage();
                this.render();
                resolve(img);
            };
            img.onerror = reject;
            img.src = src;
        });
    }

    /**
     * 将图片居中并自适应缩放到画布
     * 计算合适的缩放比例，使图片完整显示在画布内
     */
    centerImage() {
        if (!this.image) return;

        // 计算适应画布的最小缩放比例
        const scale = Math.min(
            this.options.width / this.image.width,
            this.options.height / this.image.height
        );
        // 确保缩放比例不小于最小值
        this.imageState.scale = Math.max(scale, this.options.minScale);
        // 将图片中心定位到画布中心
        this.imageState.x = this.options.width / 2;
        this.imageState.y = this.options.height / 2;
    }

    /**
     * 初始化所有鼠标和滚轮事件监听器
     */
    initEventListeners() {
        this.canvas.addEventListener('mousedown', this.handleMouseDown.bind(this));
        this.canvas.addEventListener('mousemove', this.handleMouseMove.bind(this));
        this.canvas.addEventListener('mouseup', this.handleMouseUp.bind(this));
        this.canvas.addEventListener('mouseleave', this.handleMouseUp.bind(this));
        this.canvas.addEventListener('wheel', this.handleWheel.bind(this));
    }

    /**
     * 处理鼠标按下事件
     * 判断用户是要拖动图片、拖动裁剪框，还是调整裁剪框大小
     * @param {MouseEvent} e - 鼠标事件对象
     */
    handleMouseDown(e) {
        e.preventDefault();
        // 获取鼠标在Canvas内的相对坐标
        const rect = this.canvas.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        // 在自由模式下，检查是否点击了调整手柄
        if (this.options.cropMode === 'free') {
            const handle = this.getResizeHandle(x, y);
            if (handle) {
                this.isResizing = true;
                this.resizeHandle = handle;
                this.lastMouseX = x;
                this.lastMouseY = y;
                return;
            }
        }

        // 检查是否点击在裁剪框内部
        if (this.isInsideCropBox(x, y)) {
            this.isDraggingCropBox = true;
            this.lastMouseX = x;
            this.lastMouseY = y;
            return;
        }

        // 否则，拖动图片
        this.isDraggingImage = true;
        this.lastMouseX = x;
        this.lastMouseY = y;
    }

    /**
     * 处理鼠标移动事件
     * 根据当前交互状态执行相应的拖动或缩放操作
     * @param {MouseEvent} e - 鼠标事件对象
     */
    handleMouseMove(e) {
        e.preventDefault();
        const rect = this.canvas.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        // 拖动图片
        if (this.isDraggingImage) {
            const dx = x - this.lastMouseX;
            const dy = y - this.lastMouseY;
            this.imageState.x += dx;
            this.imageState.y += dy;
            this.lastMouseX = x;
            this.lastMouseY = y;
            this.render();
        }
        // 拖动裁剪框
        else if (this.isDraggingCropBox) {
            const dx = x - this.lastMouseX;
            const dy = y - this.lastMouseY;
            this.cropBox.x += dx;
            this.cropBox.y += dy;
            // 限制裁剪框不超出画布边界
            this.cropBox.x = Math.max(0, Math.min(this.cropBox.x, this.options.width - this.cropBox.width));
            this.cropBox.y = Math.max(0, Math.min(this.cropBox.y, this.options.height - this.cropBox.height));
            this.lastMouseX = x;
            this.lastMouseY = y;
            this.render();
            this.notifyCropChange();
        }
        // 调整裁剪框大小
        else if (this.isResizing) {
            this.handleResize(x, y);
            this.lastMouseX = x;
            this.lastMouseY = y;
            this.render();
            this.notifyCropChange();
        }

        // 更新鼠标光标样式
        if (this.options.cropMode === 'free' && !this.isResizing && !this.isDraggingCropBox && !this.isDraggingImage) {
            this.currentHandle = this.getResizeHandle(x, y);
            this.canvas.style.cursor = this.currentHandle ? this.getCursorForHandle(this.currentHandle) : 'default';
        } else if (this.isInsideCropBox(x, y) && !this.isResizing) {
            this.canvas.style.cursor = 'move';
        } else {
            this.canvas.style.cursor = 'default';
        }
    }

    /**
     * 处理鼠标释放事件
     * 重置所有交互状态标志
     */
    handleMouseUp(e) {
        this.isDraggingImage = false;
        this.isDraggingCropBox = false;
        this.isResizing = false;
        this.resizeHandle = null;
    }

    /**
     * 处理鼠标滚轮事件
     * 实现图片的缩放功能
     * @param {WheelEvent} e - 滚轮事件对象
     */
    handleWheel(e) {
        e.preventDefault();
        // 向下滚动缩小，向上滚动放大
        const delta = e.deltaY > 0 ? 0.9 : 1.1;
        const newScale = this.imageState.scale * delta;
        // 限制缩放范围在最小值和最大值之间
        this.imageState.scale = Math.max(this.options.minScale, Math.min(this.options.maxScale, newScale));
        this.render();
    }

    /**
     * 获取指定坐标下的调整手柄
     * @param {number} x - X坐标
     * @param {number} y - Y坐标
     * @returns {string|null} 手柄名称：nw/ne/sw/se/n/s/e/w，或null
     */
    getResizeHandle(x, y) {
        // 定义8个调整手柄的位置
        const handles = {
            'nw': {x: this.cropBox.x, y: this.cropBox.y},
            'ne': {x: this.cropBox.x + this.cropBox.width, y: this.cropBox.y},
            'sw': {x: this.cropBox.x, y: this.cropBox.y + this.cropBox.height},
            'se': {x: this.cropBox.x + this.cropBox.width, y: this.cropBox.y + this.cropBox.height},
            'n': {x: this.cropBox.x + this.cropBox.width / 2, y: this.cropBox.y},
            's': {x: this.cropBox.x + this.cropBox.width / 2, y: this.cropBox.y + this.cropBox.height},
            'e': {x: this.cropBox.x + this.cropBox.width, y: this.cropBox.y + this.cropBox.height / 2},
            'w': {x: this.cropBox.x, y: this.cropBox.y + this.cropBox.height / 2}
        };

        // 检查鼠标是否在某个手柄的范围内
        for (const [name, pos] of Object.entries(handles)) {
            if (Math.abs(x - pos.x) <= this.handleSize && Math.abs(y - pos.y) <= this.handleSize) {
                return name;
            }
        }
        return null;
    }

    /**
     * 根据手柄名称返回对应的鼠标光标样式
     * @param {string} handle - 手柄名称
     * @returns {string} CSS光标样式
     */
    getCursorForHandle(handle) {
        const cursors = {
            'nw': 'nw-resize',
            'ne': 'ne-resize',
            'sw': 'sw-resize',
            'se': 'se-resize',
            'n': 'n-resize',
            's': 's-resize',
            'e': 'e-resize',
            'w': 'w-resize'
        };
        return cursors[handle] || 'default';
    }

    /**
     * 处理裁剪框的大小调整
     * @param {number} x - 当前鼠标X坐标
     * @param {number} y - 当前鼠标Y坐标
     */
    handleResize(x, y) {
        const handle = this.resizeHandle;
        const minSize = 20;  // 最小裁剪框尺寸

        // 根据不同的手柄调整裁剪框的宽高和位置
        if (handle.includes('e')) {
            // 东侧手柄：调整右边界
            this.cropBox.width = Math.max(minSize, x - this.cropBox.x);
        }
        if (handle.includes('w')) {
            // 西侧手柄：调整左边界
            const newWidth = this.cropBox.x + this.cropBox.width - x;
            if (newWidth >= minSize) {
                this.cropBox.x = x;
                this.cropBox.width = newWidth;
            }
        }
        if (handle.includes('s')) {
            // 南侧手柄：调整下边界
            this.cropBox.height = Math.max(minSize, y - this.cropBox.y);
        }
        if (handle.includes('n')) {
            // 北侧手柄：调整上边界
            const newHeight = this.cropBox.y + this.cropBox.height - y;
            if (newHeight >= minSize) {
                this.cropBox.y = y;
                this.cropBox.height = newHeight;
            }
        }

        // 确保裁剪框不超出画布边界
        this.cropBox.x = Math.max(0, this.cropBox.x);
        this.cropBox.y = Math.max(0, this.cropBox.y);
        this.cropBox.width = Math.min(this.cropBox.width, this.options.width - this.cropBox.x);
        this.cropBox.height = Math.min(this.cropBox.height, this.options.height - this.cropBox.y);
    }

    /**
     * 检查指定坐标是否在裁剪框内部
     * @param {number} x - X坐标
     * @param {number} y - Y坐标
     * @returns {boolean} 是否在裁剪框内
     */
    isInsideCropBox(x, y) {
        return x >= this.cropBox.x && x <= this.cropBox.x + this.cropBox.width &&
            y >= this.cropBox.y && y <= this.cropBox.y + this.cropBox.height;
    }

    /**
     * 旋转图片
     * @param {number} degrees - 旋转的角度（正数顺时针，负数逆时针）
     */
    rotate(degrees) {
        this.imageState.rotation += degrees;
        this.render();
    }

    /**
     * 水平翻转图片
     */
    flipHorizontal() {
        this.imageState.flipX *= -1;
        this.render();
    }

    /**
     * 垂直翻转图片
     */
    flipVertical() {
        this.imageState.flipY *= -1;
        this.render();
    }

    /**
     * 设置图片缩放比例
     * @param {number} scale - 目标缩放比例
     */
    setScale(scale) {
        this.imageState.scale = Math.max(this.options.minScale, Math.min(this.options.maxScale, scale));
        this.render();
    }

    /**
     * 渲染整个画布
     * 绘制图片、裁剪框和调整手柄
     */
    render() {
        // 清空画布
        this.ctx.clearRect(0, 0, this.options.width, this.options.height);

        // 绘制图片（应用所有变换）
        if (this.image) {
            this.ctx.save();
            this.ctx.translate(this.imageState.x, this.imageState.y);
            this.ctx.rotate(this.imageState.rotation * Math.PI / 180);
            this.ctx.scale(this.imageState.flipX * this.imageState.scale, this.imageState.flipY * this.imageState.scale);
            this.ctx.drawImage(this.image, -this.image.width / 2, -this.image.height / 2);
            this.ctx.restore();
        }

        // 绘制裁剪框
        this.drawCropBox();
        // 自由模式下绘制调整手柄
        if (this.options.cropMode === 'free') {
            this.drawResizeHandles();
        }
    }

    /**
     * 绘制裁剪框
     * 包括半透明遮罩、裁剪区域高亮和边框
     */
    drawCropBox() {
        this.ctx.save();

        // 绘制半透明黑色遮罩
        this.ctx.fillStyle = 'rgba(0, 0, 0, 0.5)';
        this.ctx.fillRect(0, 0, this.options.width, this.options.height);

        // 清除裁剪框区域的遮罩，显示原图
        this.ctx.clearRect(this.cropBox.x, this.cropBox.y, this.cropBox.width, this.cropBox.height);

        // 在裁剪框内绘制应用变换后的图片
        if (this.image) {
            this.ctx.save();
            this.ctx.beginPath();
            this.ctx.rect(this.cropBox.x, this.cropBox.y, this.cropBox.width, this.cropBox.height);
            this.ctx.clip();  // 裁剪到框内
            this.ctx.translate(this.imageState.x, this.imageState.y);
            this.ctx.rotate(this.imageState.rotation * Math.PI / 180);
            this.ctx.scale(this.imageState.flipX * this.imageState.scale, this.imageState.flipY * this.imageState.scale);
            this.ctx.drawImage(this.image, -this.image.width / 2, -this.image.height / 2);
            this.ctx.restore();
        }

        // 绘制白色边框
        this.ctx.strokeStyle = '#fff';
        this.ctx.lineWidth = 2;
        this.ctx.strokeRect(this.cropBox.x, this.cropBox.y, this.cropBox.width, this.cropBox.height);

        this.ctx.restore();
    }

    /**
     * 绘制8个调整手柄
     * 四个角和四条边的中点
     */
    drawResizeHandles() {
        // 定义8个手柄的位置
        const handles = [
            {x: this.cropBox.x, y: this.cropBox.y},
            {x: this.cropBox.x + this.cropBox.width, y: this.cropBox.y},
            {x: this.cropBox.x, y: this.cropBox.y + this.cropBox.height},
            {x: this.cropBox.x + this.cropBox.width, y: this.cropBox.y + this.cropBox.height},
            {x: this.cropBox.x + this.cropBox.width / 2, y: this.cropBox.y},
            {x: this.cropBox.x + this.cropBox.width / 2, y: this.cropBox.y + this.cropBox.height},
            {x: this.cropBox.x, y: this.cropBox.y + this.cropBox.height / 2},
            {x: this.cropBox.x + this.cropBox.width, y: this.cropBox.y + this.cropBox.height / 2}
        ];

        // 设置手柄样式
        this.ctx.fillStyle = '#fff';
        this.ctx.strokeStyle = '#000';
        this.ctx.lineWidth = 1;

        // 绘制所有手柄
        handles.forEach(handle => {
            this.ctx.fillRect(handle.x - this.handleSize / 2, handle.y - this.handleSize / 2, this.handleSize, this.handleSize);
            this.ctx.strokeRect(handle.x - this.handleSize / 2, handle.y - this.handleSize / 2, this.handleSize, this.handleSize);
        });
    }

    /**
     * 通知裁剪框位置发生变化
     * 触发回调函数（如果已设置）
     */
    notifyCropChange() {
        if (this.options.onCropChange) {
            this.options.onCropChange({
                x: this.cropBox.x,
                y: this.cropBox.y,
                width: this.cropBox.width,
                height: this.cropBox.height
            });
        }
    }

    /**
     * 导出裁剪后的图片
     * @param {string} format - 输出格式：'image/jpeg' 或 'image/png'，默认JPEG
     * @param {number} quality - 输出质量，0.1到1.0之间，默认0.9
     * @returns {string} base64格式的图片数据URL
     */
    export(format = 'image/jpeg', quality = 0.9) {
        if (!this.image) {
            throw new Error('No image loaded');
        }

        // 创建临时画布，大小与显示画布相同
        const tempCanvas = document.createElement('canvas');
        const tempCtx = tempCanvas.getContext('2d');
        tempCanvas.width = this.options.width;
        tempCanvas.height = this.options.height;

        // 在临时画布上绘制应用所有变换后的图片
        tempCtx.translate(this.imageState.x, this.imageState.y);
        tempCtx.rotate(this.imageState.rotation * Math.PI / 180);
        tempCtx.scale(this.imageState.flipX * this.imageState.scale, this.imageState.flipY * this.imageState.scale);
        tempCtx.drawImage(this.image, -this.image.width / 2, -this.image.height / 2);

        // 创建导出画布，大小为裁剪框大小
        const exportCanvas = document.createElement('canvas');
        exportCanvas.width = this.cropBox.width;
        exportCanvas.height = this.cropBox.height;
        const exportCtx = exportCanvas.getContext('2d');

        // 从临时画布中提取裁剪框区域
        exportCtx.drawImage(
            tempCanvas,
            this.cropBox.x, this.cropBox.y, this.cropBox.width, this.cropBox.height,
            0, 0, this.cropBox.width, this.cropBox.height
        );

        // 转换为base64数据URL
        const mimeType = format === 'image/png' ? 'image/png' : 'image/jpeg';
        const dataUrl = exportCanvas.toDataURL(mimeType, quality);

        return dataUrl;
    }

    /**
     * 设置裁剪模式
     * @param {string} mode - 'free'(自由模式) 或 'fixed'(固定模式)
     */
    setCropMode(mode) {
        this.options.cropMode = mode;
        if (mode === 'fixed') {
            // 固定模式下重置裁剪框尺寸
            this.cropBox.width = this.options.cropSize.width || 150;
            this.cropBox.height = this.options.cropSize.height || 150;
            this.cropBox.x = (this.options.width - this.cropBox.width) / 2;
            this.cropBox.y = (this.options.height - this.cropBox.height) / 2;
        }
        this.render();
    }

    /**
     * 重置所有图片变换状态
     * 恢复到初始状态
     */
    reset() {
        this.imageState = {
            x: this.options.width / 2,
            y: this.options.height / 2,
            scale: 1,
            rotation: 0,
            flipX: 1,
            flipY: 1
        };
        this.centerImage();
        this.cropBox.x = (this.options.width - this.cropBox.width) / 2;
        this.cropBox.y = (this.options.height - this.cropBox.height) / 2;
        this.render();
    }
}

// 支持CommonJS模块导出
if (typeof module !== 'undefined' && module.exports) {
    module.exports = ImageCropper;
}
