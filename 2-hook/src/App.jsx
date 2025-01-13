import MyReact from '../../shared/lib/MyReact.jsx';
import React from 'react';
// const App = () => <>2-hook</>;

// export default App;

function NameField() {
  const [name, setName] = MyReact.useState('사용자1');

  const handleChange = (e) => {
    setName(e.target.value);
  };

  console.log(name);
  return <input value={name} onChange={handleChange} />;
}

const Counter = () => {
  MyReact.resetCursor();

  const [count, setCount] = React.useState(0);
  const [name, setName] = React.useState('');

  const handleClick = () => setCount(count + 1);

  const handleChangeName = (e) => setName(e.target.value);

  MyReact.useEffect(() => {
    document.title = `count: ${count}`;
    console.log('effect1');
  }, [count]);

  MyReact.useEffect(() => {
    localStorage.setItem('name', name);
    console.log('effect2');
  }, [name]);

  MyReact.useEffect(() => {
    setName(localStorage.getItem('name') || '');
  }, []);

  return (
    <>
      <button onClick={handleClick}>더하기</button>
      <input value={name} onChange={handleChangeName} />
    </>
  );
};

export default () => {
  const [mounted, setMounted] = React.useState(false);

  const handleToggle = () => {
    const nextMounted = !mounted;
    if (!nextMounted) MyReact.cleanupEffects();
    setMounted(nextMounted);
  };

  return (
    <>
      <button onClick={handleToggle}>컴포넌트 토글</button>
      {mounted && <Counter />}
    </>
  );
};
