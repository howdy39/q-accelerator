import Util from './util';



Util.getHisotry((historiesObj) => {
  const histories = Object.values(historiesObj);

  const articleLinkElements = Array.from(
    document.querySelectorAll('a.popularItem_articleTitle_text'));

  articleLinkElements.forEach(element => {
    const href = element.getAttribute('href');
    const {userId, itemId} = Util.parseUrl(href);

    const hasHistory = histories.some(history => history.userId === userId && history.itemId === itemId);

    if (hasHistory) {
      element.parentElement.parentElement.style.display = 'none'
      Util.infoLog(`"${element.textContent}"を非表示にしました`);
    }
  });
});
