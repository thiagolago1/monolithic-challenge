export function formatPhoneNumber(phone: string) {
  if (!/^\d{11}$/.test(phone)) {
    throw new Error("Número de telefone inválido. Deve conter 11 dígitos.");
  }

  const ddd = phone.slice(0, 2);
  const firstPart = phone.slice(2, 7);
  const secondPart = phone.slice(7);

  return `(${ddd}) ${firstPart}-${secondPart}`;
}
