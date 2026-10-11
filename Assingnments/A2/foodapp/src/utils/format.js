export function money(value) {
  return `$${Number(value || 0).toFixed(2)}`;
}

export function prettyDate(value) {
  if (!value) return '';
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;
  return date.toLocaleString();
}

export const NEXT_ORDER_STATUS = {
  Pending: 'Preparing',
  Preparing: 'Ready',
  Ready: 'Served',
};

export const STATUS_COLORS = {
  Pending: '#B7791F',
  Preparing: '#3D5A80',
  Ready: '#2F6B4F',
  Served: '#5C4B3A',
  Cancelled: '#B42318',
  Accepted: '#2F6B4F',
  Declined: '#B42318',
};
