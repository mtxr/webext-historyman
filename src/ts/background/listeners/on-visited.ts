import baseLog from '@utils/log';
import { Store } from 'redux';
import { IAppState } from '@bg/store';
import idx from 'idx.macro';
import history from '@utils/history';

const log = baseLog.extend('onVisited');

const matchRule = (rule: RegExp, item: chrome.history.HistoryItem) => (item.url && rule.test(item.url)) || (item.title && rule.test(item.title));

const onVisited = (store: Store<IAppState>) => (item: chrome.history.HistoryItem) => {
  if (!item.url && !item.title) return;
  const rules = idx(store, _ => _.getState().settings.excludeRules) || [];
  log('onVisited %O', item);
  log('activeRules %O', rules);

  rules.forEach(async rule => {
    if (!rule.trim()) return;
    const regexRule = new RegExp(rule.replace(/\*/g, '\\w+'), 'i');
    if (matchRule(regexRule, item)) {
      const results = await history.search({
        text: rule,
        startTime: 0 // todo
      });
      results.filter(res => matchRule(regexRule, res)).forEach(({ url }) => history.deleteUrl({ url: url! }));
    }
  });

  // chrome.browsingData.remove({
  //   "origins": ["https://www.example.com"]
  // }, {
  //   "cacheStorage": true,
  //   "cookies": true,
  //   "fileSystems": true,
  //   "indexedDB": true,
  //   "localStorage": true,
  //   "pluginData": true,
  //   "serviceWorkers": true,
  //   "webSQL": true
  // }, callback);
};

let listener: ReturnType<typeof onVisited>;
export const setupOnVisited = (store: Store<IAppState>) => {
  if (listener && chrome.history.onVisited.hasListener(listener)) return;
  listener = onVisited(store);
  chrome.history.onVisited.addListener(listener);
};
