// --- 별 생성 및 애니메이션 라이브러리 ---
class StarrySky {
  constructor(options = {}) {
    this.options = {
      containerId: 'star-container',
      numberOfStars: 220,
      minStarSize: 0.6,
      maxStarSize: 2.4,
      twinkleDuration: 5,
      rotationDuration: 240,
      ...options
    };
    
    // 소수점 2번째 자리에서 자르기
    this.options.minStarSize = this.roundToTwoDecimals(this.options.minStarSize);
    this.options.maxStarSize = this.roundToTwoDecimals(this.options.maxStarSize);
    
    this.container = null;
    this.init();
  }

  // 소수점 2번째 자리에서 자르는 함수
  roundToTwoDecimals(num) {
    return Math.round(num * 100) / 100;
  }

  init() {
    // 컨테이너가 없으면 생성
    this.container = document.getElementById(this.options.containerId);
    if (!this.container) {
      this.container = document.createElement('div');
      this.container.id = this.options.containerId;
      document.body.appendChild(this.container);
    }
    
    this.createStars();
    this.applyStyles();
  }

  createStars() {
    // 기존 별들 제거
    this.container.innerHTML = '';
    
    for (let i = 0; i < this.options.numberOfStars; i++) {
      const star = document.createElement('div');
      star.classList.add('star');

      // 랜덤 위치 설정
      const xPos = Math.random() * 100;
      const yPos = Math.random() * 100;
      star.style.left = `${xPos}%`;
      star.style.top = `${yPos}%`;

      // 랜덤 크기 설정
      const size = Math.random() * (this.options.maxStarSize - this.options.minStarSize) + this.options.minStarSize;
      star.style.width = `${this.roundToTwoDecimals(size)}px`;
      star.style.height = `${this.roundToTwoDecimals(size)}px`;

      // 랜덤 반짝임 애니메이션 지연
      const twinkleDelay = Math.random() * this.options.twinkleDuration;
      star.style.animationDelay = `-${twinkleDelay}s`;

      this.container.appendChild(star);
    }
  }

  applyStyles() {
    // 컨테이너 스타일 적용
    this.container.style.position = 'fixed';
    this.container.style.top = '50%';
    this.container.style.left = '50%';
    this.container.style.width = '200vw';
    this.container.style.height = '200vh';
    this.container.style.willChange = 'transform';
    this.container.style.animation = `rotate-sky ${this.options.rotationDuration}s linear infinite`;
    this.container.style.zIndex = '0';
    this.container.style.pointerEvents = 'none';
    
    // 별 스타일 적용
    const style = document.createElement('style');
    style.textContent = `
      @keyframes rotate-sky {
        from {
          transform: translate(-50%, -50%) rotate(0deg);
        }
        to {
          transform: translate(-50%, -50%) rotate(360deg);
        }
      }
      
      .star {
        position: absolute;
        width: 1px;
        height: 1px;
        background-color: white;
        border-radius: 50%;
        box-shadow: 0 0 4px white, 0 0 6px white;
        opacity: 0.8;
        animation: twinkle ${this.options.twinkleDuration}s infinite alternate ease-in-out;
        will-change: opacity, transform;
      }
      
      @keyframes twinkle {
        0% {
          transform: scale(1);
          opacity: 0.5;
        }
        50% {
          transform: scale(1.3);
          opacity: 1;
        }
        100% {
          transform: scale(1);
          opacity: 0.5;
        }
      }
    `;
    
    // 기존 스타일 태그가 있으면 제거
    const existingStyle = document.getElementById('starry-sky-style');
    if (existingStyle) {
      existingStyle.remove();
    }
    
    style.id = 'starry-sky-style';
    document.head.appendChild(style);
  }

  // 별 개수 변경
  setNumberOfStars(count) {
    this.options.numberOfStars = count;
    this.createStars();
  }

  // 회전 속도 변경
  setRotationDuration(seconds) {
    this.options.rotationDuration = seconds;
    this.container.style.animation = `rotate-sky ${seconds}s linear infinite`;
  }
  
  // 별 크기 변경
  setStarSize(minSize, maxSize) {
    this.options.minStarSize = this.roundToTwoDecimals(minSize);
    this.options.maxStarSize = this.roundToTwoDecimals(maxSize);
    this.createStars();
  }
  
  // 반짝임 지속 시간 변경
  setTwinkleDuration(seconds) {
    this.options.twinkleDuration = seconds;
    this.createStars();
    this.applyStyles(); // 스타일 재적용 필요
  }

  // 애니메이션 일시 정지
  pause() {
    this.container.style.animationPlayState = 'paused';
  }

  // 애니메이션 재개
  resume() {
    this.container.style.animationPlayState = 'running';
  }

  // 애니메이션 제거
  destroy() {
    if (this.container) {
      this.container.remove();
    }
    
    const style = document.getElementById('starry-sky-style');
    if (style) {
      style.remove();
    }
  }
}

// 전역 객체로 노출
window.StarrySky = StarrySky;