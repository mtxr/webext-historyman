import baseLog from '@utils/log';

const log = baseLog.extend('onVisitRemoved');

const listener = (item: chrome.history.RemovedResult) => {
  log('onVisitRemoved %s %O', item.urls ? new URL(item.urls[0] || '').origin : '', item);
};

export const setupOnVisitRemoved = () => {
  if (chrome.history.onVisitRemoved.hasListener(listener)) return;
  chrome.history.onVisitRemoved.addListener(listener);
};
