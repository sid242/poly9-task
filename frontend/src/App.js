import { useState } from 'react';
import './App.css';
import Form from "./components/Form"
import List from './components/List';
function App() {
  const [data, setData] = useState({})
  return (
    <>
      <Form setData={setData} />
      <List data={data} />
    </>
  );
}

export default App;
