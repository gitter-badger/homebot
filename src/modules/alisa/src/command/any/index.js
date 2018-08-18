import { sample } from 'lodash';

export default function (ctx) {
  return ctx.reply(`${sample(['Увы, я пока не знакома с этой командой.',
             'Я не знаю эту команду.',
             'Я вас не поняла.'])}`)
}