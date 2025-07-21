import { LanguageEnum } from "@shared/enums/language.enums";
import { IOption } from "@shared/interfaces/option.interfaces";

export const LANGUAGE_OPTIONS: IOption<LanguageEnum>[] = [
  { value: LanguageEnum.ENGLISH, label: 'OPTION.LANGUAGE.ENGLISH' },
  { value: LanguageEnum.SPANISH, label: 'OPTION.LANGUAGE.SPANISH' },
  { value: LanguageEnum.FRENCH, label: 'OPTION.LANGUAGE.FRENCH' },
  { value: LanguageEnum.PORTUGUESE_BR, label: 'OPTION.LANGUAGE.PORTUGUESE_BR' },
];

export const getLanguageCode = (language: LanguageEnum): string => {
  switch (language) {
    case LanguageEnum.ENGLISH: return 'en';
    case LanguageEnum.SPANISH: return 'sp';
    case LanguageEnum.FRENCH: return 'fr';
    case LanguageEnum.PORTUGUESE_BR: return 'pt';
    default: return 'en';
  }
}
