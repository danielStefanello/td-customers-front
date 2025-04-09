import './Customer.css';
import NavBar from '../../components/NavBar';
import CustomerCard from '../../components/CustomerCard';
import { useEffect, useState } from 'react';
import { createCustomer, listCustomers } from '../../services/api';
import { ICustomer } from '../../types';
import { Modal } from '../../components/Modal';

export default function Customers() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [customers, setCustomers] = useState<ICustomer[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState<Omit<ICustomer, 'id'>>({
    name: '',
    salary: 0,
    companyValue: 0,
    selected: false,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === 'salary' ? parseFloat(value) || undefined : value,
      [name]: name === 'companyValue' ? parseFloat(value) || undefined : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (!formData.name || !formData.salary || !formData.companyValue) {
      setError('Preencha todos os campos obrigatórios');
      return;
    }
    setLoading(true);
    try {
      await createCustomer(formData);
      loadData();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao cadastrar');
    } finally {
      setLoading(false);
      setIsModalOpen(false);
    }
  };

  const loadData = async () => {
    try {
      setLoading(true);
      const data = await listCustomers();
      setCustomers(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro desconhecido');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  if (loading) return <div className='loading'>Carregando...</div>;
  if (error) return <div className='error'>Erro: {error}</div>;
  if (customers.length === 0) return <div>Nenhum cliente encontrado</div>;

  return (
    <div className='customer'>
      <NavBar />
      <div className='customerContent'>
        <div>
          <p>{customers.length} clientes encontrados.</p>
          <p className='countCustomerLeft'>
            Clientes por página: {customers.length}
          </p>
        </div>
        <div>
          {customers.map((customer) => (
            <CustomerCard
              key={customer.id}
              customer={customer}
              onDelete={loadData}
            />
          ))}
        </div>
        <button className='addCustomer' onClick={() => setIsModalOpen(true)}>
          Criar cliente
        </button>
      </div>
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title='Criar cliente'
      >
        <form onSubmit={handleSubmit} className='formCreateCustomer'>
          {error && <div className='error-message'>{error}</div>}

          <input
            type='text'
            id='name'
            name='name'
            value={formData.name}
            onChange={handleChange}
            placeholder='Digite o nome:'
            required
          />

          <input
            type='text'
            id='salary'
            name='salary'
            value={formData.salary}
            onChange={handleChange}
            placeholder='Digite o salário:'
            required
          />

          <input
            type='text'
            id='companyValue'
            name='companyValue'
            value={formData.companyValue}
            onChange={handleChange}
            placeholder='Digite o valor da empresa:'
            required
          />

          <button type='submit' disabled={loading}>
            {loading ? 'Cadastrando' : 'Criar cliente'}
          </button>
        </form>
      </Modal>
    </div>
  );
}
