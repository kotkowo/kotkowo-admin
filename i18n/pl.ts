import polishMessages from 'ra-language-polish';
import { TranslationMessages } from 'react-admin';

export const pl: TranslationMessages = {
  ...polishMessages,
  enums: {
    sex: {
      male: 'Kot',
      female: 'Kotka',
    },
    age: {
      junior: 'Junior',
      senior: 'Senior',
    },
    fivFelvStatus: {
      both_negative: 'Oba negatywne',
      both_positive: 'Oba pozytywne',
    },
    healthStatus: {
      healthy: 'Zdrowy',
      sick: 'Chory',
    },
  },
  resources: {
    Cat: {
      name: 'Kot |||| Koty',
      list: 'Lista kotów',
      fields: {
        name: 'Imię',
        sex: 'Kotka/Kot',
        age: 'Wiek',
        fivFelvStatus: 'FIV/FELV',
        healthStatus: 'Stan zdrowia',
        castrated: 'Po kastracji?',
      },
    },
  },
};
