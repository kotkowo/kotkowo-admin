import polishMessages from 'ra-language-polish'
import { TranslationMessages } from 'react-admin'

export const pl: TranslationMessages = {
  ...polishMessages,
  enums: {
    sex: {
      male: "Kot",
      female: "Kotka"
    }
  },
  resources: {
    Cat: {
      name: 'Kot |||| Koty',
      list: 'Lista kotów',
      fields: {
        name: "Imię",
        sex: "Kotka/Kot"
      }
    }
  }
}
