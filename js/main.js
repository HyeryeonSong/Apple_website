(() => {// 즉시호출함수(전역변수 사용을 막기 위해)
  let yOffset = 0; // window.pageYOffset 대신 쓸 변수
  let prevScrollHeight = 0; // 현재 스크롤 위치(yOffset)보다 이전에 위치한 스크롤 섹션들의 스크롤 높이값의 합
  let currentScene = 0; // 현재 활성화된(눈 앞에 보고있는) 스크롤 섹션
  let enterNewScene = false; // 새로운 섹션이 시작된 순간 false

  const sceneInfo = [
    {      
      // scroll-section-0
      type: 'sticky',
      heightNum: 5, // 브라우저 높이의 5배로 scrollHeight 셋팅      
      scrollHeight: 0, // 스크롤 구간 높이
      objs: { // html 객체
        container: document.querySelector('#scroll-section-0'),
        messageA: document.querySelector('#scroll-section-0 .main-message.a'),
        messageB: document.querySelector('#scroll-section-0 .main-message.b'),
        messageC: document.querySelector('#scroll-section-0 .main-message.c'),
        messageD: document.querySelector('#scroll-section-0 .main-message.d'),
      },
      values: {
        messageA_opacity_in: [0, 1, { start: 0.1, end: 0.2 }],
        messageB_opacity_in: [0, 1, { start: 0.3, end: 0.4 }],
        messageC_opacity_in: [0, 1, { start: 0.5, end: 0.6 }],
        messageD_opacity_in: [0, 1, { start: 0.7, end: 0.8 }],
        messageA_translateY_in: [20, 0, { start: 0.1, end: 0.2 }],
        messageB_translateY_in: [20, 0, { start: 0.3, end: 0.4 }],
        messageC_translateY_in: [20, 0, { start: 0.5, end: 0.6 }],
        messageD_translateY_in: [20, 0, { start: 0.7, end: 0.8 }],
        messageA_opacity_out: [1, 0, { start: 0.25, end: 0.3 }],
        messageB_opacity_out: [1, 0, { start: 0.45, end: 0.5 }],
        messageC_opacity_out: [1, 0, { start: 0.65, end: 0.7 }],
        messageD_opacity_out: [1, 0, { start: 0.85, end: 0.9 }],
        messageA_translateY_out: [0, -20, { start: 0.25, end: 0.3 }],
        messageB_translateY_out: [0, -20, { start: 0.45, end: 0.5 }],
        messageC_translateY_out: [0, -20, { start: 0.65, end: 0.7 }],
        messageD_translateY_out: [0, -20, { start: 0.85, end: 0.9 }]
      }
    },
    {
      // scroll-section-1
      type: 'normal',
      // heightNum: 5,   // normal type에선 필요 없음
      scrollHeight: 0,
      objs: {
        container: document.querySelector('#scroll-section-1'),
        content: document.querySelector('#scroll-section-1 .description')
      }
    },
    {
      // scroll-section-2
      type: 'sticky',
      heightNum: 5,      
      scrollHeight: 0,
      objs: {
        container: document.querySelector('#scroll-section-2'),
        messageA: document.querySelector('#scroll-section-2 .a'),
        messageB: document.querySelector('#scroll-section-2 .b'),
        messageC: document.querySelector('#scroll-section-2 .c'),
        pinB: document.querySelector('#scroll-section-2 .b .pin'),
        pinC: document.querySelector('#scroll-section-2 .c .pin')
      },
      values: {
        messageA_translateY_in: [20, 0, { start: 0.15, end: 0.2 }],
        messageB_translateY_in: [30, 0, { start: 0.5, end: 0.55 }],
        messageC_translateY_in: [30, 0, { start: 0.72, end: 0.77 }],
        messageA_opacity_in: [0, 1, { start: 0.15, end: 0.2 }],
        messageB_opacity_in: [0, 1, { start: 0.5, end: 0.55 }],
        messageC_opacity_in: [0, 1, { start: 0.72, end: 0.77 }],
        messageA_translateY_out: [0, -20, { start: 0.3, end: 0.35 }],
        messageB_translateY_out: [0, -20, { start: 0.58, end: 0.63 }],
        messageC_translateY_out: [0, -20, { start: 0.85, end: 0.9 }],
        messageA_opacity_out: [1, 0, { start: 0.3, end: 0.35 }],
        messageB_opacity_out: [1, 0, { start: 0.58, end: 0.63 }],
        messageC_opacity_out: [1, 0, { start: 0.85, end: 0.9 }],
        pinB_scaleY: [0.5, 1, { start: 0.5, end: 0.55 }],
        pinC_scaleY: [0.5, 1, { start: 0.72, end: 0.77 }],
        pinB_opacity_in: [0, 1, { start: 0.5, end: 0.55 }],
        pinC_opacity_in: [0, 1, { start: 0.72, end: 0.77 }],
        pinB_opacity_out: [1, 0, { start: 0.58, end: 0.63 }],
        pinC_opacity_out: [1, 0, { start: 0.85, end: 0.9 }],
      },
    },
    {
      // scroll-section-3
      type: 'sticky',
      heightNum: 5,      
      scrollHeight: 0,
      objs: {
        container: document.querySelector('#scroll-section-3'),
        canvasCaption: document.querySelector('.canvas-caption')
      },
      values: {

      }
    },
  ];

  function setLayout() {
    // 각 스크롤 섹션의 높이 셋팅    
    for (let i = 0; i < sceneInfo.length; i++){
      if (sceneInfo[i].type === 'sticky') {
        sceneInfo[i].scrollHeight = sceneInfo[i].heightNum * window.innerHeight;
        sceneInfo[i].objs.container.style.height = `${sceneInfo[i].scrollHeight}px`;
      } else if (sceneInfo[i].type === 'normal'){

      }
      
    }

    let totalScrollHeight = 0;
    for (let i = 0; i < sceneInfo.length; i++){
      totalScrollHeight += sceneInfo[i].scrollHeight; // 각 scene의 scrollHeight를 더해서 넣어줌
      if(totalScrollHeight >= yOffset) {
        currentScene = i;
        break;
      }
    }
    document.body.setAttribute('id', `show-scene-${currentScene}`);
  }

  function calcValues(values, currentYOffset) {
    let rv;
    
    // 현재 스크롤섹션에서 스크롤된 범위를 비율로 구하기
    const scrollHeight = sceneInfo[currentScene].scrollHeight;
    const scrollRatio = currentYOffset / scrollHeight;

    if(values.length === 3){ // values의 원소가 3개일겨우(start, end가 있을 경우)
      // start ~ end 사이에 애니메이션 실행
      const partScrollStart = values[2].start * scrollHeight; // 스크롤 시작 지점
      const partScrollEnd = values[2].end * scrollHeight; // 스크롤 끝 지점
      const partScrollHeight = partScrollEnd - partScrollStart; // 끝지점에서 시작점을 뺀 값

      if (currentYOffset >= partScrollStart && currentYOffset <= partScrollEnd) {
        rv = (currentYOffset - partScrollStart) / partScrollHeight * (values[1] - values[0]) + values[0];
      } else if (currentYOffset < partScrollStart) {
        rv = values[0];
      } else if (currentYOffset > partScrollEnd) {
        rv = values[1];
      }
        
    } else {
      rv = scrollRatio * (values[1] - values[0]) + values[0] ;
    }
    return rv;
  }

  // scroll될 때 애니메니션처리(텍스트위치, 투명도)
  function playAnimation() {
    const objs = sceneInfo[currentScene].objs;
    const values = sceneInfo[currentScene].values;
    const currentYOffset = yOffset - prevScrollHeight;
    const scrollHeight = sceneInfo[currentScene].scrollHeight; // 현재 section의 scrollHeight
    const scrollRatio = currentYOffset / scrollHeight;

    switch (currentScene) {      
      case 0:        
      if (scrollRatio <= 0.22) {
        // in
        objs.messageA.style.opacity = calcValues(values.messageA_opacity_in, currentYOffset);
        objs.messageA.style.transform = `translate3d(0, ${calcValues(values.messageA_translateY_in, currentYOffset)}%, 0)`;
      } else {
        // out
        objs.messageA.style.opacity = calcValues(values.messageA_opacity_out, currentYOffset);
        objs.messageA.style.transform = `translate3d(0, ${calcValues(values.messageA_translateY_out, currentYOffset)}%, 0)`;
      }
      if (scrollRatio <= 0.42) {
        // in
        objs.messageB.style.opacity = calcValues(values.messageB_opacity_in, currentYOffset);
        objs.messageB.style.transform = `translate3d(0, ${calcValues(values.messageB_translateY_in, currentYOffset)}%, 0)`;
      } else {
        // out
        objs.messageB.style.opacity = calcValues(values.messageB_opacity_out, currentYOffset);
        objs.messageB.style.transform = `translate3d(0, ${calcValues(values.messageB_translateY_out, currentYOffset)}%, 0)`;
      }
      if (scrollRatio <= 0.62) {
        // in
        objs.messageC.style.opacity = calcValues(values.messageC_opacity_in, currentYOffset);
        objs.messageC.style.transform = `translate3d(0, ${calcValues(values.messageC_translateY_in, currentYOffset)}%, 0)`;
      } else {
        // out
        objs.messageC.style.opacity = calcValues(values.messageC_opacity_out, currentYOffset);
        objs.messageC.style.transform = `translate3d(0, ${calcValues(values.messageC_translateY_out, currentYOffset)}%, 0)`;
      }
      if (scrollRatio <= 0.82) {
        // in
        objs.messageD.style.opacity = calcValues(values.messageD_opacity_in, currentYOffset);
        objs.messageD.style.transform = `translate3d(0, ${calcValues(values.messageD_translateY_in, currentYOffset)}%, 0)`;
      } else {
        // out
        objs.messageD.style.opacity = calcValues(values.messageD_opacity_out, currentYOffset);
        objs.messageD.style.transform = `translate3d(0, ${calcValues(values.messageD_translateY_out, currentYOffset)}%, 0)`;
      }
      break;
      case 2:
        if (scrollRatio <= 0.25) {
          // in
          objs.messageA.style.opacity = calcValues(values.messageA_opacity_in, currentYOffset);
          objs.messageA.style.transform = `translate3d(0, ${calcValues(values.messageA_translateY_in, currentYOffset)}%, 0)`;
        } else {
          // out
          objs.messageA.style.opacity = calcValues(values.messageA_opacity_out, currentYOffset);
          objs.messageA.style.transform = `translate3d(0, ${calcValues(values.messageA_translateY_out, currentYOffset)}%, 0)`;
        }

        if (scrollRatio <= 0.57) {
          // in
          objs.messageB.style.transform = `translate3d(0, ${calcValues(values.messageB_translateY_in, currentYOffset)}%, 0)`;
          objs.messageB.style.opacity = calcValues(values.messageB_opacity_in, currentYOffset);
          objs.pinB.style.transform = `scaleY(${calcValues(values.pinB_scaleY, currentYOffset)})`;
        } else {
          // out
          objs.messageB.style.transform = `translate3d(0, ${calcValues(values.messageB_translateY_out, currentYOffset)}%, 0)`;
          objs.messageB.style.opacity = calcValues(values.messageB_opacity_out, currentYOffset);
          objs.pinB.style.transform = `scaleY(${calcValues(values.pinB_scaleY, currentYOffset)})`;
        }

        if (scrollRatio <= 0.83) {
          // in
          objs.messageC.style.transform = `translate3d(0, ${calcValues(values.messageC_translateY_in, currentYOffset)}%, 0)`;
          objs.messageC.style.opacity = calcValues(values.messageC_opacity_in, currentYOffset);
          objs.pinC.style.transform = `scaleY(${calcValues(values.pinC_scaleY, currentYOffset)})`;
        } else {
          // out
          objs.messageC.style.transform = `translate3d(0, ${calcValues(values.messageC_translateY_out, currentYOffset)}%, 0)`;
          objs.messageC.style.opacity = calcValues(values.messageC_opacity_out, currentYOffset);
          objs.pinC.style.transform = `scaleY(${calcValues(values.pinC_scaleY, currentYOffset)})`;
        }
        break;
      case 3:
        break;
    }
  }

  function scrollLoop() {
    enterNewScene = false; // 스크롤을 할때마다 기본적으로 false
    prevScrollHeight = 0; // 스크롤 할때마다 값 초기화 (누적되지않게)
    for (let i = 0; i < currentScene; i++){
      // prevScrollHeight = prevScrollHeight + sceneInfo[i].scrollHeight;      
      prevScrollHeight += sceneInfo[i].scrollHeight;
    }
    // 스크롤 할때마다 구간별 currentScene 변경
    if(yOffset > prevScrollHeight + sceneInfo[currentScene].scrollHeight) {
      enterNewScene = true; // 섹션이 바뀔 때 false에서 true로 전환
      currentScene ++;
      document.body.setAttribute('id', `show-scene-${currentScene}`);
    }
    if(yOffset < prevScrollHeight) {
      enterNewScene = true;
      currentScene --;
      document.body.setAttribute('id', `show-scene-${currentScene}`);
    }

    if(enterNewScene) return; // enterNewScene이 true면 함수 종료(playAnimation이 실행x)
    
    playAnimation();
  }

  window.addEventListener('scroll', () => {
    yOffset = window.pageYOffset; // 수직으로 스크롤 된 px값
    scrollLoop();
    playAnimation();
  })
  window.addEventListener('load', setLayout()); // 문서가 load되면 setLayout 실행
  window.addEventListener('resize', setLayout); // 창 크기에 따라 scrollHeight 변경

}
)(); 