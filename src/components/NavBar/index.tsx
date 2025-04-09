import './NavBar.css';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../../contexts';
import logo from '/images/teddy-logo.png';
import { INavBarProps } from '../../types';

export default function NavBar({
  onSelectedChange,
  currentSelected,
}: INavBarProps) {
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
          <a
            className={!currentSelected ? 'active' : ''}
            onClick={() => onSelectedChange?.(false)}
          >
            Clientes
          </a>

          <a
            className={currentSelected ? 'active' : ''}
            onClick={() => onSelectedChange?.(true)}
          >
            Clientes selecionados
          </a>

          <a onClick={handleSaveName}>Sair</a>
        </div>
        <div className='user'>
          Olá, <span>{userName}</span>!
        </div>
      </div>
    </section>
  );
}
