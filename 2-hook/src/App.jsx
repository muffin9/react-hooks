import MyReact from '../../shared/lib/MyReact.jsx';

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

export default () => <NameField />;
