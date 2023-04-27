import {FaPhoneAlt,FaFax,FaMobileAlt,FaMailBulk} from 'react-icons/fa'
import {HiOfficeBuilding} from 'react-icons/hi'
export const contactData = [
  { _id:0,
    department: { Icon: HiOfficeBuilding, name: "Dział handlowy" },
    phones: { Icon: FaPhoneAlt, values: ["+48 41 345 74 08"] },
    faxes: { Icon: FaFax, values: ["+48 41 345 05 61"] },
    mobiles: { Icon: FaMobileAlt, values: ["+48 602 191 607"] },
    emails: { Icon: FaMailBulk, values: ["k.wrona@pralma.pl", "postmaster@pralma.pl"] },
  },
  { _id:1,
    department: { Icon: HiOfficeBuilding, name: "Dział handlowy" },
    phones: { Icon: FaPhoneAlt, values: ["+48 41 345 38 56", "+48 41 368 35 49"] },
    faxes: { Icon: FaFax, values: ["+48 41 345 05 61"] },
    mobiles: { Icon: FaMobileAlt, values: [] },
    emails: { Icon: FaMailBulk, values: ["biuro@pralma.pl", "postmaster@pralma.pl"] },
  },
  { _id:2,
    department: { Icon: HiOfficeBuilding, name: "Dział serwisu" },
    phones: { Icon: FaPhoneAlt, values: ["+48 41 345 38 56", "+48 41 368 35 49"] },
    faxes: { Icon: FaFax, values: ["+48 41 345 05 61"] },
    mobiles: { Icon: FaMobileAlt, values: ["+48 666 350 354", "+48 664 962 002"] },
    emails: { Icon: FaMailBulk, values: ["serwis@pralma.pl"] },
  },
  { _id:3,
    department: { Icon: HiOfficeBuilding, name: "Biuro / Księgowość" },
    phones: { Icon: FaPhoneAlt, values: ["+48 41 345 74 08", "+48 41 345 38 56", "+48 41 368 35 49"] },
    faxes: { Icon: FaFax, values: ["+48 41 345 05 61"] },
    mobiles: { Icon: FaMobileAlt, values: [] },
    emails: { Icon: FaMailBulk, values: ["postmaster@pralma.pl"] },
  },
];

export default contactData;
