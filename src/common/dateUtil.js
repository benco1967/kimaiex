export const formatDate = date =>
    date?.toLocaleDateString?.('fr-FR', { weekday: 'short', year: '2-digit', month: '2-digit', day: '2-digit' });

export const offsetDate = (date, offset) =>
    date ? new Date(date.getTime() + offset * 24 * 60 * 60 * 1000).toISOString().slice(0, 10) : '' ;