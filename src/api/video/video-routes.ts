import { Router, Request, Response } from 'express';
import * as fs from 'fs';
import { logger } from '../../util/logger';
import { join } from 'path';

const videoRouter = Router();

videoRouter.route('/').get((request: Request, response: Response) => {
  const path = join(__dirname, '/../../../public/assets/la_manada_full_HD.mp4');
  const stat = fs.statSync(path);
  const fileSize = stat.size;
  const range = request.headers.range;
  if (range) {
    const parts = range.replace(/bytes=/g, '').split('-');
    const start = parseInt(parts[0], 10);
    const end = parts[1] ? parseInt(parts[1], 10) : fileSize - 1;
    const chunkSize = end - start + 1;
    logger.log('fraction of file: ' + chunkSize / fileSize);
    const file = fs.createReadStream(path, { start, end });
    const head = {
      'Content-Range': `bytes ${start}-${end}/${fileSize}`,
      'Accept-Ranges': 'bytes',
      'Content-Length': chunkSize,
      'Content-Type': 'video/mp4'
    };
    response.writeHead(206, head);
    file.pipe(response);
  } else {
    const head = { 'Content-Length': fileSize, 'Content-Type': 'video/mp4' };
    response.writeHead(200, head);
    fs.createReadStream(path).pipe(response);
  }
});

export default videoRouter;
