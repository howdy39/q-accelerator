#!/usr/bin/env node

/* global process */

const ora = require('ora');
const { green, red, yellow } = require('chalk');
const jsonfile = require('jsonfile');
const archiver = require('archiver');
const fs = require('fs');

const spinner = ora();
const spinnerStart = (text) => {
  spinner.text = text;
  return spinner.start();
};

const manifestFilePath = 'extension/manifest.json';
spinnerStart(`read ${manifestFilePath}`);
jsonfile.readFile(manifestFilePath, (err, obj) => {
  if (err) errorHandler(err);
  spinner.succeed();

  const version = obj.version;
  createZip(version);
});

function createZip(version) {
  const zipFilePath = `webstore/qa-${version}.zip`;
  spinnerStart(`create zip ${zipFilePath}`);

  // zipファイルのストリームを生成して、archiverと紐付ける
  const archive = archiver.create('zip', {});

  archive.on('error', err => {
    errorHandler(err);
  });

  const output = fs.createWriteStream(zipFilePath);
  archive.pipe(output);

  archive.glob('./extension/**/*');

  // zip圧縮実行
  archive.finalize();
  spinner.succeed();

  console.log(green('zipファイルの作成が成功しました'));
}

function errorHandler(err) {
  spinner.fail();
  console.error(red(err.message));

  if (err.response && err.response.body) {
    try {
      console.error(yellow(JSON.stringify(err.response.body, null, 4)));
    } catch (err) {
      console.error(red(err.message));
    }
  }
  process.exit(1);
}
