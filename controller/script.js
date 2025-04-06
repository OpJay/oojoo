document.addEventListener('DOMContentLoaded', () => {
  // 컨트롤러 동적 생성
  createController();
  
  // 기본 인스턴스는 자동으로 생성됨
  // 또는 직접 생성할 수도 있음
  window.oojooInstance = new OoJoo({
    numberOfStars: 300,
    rotationDuration: 180
  });
  
  // 소수점 2번째 자리에서 자르는 함수
  function roundToTwoDecimals(num) {
    return Math.round(num * 100) / 100;
  }
  
  // 옵션 값 표시 함수
  function updateOptionsDisplay() {
    document.getElementById('stars-count').value = window.oojooInstance.options.numberOfStars;
    document.getElementById('rotation-speed').value = window.oojooInstance.options.rotationDuration;
    document.getElementById('min-star-size').value = window.oojooInstance.options.minStarSize;
    document.getElementById('max-star-size').value = window.oojooInstance.options.maxStarSize;
    document.getElementById('twinkle-duration').value = window.oojooInstance.options.twinkleDuration;
  }
  
  // 초기 옵션 값 표시
  updateOptionsDisplay();
  
  // input 이벤트 리스너 설정
  document.getElementById('stars-count').addEventListener('input', (e) => {
    const value = parseInt(e.target.value);
    if (value > 0) {
      window.oojooInstance.setNumberOfStars(value);
    }
  });
  
  document.getElementById('rotation-speed').addEventListener('input', (e) => {
    const value = parseInt(e.target.value);
    if (value >= 30) {
      window.oojooInstance.setRotationDuration(value);
    }
  });
  
  document.getElementById('min-star-size').addEventListener('input', (e) => {
    const minValue = parseFloat(e.target.value);
    const maxValue = parseFloat(document.getElementById('max-star-size').value);
    if (minValue > 0 && minValue <= maxValue) {
      window.oojooInstance.setStarSize(minValue, maxValue);
    }
  });
  
  document.getElementById('max-star-size').addEventListener('input', (e) => {
    const maxValue = parseFloat(e.target.value);
    const minValue = parseFloat(document.getElementById('min-star-size').value);
    if (maxValue > 0 && maxValue >= minValue) {
      window.oojooInstance.setStarSize(minValue, maxValue);
    }
  });
  
  document.getElementById('twinkle-duration').addEventListener('input', (e) => {
    const value = parseInt(e.target.value);
    if (value >= 1) {
      window.oojooInstance.setTwinkleDuration(value);
    }
  });
  
  // 컨트롤 버튼 이벤트 설정
  document.getElementById('pause-btn').addEventListener('click', () => {
    window.oojooInstance.pause();
  });
  
  document.getElementById('resume-btn').addEventListener('click', () => {
    window.oojooInstance.resume();
  });
  
  // 별 개수 조절 버튼
  document.getElementById('more-stars-btn').addEventListener('click', () => {
    const currentCount = window.oojooInstance.options.numberOfStars;
    window.oojooInstance.setNumberOfStars(currentCount + 50);
    updateOptionsDisplay();
  });
  
  document.getElementById('less-stars-btn').addEventListener('click', () => {
    const currentCount = window.oojooInstance.options.numberOfStars;
    if (currentCount > 50) {
      window.oojooInstance.setNumberOfStars(currentCount - 50);
      updateOptionsDisplay();
    }
  });
  
  // 회전 속도 조절 버튼
  document.getElementById('faster-btn').addEventListener('click', () => {
    const currentDuration = window.oojooInstance.options.rotationDuration;
    window.oojooInstance.setRotationDuration(Math.max(30, currentDuration - 30));
    updateOptionsDisplay();
  });
  
  document.getElementById('slower-btn').addEventListener('click', () => {
    const currentDuration = window.oojooInstance.options.rotationDuration;
    window.oojooInstance.setRotationDuration(currentDuration + 30);
    updateOptionsDisplay();
  });
  
  // 별 크기 조절 버튼
  document.getElementById('bigger-stars-btn').addEventListener('click', () => {
    const currentMin = window.oojooInstance.options.minStarSize;
    const currentMax = window.oojooInstance.options.maxStarSize;
    const newMin = roundToTwoDecimals(currentMin + 0.2);
    const newMax = roundToTwoDecimals(currentMax + 0.2);
    window.oojooInstance.setStarSize(newMin, newMax);
    updateOptionsDisplay();
  });
  
  document.getElementById('smaller-stars-btn').addEventListener('click', () => {
    const currentMin = window.oojooInstance.options.minStarSize;
    const currentMax = window.oojooInstance.options.maxStarSize;
    if (currentMin > 0.2) {
      const newMin = roundToTwoDecimals(currentMin - 0.2);
      const newMax = roundToTwoDecimals(currentMax - 0.2);
      window.oojooInstance.setStarSize(newMin, newMax);
      updateOptionsDisplay();
    }
  });
  
  // 반짝임 속도 조절 버튼
  document.getElementById('faster-twinkle-btn').addEventListener('click', () => {
    const currentDuration = window.oojooInstance.options.twinkleDuration;
    if (currentDuration > 1) {
      window.oojooInstance.setTwinkleDuration(currentDuration - 1);
      updateOptionsDisplay();
    }
  });
  
  document.getElementById('slower-twinkle-btn').addEventListener('click', () => {
    const currentDuration = window.oojooInstance.options.twinkleDuration;
    window.oojooInstance.setTwinkleDuration(currentDuration + 1);
    updateOptionsDisplay();
  });

  // 컨트롤러 보이기/숨기기 기능
  const toggleControllerBtn = document.getElementById('toggle-controller');
  const controllerContainer = document.querySelector('.controller-container');
  let isControllerVisible = true;
  let currentLanguage = 'ko'; // 기본 언어 설정

  toggleControllerBtn.addEventListener('click', () => {
    isControllerVisible = !isControllerVisible;
    controllerContainer.classList.toggle('hidden');
    toggleControllerBtn.textContent = isControllerVisible ? translations[currentLanguage].hideController : translations[currentLanguage].showController;
  });

  // 언어 전환 기능
  const languageButtons = document.querySelectorAll('.language-btn');
  const translations = {
    ko: {
      title: 'OoJoo',
      description: '별이 흐르는 효과 라이브러리 데모',
      starsCount: '개수:',
      rotationSpeed: '회전 속도:',
      starSize: '크기:',
      twinkleDuration: '반짝임 지속 시간:',
      pause: '일시 정지',
      resume: '재개',
      viewExamples: '다중 예제 보기',
      seconds: '초',
      showController: '컨트롤러 보이기',
      hideController: '컨트롤러 숨기기'
    },
    en: {
      title: 'OoJoo',
      description: 'Flowing Stars Effect Library Demo',
      starsCount: 'Count:',
      rotationSpeed: 'Rotation Speed:',
      starSize: 'Size:',
      twinkleDuration: 'Twinkle Duration:',
      pause: 'Pause',
      resume: 'Resume',
      viewExamples: 'View Multiple Examples',
      seconds: 'sec',
      showController: 'Show Controller',
      hideController: 'Hide Controller'
    },
    ja: {
      title: 'OoJoo',
      description: '流れる星エフェクトライブラリデモ',
      starsCount: '数:',
      rotationSpeed: '回転速度:',
      starSize: 'サイズ:',
      twinkleDuration: 'きらめき持続時間:',
      pause: '一時停止',
      resume: '再開',
      viewExamples: '複数例を見る',
      seconds: '秒',
      showController: 'コントローラー表示',
      hideController: 'コントローラー非表示'
    },
    zh: {
      title: 'OoJoo',
      description: '流动星星效果库演示',
      starsCount: '数量:',
      rotationSpeed: '旋转速度:',
      starSize: '大小:',
      twinkleDuration: '闪烁持续时间:',
      pause: '暂停',
      resume: '继续',
      viewExamples: '查看多个示例',
      seconds: '秒',
      showController: '显示控制器',
      hideController: '隐藏控制器'
    }
  };

  function updateLanguage(lang) {
    const t = translations[lang];
    
    // 제목 및 설명 업데이트
    document.querySelector('.starry-sky-demo h1').textContent = t.title;
    document.querySelector('.starry-sky-demo p').textContent = t.description;
    
    // 옵션 라벨 업데이트
    const optionLabels = document.querySelectorAll('.option-label');
    optionLabels.forEach((label, index) => {
      if (index === 0) label.textContent = t.starsCount;
      else if (index === 1) label.textContent = t.rotationSpeed;
      else if (index === 2) label.textContent = t.starSize;
      else if (index === 3) label.textContent = t.twinkleDuration;
    });
    
    // 버튼 텍스트 업데이트
    document.getElementById('pause-btn').textContent = t.pause;
    document.getElementById('resume-btn').textContent = t.resume;
    
    // 네비게이션 링크 업데이트
    const navLink = document.querySelector('.nav-link');
    if (navLink) {
      navLink.textContent = t.viewExamples;
    }
    
    // 단위 텍스트 업데이트
    const unitSpans = document.querySelectorAll('.option-value + span');
    unitSpans.forEach(span => {
      if (span.textContent.includes('초') || span.textContent.includes('sec') || 
          span.textContent.includes('秒')) {
        span.textContent = t.seconds;
      }
    });
    
    // 컨트롤러 토글 버튼 텍스트 업데이트
    toggleControllerBtn.textContent = isControllerVisible ? t.hideController : t.showController;
  }

  languageButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const lang = btn.id.split('-')[1];
      currentLanguage = lang; // 현재 언어 업데이트
      languageButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      updateLanguage(lang);
      // 컨트롤러 버튼 텍스트도 업데이트
      toggleControllerBtn.textContent = isControllerVisible ? translations[lang].hideController : translations[lang].showController;
    });
  });
});

// 컨트롤러 동적 생성 함수
function createController() {
  // 상단 컨트롤 영역 생성
  const topControls = document.createElement('div');
  topControls.className = 'top-controls';
  
  // 컨트롤러 토글 버튼 생성
  const toggleControllerBtn = document.createElement('button');
  toggleControllerBtn.className = 'toggle-controller-btn';
  toggleControllerBtn.id = 'toggle-controller';
  toggleControllerBtn.textContent = '컨트롤러 보이기';
  
  // 언어 선택 영역 생성
  const languageSelector = document.createElement('div');
  languageSelector.className = 'language-selector';
  
  // 언어 버튼 생성
  const languages = [
    { id: 'ko', flag: 'https://flagcdn.com/w20/kr.png', title: '한국어' },
    { id: 'en', flag: 'https://flagcdn.com/w20/us.png', title: 'English' },
    { id: 'ja', flag: 'https://flagcdn.com/w20/jp.png', title: '日本語' },
    { id: 'zh', flag: 'https://flagcdn.com/w20/cn.png', title: '中文' }
  ];
  
  languages.forEach((lang, index) => {
    const langBtn = document.createElement('button');
    langBtn.className = 'language-btn';
    langBtn.id = `lang-${lang.id}`;
    langBtn.style.backgroundImage = `url('${lang.flag}')`;
    langBtn.title = lang.title;
    if (index === 0) langBtn.classList.add('active');
    languageSelector.appendChild(langBtn);
  });
  
  // 상단 컨트롤 영역에 요소 추가
  topControls.appendChild(toggleControllerBtn);
  topControls.appendChild(languageSelector);
  
  // 컨트롤러 컨테이너 생성
  const controllerContainer = document.createElement('div');
  controllerContainer.className = 'controller-container';
  
  // 데모 영역 생성
  const starrySkyDemo = document.createElement('div');
  starrySkyDemo.className = 'starry-sky-demo';
  
  // 제목 및 설명 생성
  const title = document.createElement('h1');
  title.textContent = 'OoJoo';
  
  const description = document.createElement('p');
  description.textContent = '별이 흐르는 효과 라이브러리 데모';
  
  // 옵션 표시 영역 생성
  const optionsDisplay = document.createElement('div');
  optionsDisplay.className = 'options-display';
  
  // 별 개수 옵션
  const starsCountOption = createOptionItem('별 개수:', 'stars-count', 220, 1, [
    { id: 'more-stars-btn', text: '+' },
    { id: 'less-stars-btn', text: '-' }
  ]);
  
  // 회전 속도 옵션
  const rotationSpeedOption = createOptionItem('회전 속도:', 'rotation-speed', 240, 30, [
    { id: 'faster-btn', text: '+' },
    { id: 'slower-btn', text: '-' }
  ], '초');
  
  // 별 크기 옵션
  const starSizeOption = document.createElement('div');
  starSizeOption.className = 'option-item';
  
  const starSizeLabel = document.createElement('span');
  starSizeLabel.className = 'option-label';
  starSizeLabel.textContent = '별 크기:';
  
  const starSizeControls = document.createElement('div');
  starSizeControls.style.display = 'flex';
  starSizeControls.style.alignItems = 'center';
  
  const starSizeInputs = document.createElement('div');
  starSizeInputs.style.display = 'flex';
  starSizeInputs.style.gap = '5px';
  starSizeInputs.style.alignItems = 'center';
  
  const minStarSizeInput = document.createElement('input');
  minStarSizeInput.type = 'number';
  minStarSizeInput.id = 'min-star-size';
  minStarSizeInput.className = 'option-value';
  minStarSizeInput.value = '0.6';
  minStarSizeInput.min = '0.1';
  minStarSizeInput.step = '0.1';
  
  const maxStarSizeInput = document.createElement('input');
  maxStarSizeInput.type = 'number';
  maxStarSizeInput.id = 'max-star-size';
  maxStarSizeInput.className = 'option-value';
  maxStarSizeInput.value = '2.4';
  maxStarSizeInput.min = '0.1';
  maxStarSizeInput.step = '0.1';
  
  const starSizeUnit = document.createElement('span');
  starSizeUnit.textContent = 'px';
  
  starSizeInputs.appendChild(minStarSizeInput);
  starSizeInputs.appendChild(document.createTextNode(' ~ '));
  starSizeInputs.appendChild(maxStarSizeInput);
  starSizeInputs.appendChild(starSizeUnit);
  
  const starSizeButtons = document.createElement('div');
  starSizeButtons.className = 'option-controls';
  
  const biggerStarsBtn = document.createElement('button');
  biggerStarsBtn.className = 'control-btn';
  biggerStarsBtn.id = 'bigger-stars-btn';
  biggerStarsBtn.textContent = '+';
  
  const smallerStarsBtn = document.createElement('button');
  smallerStarsBtn.className = 'control-btn';
  smallerStarsBtn.id = 'smaller-stars-btn';
  smallerStarsBtn.textContent = '-';
  
  starSizeButtons.appendChild(biggerStarsBtn);
  starSizeButtons.appendChild(smallerStarsBtn);
  
  starSizeControls.appendChild(starSizeInputs);
  starSizeControls.appendChild(starSizeButtons);
  
  starSizeOption.appendChild(starSizeLabel);
  starSizeOption.appendChild(starSizeControls);
  
  // 반짝임 지속 시간 옵션
  const twinkleDurationOption = createOptionItem('반짝임 지속 시간:', 'twinkle-duration', 5, 1, [
    { id: 'faster-twinkle-btn', text: '+' },
    { id: 'slower-twinkle-btn', text: '-' }
  ], '초');
  
  // 옵션 표시 영역에 옵션 추가
  optionsDisplay.appendChild(starsCountOption);
  optionsDisplay.appendChild(rotationSpeedOption);
  optionsDisplay.appendChild(starSizeOption);
  optionsDisplay.appendChild(twinkleDurationOption);
  
  // 컨트롤 버튼 영역 생성
  const controls = document.createElement('div');
  controls.className = 'controls';
  
  const pauseBtn = document.createElement('button');
  pauseBtn.id = 'pause-btn';
  pauseBtn.textContent = '일시 정지';
  
  const resumeBtn = document.createElement('button');
  resumeBtn.id = 'resume-btn';
  resumeBtn.textContent = '재개';
  
  controls.appendChild(pauseBtn);
  controls.appendChild(resumeBtn);
  
  // 네비게이션 링크 영역 생성
  const navLinks = document.createElement('div');
  navLinks.className = 'nav-links';
  
  const exampleLink = document.createElement('a');
  exampleLink.href = 'example.html';
  exampleLink.className = 'nav-link';
  exampleLink.textContent = '다중 예제 보기';
  
  navLinks.appendChild(exampleLink);
  
  // 데모 영역에 요소 추가
  starrySkyDemo.appendChild(title);
  starrySkyDemo.appendChild(description);
  starrySkyDemo.appendChild(optionsDisplay);
  starrySkyDemo.appendChild(controls);
  starrySkyDemo.appendChild(navLinks);
  
  // 컨트롤러 컨테이너에 데모 영역 추가
  controllerContainer.appendChild(starrySkyDemo);
  
  // body에 요소 추가
  document.body.appendChild(topControls);
  document.body.appendChild(controllerContainer);
}

// 옵션 아이템 생성 헬퍼 함수
function createOptionItem(labelText, inputId, defaultValue, minValue, buttons, unit = '') {
  const optionItem = document.createElement('div');
  optionItem.className = 'option-item';
  
  const label = document.createElement('span');
  label.className = 'option-label';
  label.textContent = labelText;
  
  const controls = document.createElement('div');
  controls.style.display = 'flex';
  controls.style.alignItems = 'center';
  
  const input = document.createElement('input');
  input.type = 'number';
  input.id = inputId;
  input.className = 'option-value';
  input.value = defaultValue;
  input.min = minValue;
  
  const unitSpan = unit ? document.createElement('span') : null;
  if (unitSpan) {
    unitSpan.textContent = unit;
  }
  
  const buttonContainer = document.createElement('div');
  buttonContainer.className = 'option-controls';
  
  buttons.forEach(btn => {
    const button = document.createElement('button');
    button.className = 'control-btn';
    button.id = btn.id;
    button.textContent = btn.text;
    buttonContainer.appendChild(button);
  });
  
  controls.appendChild(input);
  if (unitSpan) {
    controls.appendChild(unitSpan);
  }
  controls.appendChild(buttonContainer);
  
  optionItem.appendChild(label);
  optionItem.appendChild(controls);
  
  return optionItem;
} 