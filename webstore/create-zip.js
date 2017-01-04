var archiver = require('archiver');
var fs = require('fs');

// zipファイル名作成
var version = '0.1.0';
var zip_file_name = './webstore/qa-' + version + '.zip';

// zipファイルのストリームを生成して、archiverと紐付ける
var archive = archiver.create( 'zip', {} );
var output = fs.createWriteStream( zip_file_name );
archive.pipe(output);

// bulkメソッドで、対象となるファイルディレクトリを指定する
archive.bulk([
  {
    expand:true,
    cwd: './extension/',
    src: ['**/*'],
    dest: './qa/', // zipを回答したときのディレクトリ
    dot: true,
  }
]);

// archive.finalize()で、zip圧縮完了すると、
// ストリームのクローズイベントが発火する
output.on('close', function () {
  // zipファイルのサイズ
  var archive_size = archive.pointer() + ' total bytes';
  console.log(archive_size);
});

// zip圧縮実行
archive.finalize();
