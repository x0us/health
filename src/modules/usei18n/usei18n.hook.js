import { createContext, createSignal, useContext } from 'solid-js';
import { createStore } from 'solid-js/store';

/**
 * template is used to replace data by name in template strings.
 * The default expression looks for {{name}} to identify names.
 *
 * @example
 *
 * ```js
 * template('It is {{color}}', { color: 'blue' }) // => It is blue
 * template('It is <color>', { color: 'blue' }, /<(.+?)>/g) // => It is blue
 * ```
 */
export const template = (str, data, regex = /\{\{(.+?)\}\}/g) => {
    return Array.from(str.matchAll(regex)).reduce((acc, match) => {
      return acc.replace(match[0], data[match[1]]);
    }, str);
};
/**
 * Safely access deep values in an object via a string path seperated by `.`
 * This util is largely inspired by [dlv](https://github.com/developit/dlv/blob/master/index.js) and passes all its tests
 *
 * @param obj {Record<string, unknown>} - The object to parse
 * @param path {string} - The path to search in the object
 * @param [defaultValue] {unknown} -  A default value if the path doesn't exist in the object
 *
 * @returns {any} The value if found, the default provided value if set and not found, undefined otherwise
 *
 * @example
 *
 * ```js
 * const obj = { a: { b : { c: 'hello' } } };
 *
 * const value = deepReadObject(obj, 'a.b.c');
 * // => 'hello'
 * const notFound = deepReadObject(obj, 'a.b.d');
 * // => undefined
 * const notFound = deepReadObject(obj, 'a.b.d', 'not found');
 * // => 'not found'
 * ```
*/
export const deepReadObject = (obj, path, defaultValue) => {
    const value = path
      .trim()
      .split('.')
      .reduce((a, b) => (a ? a[b] : undefined), obj);
  
    return value !== undefined ? value : defaultValue;
};

/**
 * This creates a I18nContext.
 * It's extracted into a function to be able to type the Context before it's even initialized.
 *
 * @param [init={}] {Record<string, Record<string, any>>} - Initial dictionary of languages
 * @param [lang=navigator.language] {string} - The default language fallback to browser language if not set
 */
export const createI18nContext = (init = {}, lang = navigator.language in init ? navigator.language : Object.keys(init)[0]) => {
  const [locale, setLocale] = createSignal(lang);
  const [dict, setDict] = createStore(init);

  /**
   * The main translation function of the library, given a key, it will look into its
   * dictionnaries to find the right translation for that key and fallback to the default
   * translation provided in last argument (if provided).
   *
   * You can additionally give as a second arguments dynamic parameters to inject into the
   * the translation.
   *
   * @param key {string} - The key to look translation for
   * @param [params] {Record<string, string>} - Parameters to pass into the translation template
   * @param [defaultValue] {string} - Default value if the translation isn't found
   *
   * @returns {string} - The translated string
   *
   * @example
   * ```jsx
   * const [t] = useI18n();
   *
   * const dict = { fr: 'Bonjour {{name}} !' }
   *
   * t('hello', { name: 'John' }, 'Hello, {{name}}!');
   * locale('fr')
   * // => 'Bonjour John !'
   * locale('unknown')
   * // => 'Hello, John!'
   * ```
   */
  const translate = (...args) => {
    const [key, params] = args;

    const val = deepReadObject(dict[locale()], key);

    if (typeof val === 'function') return val(params);
    if (typeof val === 'string') return template(val, params || {});

    return val;
  };

  const actions = {
    /**
     * Add (or edit an existing) locale
     *
     * @param lang {string} - The locale to add or edit
     * @param table {Record<string, any>} - The dictionary
     *
     * @example
     * ```js
     * const [_, { add }] = useI18n();
     *
     * const addSwedish = () => add('sw', { hello: 'Hej {{name}}' })
     * ```
     */
    add(_lang, table) {
      setDict(_lang, (t) => Object.assign(t || {}, table));
    },
    /**
     * Switch to the language in the parameters.
     *
     * @example
     *
     * ```js
     * const [_, { locale }] = useI18n();
     *
     * locale()
     * // => 'en'
     * locale('id')
     * locale()
     * // => 'id'
     *
     * ```
     */
    locale: (_lang) => (_lang ? setLocale(_lang) : locale()),
    /**
     * Retrieve the dictionary of a language
     *
     * @param lang {string} - The language to retrieve from
     * @returns dict {Record<string, Record<string, unknown>>}
     */
    dict: (_lang) => deepReadObject(dict, _lang),
  };

  return [translate, actions];
};

export const I18nContext = createContext({});

export const useI18n = () => {
  const context = useContext(I18nContext);
  if (!context) {
    throw new Error('useI18n: cannot find the I18nContext');
  }

  return context;
};