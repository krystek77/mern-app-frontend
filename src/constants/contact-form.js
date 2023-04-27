export const reasons = [
  {
    name: 'oferta na wyposażenie pralni przemysłowej',
    to: 'k.wrona@pralma.pl',
  },
  { name: 'części zamienne', to: 'postmaster@pralma.pl' },
  { name: 'wsparcie techniczne', to: 'serwis@pralma.pl' },
  { name: 'zlecenie serwisu', to: 'serwis@pralma.pl' },
  { name: 'gwarancja', to: 'postmaster.pralma.pl' },
  { name: 'dokumnety urządzeń', to: 'serwis@pralma.pl' },
  { name: 'ogólne', to: 'biuro@pralma.pl' },
  { name: 'księgowość', to: 'biuro@pralma.pl' },
  { name: 'współpraca', to: 'biuro@pralma.pl' },
];
export const markets = [
  'pralnie komercyjne',
  'domy opieki i domy pomocy społecznej',
  'przedszkola i żłobki',
  'hotele, motele i pensjonaty',
  'kluby sportowe',
  'SPA & Wellness',
  'szpitale i kliniki',
  'kempingi, ośrodki wczasowe',
  'apartamenty, akademiki',
  'pralnie i urządzenia samoobslugowe',
  'zarządzanie obiektami, czyszczenie i sprzątanie',
  'służby cywilne np. straż pożarna',
  'marynarka wojenna - pralnice na statek',
  'stadniny koni, schroniska dla zwierząt',
  'przemysł spozywczy i przetworstwo',
  'firmy, zakłady pracy',
  'pralnia Softwash',
  'inne',
];

export const personData = {
  firstName: '',
  lastName: '',
  phone: '',
  email: '',
  message: '',
};
export const companyData = {
  name: '',
  street: '',
  houseNumber: '',
  zipCode: '',
  city: '',
  phone: '',
  email: '',
  message: '',
};

const contactFormData = { reasons, markets, personData, companyData };
export default contactFormData;
