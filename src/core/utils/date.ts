export const createDate = (dateString?: string): Date => {
  return dateString ? new Date(dateString) : new Date();
};

export const formatDate = (date: Date): string => {
  return date.toLocaleDateString('pt-BR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
};
