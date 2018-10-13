import Util from '../../common/util';

const URL_PATTERN_TOP = new RegExp('^https?://qiita\\.com/(|timeline|tag-feed|milestones)$');
const URL_PATTERN_ARTICLE = new RegExp('^https?://qiita\\.com/[^/]+/(items|private)/[^/#?]+$');

export default class FixHeader {

  run() {
    const url = location.href;
    let filePath;
    if (URL_PATTERN_TOP.test(url)) {
      filePath = 'fix-header.top.css';
    } else if (URL_PATTERN_ARTICLE.test(url)) {
      filePath = 'fix-header.article.css';
    } else {
      filePath = 'fix-header.other.css';
    }
    require(`style-loader!./${filePath}`);
    Util.infoLog('ヘッダーを固定');
  }

}
