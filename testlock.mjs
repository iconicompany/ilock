import lockfile from "proper-lockfile";
import Timeout from "await-timeout";
import createDebug from 'debug';
import fs from 'fs';
const debug = createDebug('testlock');

async function main() {
  const filePath = "/tmp/test";
  fs.closeSync(fs.openSync(filePath, 'w'))

  let relaese = () => debug('empty release');
  try {
    debug('try lock');
    relaese = await lockfile.lock(filePath);
    debug('start work');
    await Timeout.set(5 * 1000);
    debug('end work');
  } catch (e) {
    // тут можно сделать проверку:
    // если e.code==='ELOCKED', вывести пользователю понятное сообщение об ошибке
    debug('catch', 'code', e.code, 'exception', e);
  } finally {
    debug('start release');
    await relaese();
    debug('end release');
  }
}

main().then();
