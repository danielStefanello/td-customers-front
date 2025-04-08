import './Home.css';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../../contexts';

export default function Home() {
  const [inputName, setInputName] = useState('');
  const { setUserName } = useUser();
  const navigate = useNavigate();

  const handleSaveName = () => {
    setUserName(inputName);
    navigate('/customers');
  };

  return (
    <div className='card'>
      <h2>Olá, seja bem-vindo!</h2>
      <input
        type='text'
        value={inputName}
        onChange={(e) => setInputName(e.target.value)}
        placeholder='Digite o seu nome:'
      ></input>
      <button onClick={handleSaveName}>Entrar</button>
    </div>
  );
}
