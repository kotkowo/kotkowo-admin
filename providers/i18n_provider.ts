import polyglotI18nProvider from 'ra-i18n-polyglot';
import { en, pl } from '@/i18n';
import { TranslationMessages } from 'react-admin';

type TranslationMap = { [key: string]: TranslationMessages }

const translations: TranslationMap = { en, pl };

export const i18nProvider = polyglotI18nProvider(
  locale => translations[locale],
  'pl', // default locale
  [{ locale: 'en', name: 'English' }, { locale: 'pl', name: 'Polski' }],
);
