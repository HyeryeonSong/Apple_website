(() => {// 즉시호출함수(전역변수 사용을 막기 위해)
  let yOffset = 0; // window.pageYOffset 대신 쓸 변수
  let prevScrollHeight = 0; // 현재 스크롤 위치(yOffset)보다 이전에 위치한 스크롤 섹션들의 스크롤 높이값의 합
  let currentScene = 0; // 현재 활성화된(눈 앞에 보고있는) 스크롤 섹션

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
        messageA_opacity: [0, 1],
      }
    },
    {
      // scroll-section-1
      type: 'normal',
      heightNum: 5,      
      scrollHeight: 0,
      objs: {
        container: document.querySelector('#scroll-section-1')
      }
    },
    {
      // scroll-section-2
      type: 'sticky',
      heightNum: 5,      
      scrollHeight: 0,
      objs: {
        container: document.querySelector('#scroll-section-2')
      }
    },
    {
      // scroll-section-3
      type: 'sticky',
      heightNum: 5,      
      scrollHeight: 0,
      objs: {
        container: document.querySelector('#scroll-section-3')
      }
    },
  ];

  function setLayout() {
    // 각 스크롤 섹션의 높이 셋팅
    for (let i = 0; i < sceneInfo.length; i++){
      sceneInfo[i].scrollHeight = sceneInfo[i].heightNum * window.innerHeight;
      sceneInfo[i].objs.container.style.height = `${sceneInfo[i].scrollHeight}px`;
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
    let scrollRatio = currentYOffset / sceneInfo[currentScene].scrollHeight;
    
    rv = scrollRatio * (values[1] - values[0]) + values[0] ;

    return rv;

  }

  // scroll될 때 애니메니션처리(텍스트위치, 투명도)
  function playAnimation() {
    const objs = sceneInfo[currentScene].objs;
    const values = sceneInfo[currentScene].values;
    const currentYOffset = yOffset - prevScrollHeight;

    switch (currentScene) {      
      case 0:
        let messageA_opacity_in = calcValues(values.messageA_opacity, currentYOffset);
        objs.messageA.style.opacity = messageA_opacity_in;
        console.log(messageA_opacity_in);
        break;
      case 1:

        console.log('1')
        break;
      case 2:
        break;
      case 3:
        break;
    }
  }

  function scrollLoop() {
    prevScrollHeight = 0; // 스크롤 할때마다 값 초기화 (누적되지않게)
    for (let i = 0; i < currentScene; i++){
      // prevScrollHeight = prevScrollHeight + sceneInfo[i].scrollHeight;      
      prevScrollHeight += sceneInfo[i].scrollHeight;
    }
    // 스크롤 할때마다 구간별 currentScene 변경
    if(yOffset > prevScrollHeight + sceneInfo[currentScene].scrollHeight) {
      currentScene ++;
    }
    if(yOffset < prevScrollHeight) {
      currentScene --;
    }
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