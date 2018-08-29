import { sample } from 'lodash';
import mqtt from '../../../../../db/mqtt'
import config from '../../../../../config/dev';
import httpRequest from '../../../../../helpers/http'

export async function turnOn(ctx) {
  return turn(ctx, {
    turn: 'on',
    useWhere: false
  });
};  

export async function turnOff(ctx) {
  return turn(ctx, {
    turn: 'off',
    useWhere: false
  });
};

export async function turnOnWhere(ctx) {
  return turn(ctx, {
    turn: 'on',
    useWhere: true
  });
};

export async function turnOffWhere(ctx) {
  return turn(ctx, {
    turn: 'off',
    useWhere: true
  });
};

async function turn(ctx, options) {
  let devices = [];
  const params = {
    host: config.server.host,
    port: config.server.port,
    method: 'GET',
    path: '/api/v1/devices'
  };  

  try {
    let req = await httpRequest(params);

    if (options.useWhere) {
      where = ctx.message
                .split(' ')
                .slice(-1)[0]
                .replace('.', '')};

    for (let device of req) {
      let re = new RegExp(device.where, "i");
      if ((device.type === 'light') && 
            ((!options.useWhere) || (where.search(re) !== -1))) {
  
        mqtt.publish('/alisa', JSON.stringify({
          deviceId: device._id,
          turn: options.turn || "off"
        }));
        devices.push(device);
      }
    };
  
    if (devices.length > 0) {
      return ctx.reply(`${sample(['Рада стараться', 
        'Все сделала.', 'Готово.'])}`);
    } else {
      if (options.useWhere) {
      return ctx.reply(`${sample(['Ваших', 'Подключенных'])} устройств в 
        ${where} не ${sample(['найдено', 'обнаружено'])}.`)
      } else {
        return ctx.reply(`${sample(['Ваших', 'Подключенных'])} устройств 
        не ${sample(['найдено', 'обнаружено'])}.`)
      }
    }
    
  } catch(err) {
    return ctx.reply('Server error');
  }
}