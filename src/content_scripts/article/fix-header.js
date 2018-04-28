import Util from '../../common/util';

export default class FixHeader {

  run() {
    require('style-loader!./fix-header.css');
    Util.infoLog('ヘッダーを固定');
  }

}
