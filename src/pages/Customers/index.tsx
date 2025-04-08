import { useNavigate } from 'react-router-dom';
import { useUser } from '../../contexts';

export default function Customers() {
  const { setUserName } = useUser();
  const navigate = useNavigate();

  const handleSaveName = () => {
    setUserName('');
    navigate('/');
  };

  return (
    <>
      <h1>Customers</h1>
      <button onClick={handleSaveName}>Sair</button>
    </>
  );
}
