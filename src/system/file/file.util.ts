import dayjs from 'dayjs';
import path, { join } from 'path';

export const FileDestination = './public/uploads';

export function createFileName(file: Express.Multer.File, prefix?: string) {
  const now = dayjs().format('YYYYMMDDHHmmss');
  const extname = path.extname(file.originalname);
  let filename = `${now}${extname}`;

  if (prefix) {
    filename = prefix + filename;
  }
  return filename;
}

const contentTypeMap = {
  '.xlsx': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
};

export function getContentType(filename: string): string {
  const extname = path.extname(filename);
  return contentTypeMap[extname];
}

export function getFilePath(filename) {
  return join(process.cwd(), FileDestination, filename);
}
