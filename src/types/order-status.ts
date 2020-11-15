import { registerEnumType } from 'type-graphql';

export enum OrderStatus {
  awaitingPayment = 'AWAITING_PAYMENT',
  cancelled = 'CANCELLED',
  completed = 'COMPLETED',
  expired = 'EXPIRED',
}

registerEnumType(OrderStatus, {
  name: 'OrderStatus',
});
