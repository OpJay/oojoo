# OoJoo

OoJoo는 웹 페이지에 아름다운 별이 흐르는 효과를 쉽게 추가할 수 있는 경량화된 JavaScript 라이브러리입니다.

## 특징

- 🌟 커스터마이즈 가능한 별의 개수, 크기, 회전 속도
- ✨ 자연스러운 별 반짝임 효과
- 🎮 직관적인 컨트롤러 인터페이스
- 🌐 다국어 지원 (한국어, 영어, 일본어, 중국어)
- 📱 반응형 디자인
- 🚀 가벼운 성능

## 설치

```html
<script src="oojoo.js"></script>
```

## 사용 방법

```javascript
// 기본 설정으로 초기화
const oojoo = new OoJoo();

// 또는 커스텀 옵션으로 초기화
const oojoo = new OoJoo({
  numberOfStars: 300,      // 별의 개수
  minStarSize: 0.6,        // 최소 별 크기 (px)
  maxStarSize: 2.4,        // 최대 별 크기 (px)
  twinkleDuration: 5,      // 반짝임 지속 시간 (초)
  rotationDuration: 240    // 회전 주기 (초)
});
```

## 옵션

| 옵션 | 타입 | 기본값 | 설명 |
|------|------|--------|------|
| `numberOfStars` | number | 220 | 생성할 별의 개수 |
| `minStarSize` | number | 0.6 | 별의 최소 크기 (픽셀) |
| `maxStarSize` | number | 2.4 | 별의 최대 크기 (픽셀) |
| `twinkleDuration` | number | 5 | 별이 반짝이는 주기 (초) |
| `rotationDuration` | number | 240 | 하늘이 한 바퀴 도는 시간 (초) |

## 메서드

```javascript
// 별의 개수 변경
oojoo.setNumberOfStars(300);

// 회전 속도 변경
oojoo.setRotationDuration(180);

// 별 크기 범위 변경
oojoo.setStarSize(0.8, 3.0);

// 반짝임 지속 시간 변경
oojoo.setTwinkleDuration(3);

// 애니메이션 일시 정지
oojoo.pause();

// 애니메이션 재개
oojoo.resume();

// 효과 제거
oojoo.destroy();
```

## 데모

라이브러리의 데모와 다양한 예제를 확인하려면 [데모 페이지](https://example.com/demo)를 방문하세요.

## 라이선스

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