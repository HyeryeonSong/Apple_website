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
        container: document.querySelector('#scroll-section-0')
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

    document.body.setAttribute('id', `show-scene-${currentScene}`);
  }

  window.addEventListener('scroll', () => {
    yOffset = window.pageYOffset; // 수직으로 스크롤 된 px값
    scrollLoop();
  })
  window.addEventListener('load', setLayout()); // 문서가 load되면 setLayout 실행
  window.addEventListener('resize', setLayout); // 창 크기에 따라 scrollHeight 변경
  


}
)(); 