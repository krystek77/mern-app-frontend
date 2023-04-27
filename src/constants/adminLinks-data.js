import { v4 as uuidv4 } from 'uuid';

export const adminLinks = [
  { id: uuidv4(), title: 'Kategoria', url: '/pralma/formularz-kategorii' },
  { id: uuidv4(), title: 'Tag', url: '/pralma/formularz-tagu' },
  { id: uuidv4(), title: 'Dokument', url: '/pralma/formularz-dokumentu' },
  { id: uuidv4(), title: 'Sterownik', url: '/pralma/formularz-sterownika' },
  { id: uuidv4(), title: 'Produkt', url: '/pralma/formularz-produktu' },
  { id: uuidv4(), title: 'Podgrzew', url: '/pralma/formularz-podgrzewu' },
  { id: uuidv4(), title: 'Zasilanie', url: '/pralma/formularz-zasilania' },
  { id: uuidv4(), title: 'Opcje', url: '/pralma/formularz-opcji' },
  { id: uuidv4(), title: 'Cennik', url: '/pralma/formularz-cennika' },
  { id: uuidv4(), title: 'Wiadomosci', url: '/pralma/formularz-wiadomosci' },
  { id: uuidv4(), title: 'Dostawca', url: '/pralma/formularz-dostawcy' },
  {
    id: uuidv4(),
    title: 'Część zamienna',
    url: '/pralma/formularz-czesci-zamiennej',
  },
];

export default adminLinks;
