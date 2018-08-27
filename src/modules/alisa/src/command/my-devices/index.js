import { reply } from 'yandex-dialogs-sdk';
import config from '../../../../../config/dev';
import axios from 'axios';

export default async function (ctx) {

  const email = 'user@mail.com'
  const password = 'password'
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

  return await axios.post(`${config.server.urlSchema}://${config.server.host}:${config.server.port}` + 
  `/authenticate`, {
      email,
      password
    })
  .then(res => {
    return axios.get(`${config.server.urlSchema}://${config.server.host}:${config.server.port}/users/` + 
    `${res.data.user._id}/devices`,{
      headers: {'x-access-token': res.data.token}
    })
  })
  .then(res => {
    for (let device of res.data) {
      msg.card.items.push({
        image_id: device.image.alisa_id,
        title: device.name
      });
    };
      
    const replyMsg = reply(msg);
    return ctx.reply(replyMsg);
  });
}