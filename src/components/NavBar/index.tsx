import { useNavigate } from 'react-router-dom';
import { useUser } from '../../contexts';
import './NavBar.css';
import logo from '/images/teddy-logo.png';

export default function NavBar() {
  const { userName, setUserName } = useUser();
  const navigate = useNavigate();

  const handleSaveName = () => {
    setUserName('');
    navigate('/');
  };

  return (
    <section>
      <div className='content'>
        <div className='logo'>
          <img src={logo} alt='Teddy Open Finance' />
        </div>
        <div className='menu'>
          <a>Clientes</a>
          <a>Clientes selecionados</a>
          <a onClick={handleSaveName}>Sair</a>
        </div>
        <div className='user'>
          Olá, <span>{userName}</span>!
        </div>
      </div>
    </section>
  );
}
