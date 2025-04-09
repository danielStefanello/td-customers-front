import './Customer.css';
import NavBar from '../../components/NavBar';
import CustomerCard from '../../components/CustomerCard';
import { useCallback, useEffect, useState } from 'react';
import { createCustomer, listCustomers } from '../../services/api';
import {
  ICustomer,
  IListCustomerFilters,
  IListCustomerResponse,
} from '../../types';
import { Modal } from '../../components/Modal';
import Pagination from '../../components/Pagination';

export default function Customers() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [customers, setCustomers] = useState<IListCustomerResponse>({
    count: 0,
    data: [],
    limit: 0,
    page: 1,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState<Omit<ICustomer, 'id'>>({
    name: '',
    salary: 0,
    companyValue: 0,
    selected: false,
  });
  const [page, setPage] = useState(1);
  const [limit] = useState(16);
  const [selected, setSelected] = useState(false);
  const [totalPages, setTotalPages] = useState(1);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: ['salary', 'companyValue'].includes(name)
        ? parseFloat(value) || 0
        : value,
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

  const loadData = useCallback(
    async (filters?: IListCustomerFilters) => {
      try {
        setLoading(true);
        const data = await listCustomers({
          page: filters?.page || page,
          limit: filters?.limit || limit,
          selected: filters?.selected || selected,
        });

        setCustomers(data);
        setTotalPages(Math.max(1, Math.ceil(data.count / data.limit)));
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Erro desconhecido');
      } finally {
        setLoading(false);
      }
    },
    [page, limit, selected]
  );

  useEffect(() => {
    loadData();
  }, [loadData]);

  if (loading) return <div className='loading'>Carregando...</div>;
  if (error) return <div className='error'>Erro: {error}</div>;
  if (customers.data.length === 0) return <div>Nenhum cliente encontrado</div>;

  return (
    <div className='customer'>
      <NavBar
        onSelectedChange={(selected) => {
          setSelected(selected);
          setPage(1);
        }}
        currentSelected={selected}
      />
      <div className='customerContent'>
        <div>
          <p>{customers.count} clientes encontrados.</p>
          <p className='countCustomerLeft'>
            Clientes por página: {customers.limit}
          </p>
        </div>
        <div>
          {customers.data.map((customer) => (
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

        <Pagination
          currentPage={page}
          totalPages={totalPages}
          onPageChange={(newPage) => setPage(newPage)}
          disabled={loading}
        />
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
