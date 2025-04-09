import { ICustomer } from './ICustomer';

export type ICustomerCardProps = {
  customer: ICustomer;
  onDelete: () => void;
};
