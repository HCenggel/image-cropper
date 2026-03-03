const languages = {
  en: {
    code: 'en',
    name: 'English',
    icon: '🇬🇧',
    html: {
      title: 'ImageCropper - Lightweight Image Cropper Library',
      header: {
        title: '🖼️ ImageCropper',
        description: 'Lightweight, pure JavaScript image cropping library - No dependencies, easy integration',
        badges: ['⚡ Lightweight & Fast', '🎯 No Dependencies', '💡 Easy to Use'],
        ctaButton: '<i class="fas fa-play"></i> View Demo'
      },
      features: {
        title: '✨ Core Features',
        items: [
          {
            icon: 'fas fa-arrows-alt',
            title: 'Image Transformations',
            description: 'Support drag/pan, scroll to zoom (0.1x - 10x), rotate, flip horizontally/vertically'
          },
          {
            icon: 'fas fa-crop-alt',
            title: 'Crop Modes',
            description: 'Free mode (resizable) and Fixed mode (fixed size) to meet different needs'
          },
          {
            icon: 'fas fa-desktop',
            title: 'Desktop Optimized',
            description: 'Optimized for mouse interactions on desktop platforms with smooth experience'
          },
          {
            icon: 'fas fa-file-export',
            title: 'Flexible Export',
            description: 'Export as JPEG or PNG with adjustable quality (0.1 - 1.0), returns Base64 data'
          },
          {
            icon: 'fas fa-code',
            title: 'Pure JavaScript',
            description: 'No framework dependencies, lightweight code, quick integration into any project'
          },
          {
            icon: 'fas fa-palette',
            title: 'Canvas Rendering',
            description: 'Based on Canvas API, minimal CSS dependency, excellent performance'
          }
        ]
      },
      code: {
        title: '🚀 Quick Start',
        jsTitle: 'JavaScript',
        jsCode: `<span class="comment">// Create a cropper instance</span>
<span class="keyword">const</span> cropper = <span class="keyword">new</span> <span class="function">ImageCropper</span>(<span class="string">'#container'</span>, {
  width: <span class="number">500</span>,
  height: <span class="number">500</span>,
  cropMode: <span class="string">'free'</span>
});

<span class="comment">// Load an image</span>
<span class="keyword">await</span> cropper.<span class="function">loadImage</span>(<span class="string">'path/to/image.jpg'</span>);

<span class="comment">// Export the cropped image</span>
<span class="keyword">const</span> base64Data = cropper.<span class="function">export</span>(<span class="string">'image/jpeg'</span>, <span class="number">0.9</span>);
console.<span class="function">log</span>(base64Data);`,
        htmlTitle: 'HTML',
        htmlCode: `<span class="comment">&lt;!-- Include library file --&gt;</span>
&lt;<span class="keyword">script</span> src=<span class="string">"image-cropper.js"</span>&gt;&lt;/<span class="keyword">script</span>&gt;

<span class="comment">&lt;!-- Create container --&gt;</span>
&lt;<span class="keyword">div</span> id=<span class="string">"container"</span>&gt;&lt;/<span class="keyword">div</span>&gt;`
      },
      api: {
        title: '📚 Main APIs',
        items: [
          {
            name: 'loadImage(src)',
            description: 'Load an image from URL or base64 string',
            method: 'Promise'
          },
          {
            name: 'rotate(degrees)',
            description: 'Rotate the image by specified degrees',
            method: 'void'
          },
          {
            name: 'flipHorizontal()',
            description: 'Flip the image horizontally',
            method: 'void'
          },
          {
            name: 'flipVertical()',
            description: 'Flip the image vertically',
            method: 'void'
          },
          {
            name: 'setScale(scale)',
            description: 'Set the image scale (0.1 to 10)',
            method: 'void'
          },
          {
            name: 'setCropMode(mode)',
            description: 'Set the crop mode',
            method: 'void'
          },
          {
            name: 'export(format, quality)',
            description: 'Export the cropped image as base64 data URL',
            method: 'string'
          },
          {
            name: 'reset()',
            description: 'Reset all image transformations to default state',
            method: 'void'
          }
        ]
      },
      links: {
        title: '🔗 Quick Links',
        items: [
          {
            icon: 'fas fa-play-circle',
            name: 'Live Demo',
            href: 'demo/'
          },
          {
            icon: 'fas fa-file-code',
            name: 'Full Version (21KB)',
            href: 'image-cropper.js'
          },
          {
            icon: 'fas fa-compress',
            name: 'Minified Version (10KB)',
            href: 'image-cropper.min.js'
          }
        ]
      },
      footer: '© 2024 ImageCropper - MIT License'
    }
  },
  zh: {
    code: 'zh',
    name: '简体中文',
    icon: '🇨🇳',
    html: {
      title: 'ImageCropper - 轻量级图片裁剪库',
      header: {
        title: '🖼️ ImageCropper',
        description: '轻量级、纯JavaScript图片裁剪库 - 无依赖，易集成',
        badges: ['⚡ 轻量快速', '🎯 无依赖', '💡 易于使用'],
        ctaButton: '<i class="fas fa-play"></i> 查看演示'
      },
      features: {
        title: '✨ 核心特性',
        items: [
          {
            icon: 'fas fa-arrows-alt',
            title: '图片变换',
            description: '支持拖动平移、滚轮缩放（0.1x - 10x）、旋转、水平/垂直翻转等操作'
          },
          {
            icon: 'fas fa-crop-alt',
            title: '裁剪模式',
            description: '自由模式（可调整大小）和固定模式（固定尺寸），满足不同需求'
          },
          {
            icon: 'fas fa-desktop',
            title: '桌面优化',
            description: '专门针对桌面端鼠标操作优化，提供流畅的交互体验'
          },
          {
            icon: 'fas fa-file-export',
            title: '灵活导出',
            description: '支持JPEG和PNG格式导出，质量可调（0.1 - 1.0），返回Base64数据'
          },
          {
            icon: 'fas fa-code',
            title: '纯JavaScript',
            description: '无需任何框架依赖，轻量级代码，快速集成到任何项目'
          },
          {
            icon: 'fas fa-palette',
            title: 'Canvas渲染',
            description: '基于Canvas API绘制，最小化CSS依赖，性能优异'
          }
        ]
      },
      code: {
        title: '🚀 快速开始',
        jsTitle: 'JavaScript',
        jsCode: `<span class="comment">// 创建裁剪器实例</span>
<span class="keyword">const</span> cropper = <span class="keyword">new</span> <span class="function">ImageCropper</span>(<span class="string">'#container'</span>, {
  width: <span class="number">500</span>,
  height: <span class="number">500</span>,
  cropMode: <span class="string">'free'</span>
});

<span class="comment">// 加载图片</span>
<span class="keyword">await</span> cropper.<span class="function">loadImage</span>(<span class="string">'path/to/image.jpg'</span>);

<span class="comment">// 导出裁剪后的图片</span>
<span class="keyword">const</span> base64Data = cropper.<span class="function">export</span>(<span class="string">'image/jpeg'</span>, <span class="number">0.9</span>);
console.<span class="function">log</span>(base64Data);`,
        htmlTitle: 'HTML',
        htmlCode: `<span class="comment">&lt;!-- 引入库文件 --&gt;</span>
&lt;<span class="keyword">script</span> src=<span class="string">"image-cropper.js"</span>&gt;&lt;/<span class="keyword">script</span>&gt;

<span class="comment">&lt;!-- 创建容器 --&gt;</span>
&lt;<span class="keyword">div</span> id=<span class="string">"container"</span>&gt;&lt;/<span class="keyword">div</span>&gt;`
      },
      api: {
        title: '📚 主要API',
        items: [
          {
            name: 'loadImage(src)',
            description: '从URL或base64字符串加载图片',
            method: 'Promise'
          },
          {
            name: 'rotate(degrees)',
            description: '按指定角度旋转图片',
            method: 'void'
          },
          {
            name: 'flipHorizontal()',
            description: '水平翻转图片',
            method: 'void'
          },
          {
            name: 'flipVertical()',
            description: '垂直翻转图片',
            method: 'void'
          },
          {
            name: 'setScale(scale)',
            description: '设置图片缩放比例',
            method: 'void'
          },
          {
            name: 'setCropMode(mode)',
            description: '设置裁剪模式',
            method: 'void'
          },
          {
            name: 'export(format, quality)',
            description: '导出裁剪后的图片',
            method: 'string'
          },
          {
            name: 'reset()',
            description: '重置所有图片变换',
            method: 'void'
          }
        ]
      },
      links: {
        title: '🔗 快速链接',
        items: [
          {
            icon: 'fas fa-play-circle',
            name: '在线演示',
            href: 'demo/'
          },
          {
            icon: 'fas fa-file-code',
            name: '完整版 (21KB)',
            href: 'image-cropper.js'
          },
          {
            icon: 'fas fa-compress',
            name: '压缩版 (10KB)',
            href: 'image-cropper.min.js'
          }
        ]
      },
      footer: '© 2024 ImageCropper - MIT License'
    }
  },
  ja: {
    code: 'ja',
    name: '日本語',
    icon: '🇯🇵',
    html: {
      title: 'ImageCropper - 軽量級イメージクロップライブラリ',
      header: {
        title: '🖼️ ImageCropper',
        description: '軽量級、純粋なJavaScriptイメージクロップライブラリ - 依存関係なし、統合が簡単',
        badges: ['⚡ 軽量・高速', '🎯 依存関係なし', '💡 使いやすい'],
        ctaButton: '<i class="fas fa-play"></i> デモを見る'
      },
      features: {
        title: '✨ 主要機能',
        items: [
          {
            icon: 'fas fa-arrows-alt',
            title: '画像変換',
            description: 'ドラッグ/パン、スクロールでズーム（0.1x - 10x）、回転、水平/垂直反転をサポート'
          },
          {
            icon: 'fas fa-crop-alt',
            title: 'クロップモード',
            description: 'サイズ変更可能な自由モードと固定サイズの固定モードで、様々なニーズに対応'
          },
          {
            icon: 'fas fa-desktop',
            title: 'デスクトップ最適化',
            description: 'デスクトッププラットフォームのマウス操作に最適化され、スムーズな体験を提供'
          },
          {
            icon: 'fas fa-file-export',
            title: '柔軟なエクスポート',
            description: 'JPEGまたはPNG形式で品質調整可能（0.1 - 1.0）、Base64データを返す'
          },
          {
            icon: 'fas fa-code',
            title: '純粋なJavaScript',
            description: 'フレームワークの依存関係なし、軽量なコード、どのプロジェクトにも迅速に統合'
          },
          {
            icon: 'fas fa-palette',
            title: 'Canvasレンダリング',
            description: 'Canvas APIベース、最小限のCSS依存、優れたパフォーマンス'
          }
        ]
      },
      code: {
        title: '🚀 クイックスタート',
        jsTitle: 'JavaScript',
        jsCode: `<span class="comment">// クロッパーインスタンスを作成</span>
<span class="keyword">const</span> cropper = <span class="keyword">new</span> <span class="function">ImageCropper</span>(<span class="string">'#container'</span>, {
  width: <span class="number">500</span>,
  height: <span class="number">500</span>,
  cropMode: <span class="string">'free'</span>
});

<span class="comment">// 画像を読み込み</span>
<span class="keyword">await</span> cropper.<span class="function">loadImage</span>(<span class="string">'path/to/image.jpg'</span>);

<span class="comment">// クロップした画像をエクスポート</span>
<span class="keyword">const</span> base64Data = cropper.<span class="function">export</span>(<span class="string">'image/jpeg'</span>, <span class="number">0.9</span>);
console.<span class="function">log</span>(base64Data);`,
        htmlTitle: 'HTML',
        htmlCode: `<span class="comment">&lt;!-- ライブラリファイルを含める --&gt;</span>
&lt;<span class="keyword">script</span> src=<span class="string">"image-cropper.js"</span>&gt;&lt;/<span class="keyword">script</span>&gt;

<span class="comment">&lt;!-- コンテナを作成 --&gt;</span>
&lt;<span class="keyword">div</span> id=<span class="string">"container"</span>&gt;&lt;/<span class="keyword">div</span>&gt;`
      },
      api: {
        title: '📚 主要API',
        items: [
          {
            name: 'loadImage(src)',
            description: 'URLまたはbase64文字列から画像を読み込み',
            method: 'Promise'
          },
          {
            name: 'rotate(degrees)',
            description: '指定した角度で画像を回転',
            method: 'void'
          },
          {
            name: 'flipHorizontal()',
            description: '画像を水平方向に反転',
            method: 'void'
          },
          {
            name: 'flipVertical()',
            description: '画像を垂直方向に反転',
            method: 'void'
          },
          {
            name: 'setScale(scale)',
            description: '画像のスケールを設定（0.1から10）',
            method: 'void'
          },
          {
            name: 'setCropMode(mode)',
            description: 'クロップモードを設定',
            method: 'void'
          },
          {
            name: 'export(format, quality)',
            description: 'クロップした画像をbase64データURLとしてエクスポート',
            method: 'string'
          },
          {
            name: 'reset()',
            description: 'すべての画像変換をデフォルト状態にリセット',
            method: 'void'
          }
        ]
      },
      links: {
        title: '🔗 クイックリンク',
        items: [
          {
            icon: 'fas fa-play-circle',
            name: 'ライブデモ',
            href: 'demo/'
          },
          {
            icon: 'fas fa-file-code',
            name: '完全版 (21KB)',
            href: 'image-cropper.js'
          },
          {
            icon: 'fas fa-compress',
            name: '圧縮版 (10KB)',
            href: 'image-cropper.min.js'
          }
        ]
      },
      footer: '© 2024 ImageCropper - MIT License'
    }
  },
  ko: {
    code: 'ko',
    name: '한국어',
    icon: '🇰🇷',
    html: {
      title: 'ImageCropper - 경량 이미지 자르기 라이브러리',
      header: {
        title: '🖼️ ImageCropper',
        description: '경량, 순수 JavaScript 이미지 자르기 라이브러리 - 종속성 없음, 쉬운 통합',
        badges: ['⚡ 가볍고 빠름', '🎯 종속성 없음', '💡 사용하기 쉬움'],
        ctaButton: '<i class="fas fa-play"></i> 데모 보기'
      },
      features: {
        title: '✨ 핵심 기능',
        items: [
          {
            icon: 'fas fa-arrows-alt',
            title: '이미지 변환',
            description: '드래그/팬, 스크롤 줌(0.1x - 10x), 회전, 수평/수직 뒤집기 지원'
          },
          {
            icon: 'fas fa-crop-alt',
            title: '자르기 모드',
            description: '자유 모드(크기 조절 가능) 및 고정 모드(고정 크기)로 다양한 요구사항 충족'
          },
          {
            icon: 'fas fa-desktop',
            title: '데스크톱 최적화',
            description: '데스크톱 플랫폼의 마우스 상호작용에 최적화되어 부드러운 경험 제공'
          },
          {
            icon: 'fas fa-file-export',
            title: '유연한 내보내기',
            description: 'JPEG 또는 PNG 형식으로 품질 조절 가능(0.1 - 1.0), Base64 데이터 반환'
          },
          {
            icon: 'fas fa-code',
            title: '순수 JavaScript',
            description: '프레임워크 종속성 없음, 가벼운 코드, 모든 프로젝트에 빠른 통합'
          },
          {
            icon: 'fas fa-palette',
            title: 'Canvas 렌더링',
            description: 'Canvas API 기반, 최소 CSS 종속성, 우수한 성능'
          }
        ]
      },
      code: {
        title: '🚀 빠른 시작',
        jsTitle: 'JavaScript',
        jsCode: `<span class="comment">// 자르기 인스턴스 생성</span>
<span class="keyword">const</span> cropper = <span class="keyword">new</span> <span class="function">ImageCropper</span>(<span class="string">'#container'</span>, {
  width: <span class="number">500</span>,
  height: <span class="number">500</span>,
  cropMode: <span class="string">'free'</span>
});

<span class="comment">// 이미지 로드</span>
<span class="keyword">await</span> cropper.<span class="function">loadImage</span>(<span class="string">'path/to/image.jpg'</span>);

<span class="comment">// 자른 이미지 내보내기</span>
<span class="keyword">const</span> base64Data = cropper.<span class="function">export</span>(<span class="string">'image/jpeg'</span>, <span class="number">0.9</span>);
console.<span class="function">log</span>(base64Data);`,
        htmlTitle: 'HTML',
        htmlCode: `<span class="comment">&lt;!-- 라이브러리 파일 포함 --&gt;</span>
&lt;<span class="keyword">script</span> src=<span class="string">"image-cropper.js"</span>&gt;&lt;/<span class="keyword">script</span>&gt;

<span class="comment">&lt;!-- 컨테이너 생성 --&gt;</span>
&lt;<span class="keyword">div</span> id=<span class="string">"container"</span>&gt;&lt;/<span class="keyword">div</span>&gt;`
      },
      api: {
        title: '📚 주요 API',
        items: [
          {
            name: 'loadImage(src)',
            description: 'URL 또는 base64 문자열에서 이미지 로드',
            method: 'Promise'
          },
          {
            name: 'rotate(degrees)',
            description: '지정된 각도로 이미지 회전',
            method: 'void'
          },
          {
            name: 'flipHorizontal()',
            description: '이미지 수평 뒤집기',
            method: 'void'
          },
          {
            name: 'flipVertical()',
            description: '이미지 수직 뒤집기',
            method: 'void'
          },
          {
            name: 'setScale(scale)',
            description: '이미지 스케일 설정(0.1에서 10까지)',
            method: 'void'
          },
          {
            name: 'setCropMode(mode)',
            description: '자르기 모드 설정',
            method: 'void'
          },
          {
            name: 'export(format, quality)',
            description: '자른 이미지를 base64 데이터 URL로 내보내기',
            method: 'string'
          },
          {
            name: 'reset()',
            description: '모든 이미지 변환을 기본 상태로 재설정',
            method: 'void'
          }
        ]
      },
      links: {
        title: '🔗 빠른 링크',
        items: [
          {
            icon: 'fas fa-play-circle',
            name: '라이브 데모',
            href: 'demo/'
          },
          {
            icon: 'fas fa-file-code',
            name: '전체 버전 (21KB)',
            href: 'image-cropper.js'
          },
          {
            icon: 'fas fa-compress',
            name: '압축 버전 (10KB)',
            href: 'image-cropper.min.js'
          }
        ]
      },
      footer: '© 2024 ImageCropper - MIT License'
    }
  }
};
