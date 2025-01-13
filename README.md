## 리액트 Hooks 학습 정리

### 순수함수와 컴포넌트

- 순수함수는 입력이 같으면 결과도 같아야 한다.
- 부수효과가 없어야 한다.

함수를 실행할 때는 그에 맞는 값만 반환하길 기대한다. 이 때 다른 변화가 있으면 부수효과가 일어난다고 하는데, 만약 함수 인자나 전역변수를 변경하는 것과 같은 형태를 의미한다. 몇 번을 내가 만든 순수 함수를 실행하더라도 함수 바깥 공간을 건드리는 코드를 작성하게되면 순수함수의 규칙을 깨는 행위다.

### 지연실행

useEffect 함수를 직접 만들어보면서 함수형 컴포넌트에 부수 효과를 정리해보자.

```
  function useEffect(effect, nextDeps) {
    function runDeferedEffect() {
      function runEffect() {
        const cleanup = effect();
        if (cleanup) cleanups[cursor] = cleanup;
      }
      const ENOUGH_TIME_TO_RENDER = 1;
      setTimeout(runEffect, ENOUGH_TIME_TO_RENDER);
    }

    if (!isInitialized[cursor]) {
      isInitialized[cursor] = true;
      deps[cursor] = nextDeps;
      cursor = cursor + 1;
      runDeferedEffect();
      return;
    }

    const prevDeps = deps[cursor];
    const depsSame = prevDeps.every(
      (prevDep, index) => prevDep === nextDeps[index],
    );
    if (depsSame) {
      cursor = cursor + 1;
      return;
    }

    deps[cursor] = nextDeps;
    cursor = cursor + 1;
    runDeferedEffect();
  }
```

- 인자는 effect(실행할 부수 효과 함수), nextDeps( 종속성 배열. 이전 값과 비교하여 효과를 다시 실행할지 결정.)

- 외부에서 관리하는 전역 변수 ->

  - isInitialized[cursor]: 특정 cursor 위치에서 훅이 초기화되었는지 여부
  - deps[cursor]: 각 훅이 가진 종속성 배열
  - cleanups[cursor]: 훅이 반환한 정리(cleanup) 함수
  - cursor: 현재 훅의 순서를 추적

- runDeferedEffect Func: effect()를 실행하고, 반환값이 있으면 해당 값을 cleanups[cursor]에 저장, 이 반환값은 React의 useEffect에서 반환하는 정리(cleanup) 함수에 해당

- setTimeout(runEffect, ENOUGH_TIME_TO_RENDER): 효과를 실행하기 전에 렌더링이 완료되도록 약간의 시간을 주자.

- if (!isInitialized[cursor]) 절은 훅이 처음 호출된 경우에 처리
- prevDeps 변수선언 부터는, 종속성 배열을 비교하여 동일할때 처리하고 변경될경우 각 처리
