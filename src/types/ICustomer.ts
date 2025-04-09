export interface ICustomer {
  id: number;
  name: string;
  salary: number;
  companyValue: number;
  selected: boolean;
}

export interface IListCustomerResponse {
  data: ICustomer[];
  count: number;
  page: number;
  limit: number;
}

export interface IListCustomerFilters {
  page?: number;
  limit?: number;
  sort?: 'id' | 'name' | 'salary' | 'companyValue';
  order?: 'ASC' | 'DESC';
  selected?: boolean;
}
