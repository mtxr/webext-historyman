import promisify from '@utils/promisify';

const history = {
  ...chrome.history,
  search2: (query: chrome.history.HistoryQuery) => new Promise<chrome.history.HistoryItem[]>((resolve, reject) => {
    chrome.history.search(query, results => {
      if (chrome.runtime.lastError) {
        return reject(chrome.runtime.lastError);
      }
      return resolve(results);
    });
  }),
  search: promisify(chrome.history.search),
  deleteUrl: promisify(chrome.history.deleteUrl),
};

export default history;
