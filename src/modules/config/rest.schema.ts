import convict from 'convict';
import validator from 'convict-format-with-validator';;
convict.addFormats(validator)

export type RestSchema = {
  PORT: number;
  IP: string;
  SALT: string
}

export const configRestSchema = convict<RestSchema>({
  PORT: {
    doc: 'Порт для входящих соединений',
    format: 'port',
    env: 'PORT',
    default: 4000
  },
  IP: {
    doc: 'Ip-адрес сервера БД',
    format: 'ipaddress',
    env: 'IP',
    default: '127.0.0.1'
  },
  SALT: {
    doc: 'Соль',
    env: 'SALT',
    default: ''
  }
})
