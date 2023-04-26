import englishMessages from 'ra-language-english'
import { TranslationMessages } from 'react-admin'

export const en: TranslationMessages = {
  ...englishMessages,
  enums: {
    sex: {
      male: "Male",
      female: "Female"
    },
    age: {
      junior: "Junior",
      senior: "Senior"
    }
  },
  resources: {
    Cat: {
      name: 'Cat |||| Cats',
      list: 'Cat list',
      fields: {
        sex: "Female/Male"
      }
    }
  }
}
