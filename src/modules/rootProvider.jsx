import { localeDict } from "./configs/locale.config";
import {
  AppStoreContext,
  createAppStoreContext,
} from "./store/useAppStore.hook";
import { I18nContext, createI18nContext } from "./usei18n/usei18n.hook";
import { QueryClient, QueryClientProvider } from "@tanstack/solid-query";

// #region PROVIDERS

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1_000 * 30, // 30 secs. This will be the default in v5
    },
  },
});

// #region PROVIDERS
export const AppStoreProvider = (props) => {
  const value = createAppStoreContext(props.store);

  return (
    <AppStoreContext.Provider value={value}>
      {props.children}
    </AppStoreContext.Provider>
  );
};

export const I18nProvider = (props) => {
  const value = createI18nContext(props.dict, props.locale);

  return (
    <I18nContext.Provider value={value}>{props.children}</I18nContext.Provider>
  );
};

export const QueryProvider = (props) => (
  <QueryClientProvider client={queryClient}>
    {props.children}
  </QueryClientProvider>
);

export const RootProvider = (props) => (
  <AppStoreProvider>
    <I18nProvider dict={localeDict}>
      <QueryProvider>{props.children}</QueryProvider>
    </I18nProvider>
  </AppStoreProvider>
);
// #endregion
