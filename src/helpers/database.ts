import * as crypto from 'node:crypto';
export function getMongoURI(
  username: string,
  password: string,
  host: string,
  port: string,
  databaseName: string,
): string {
  return `mongodb://${username}:${password}@${host}:${port}/${databaseName}?authSource=admin`;
}
export function getMongoURIWithoutAuth(
  host: string,
  port: string,
  databaseName: string,
): string {
  return `mongodb://${host}:${port}/${databaseName}?authSource=admin`;
}
export const createSHA256 = (line: string, salt: string): string => {
  const shaHasher = crypto.createHmac('sha256', salt);
  return shaHasher.update(line).digest('hex');
};
