import * as localeKo from "./ko";
import * as localeEn from "./en";

console.debug("locales/index.js");

export const ko = { ...localeKo };
export const en = { ...localeEn };

export const locales = { ko, en };

export default locales;
