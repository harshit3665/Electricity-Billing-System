export const calculateUnits = (watt, hours, days, quantity) =>
  (watt * hours * days * quantity) / 1000;
