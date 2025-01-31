import { PrismaClient } from '@prisma/client';
import { debug } from '@/config/debug';
import fs from 'fs';
import path from 'path';

const prisma = new PrismaClient({
  log: [
    { level: 'warn', emit: 'event' },
    { level: 'info', emit: 'event' },
    { level: 'error', emit: 'event' }
  ],
  datasources: {
    db: {
      url: process.env.DATABASE_URL,
      ssl: {
        rejectUnauthorized: true,
        ca: fs.readFileSync(path.join(process.cwd(), 'pscale_CA.pem'), 'utf8')
      }
    }
  }
});

prisma.$on('warn', (e) => debug('database', 'Prisma Warning', e));
prisma.$on('info', (e) => debug('database', 'Prisma Info', e));
prisma.$on('error', (e) => debug('database', 'Prisma Error', e));

export default prisma; 