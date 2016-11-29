import Util from '../util';

console.log('hoge');


const articleLinkElements = Array.from(document.querySelectorAll('a.popularItem_articleTitle_text'));
const articleLinkUrls = articleLinkElements.map(e => e.getAttribute('href'))
                          // .map(href => util.parseUrl();

