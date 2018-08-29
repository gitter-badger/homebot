import { reply } from 'yandex-dialogs-sdk';
import httpRequest from '../../../../../helpers/http'
import config from '../../../../../config/dev';

export default async function (ctx) {

  const msg = {
    text: "Ваши устройства",
    card: {
      type: "ItemsList",
      header: {
        text: "Ваши устройства"
      },
      items: []
    }
  };

  const params = {
    host: config.server.host,
    port: config.server.port,
    method: 'GET',
    path: '/api/v1/devices'
  }

  try {
    let devices = await httpRequest(params);

    for (let device of devices) {
      msg.card.items.push({
        image_id: device.image.alisa_id,
        title: device.name
      });
    };

    const replyMsg = reply(msg);
    return ctx.reply(replyMsg);
    
  } catch(err) {
    return ctx.reply('Server error');
  }
}