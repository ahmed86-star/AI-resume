import { getServerSession } from 'next-auth/next';
import { PrismaClient } from '@prisma/client';
import type { NextApiRequest, NextApiResponse } from 'next';
import { authOptions } from '../auth/[...nextauth]';
import { debug } from '@/config/debug';

const prisma = new PrismaClient();

interface SessionUser {
  id: string;
  name?: string | null;
  email?: string | null;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  debug('api', 'Save Request Initiated', {
    method: req.method,
    headers: req.headers,
    body: req.body ? JSON.stringify(req.body).substring(0, 100) + '...' : null
  });

  const session = await getServerSession(req, res, authOptions);
  
  if (!session?.user) {
    return res.status(401).json({ error: 'Unauthorized - Please sign in' });
  }

  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST']);
    return res.status(405).json({ error: `Method ${req.method} not allowed` });
  }

  try {
    const { title, content } = req.body;
    
    if (!title?.trim() || !content?.trim()) {
      return res.status(400).json({ 
        error: 'Missing required fields',
        details: {
          title: !title?.trim() ? 'Title is required' : undefined,
          content: !content?.trim() ? 'Content is required' : undefined
        }
      });
    }

    const resume = await prisma.resume.create({
      data: {
        title: title.trim(),
        content,
        userId: (session.user as SessionUser).id,
      },
      select: {
        id: true,
        title: true,
        createdAt: true,
        updatedAt: true
      }
    });

    return res.status(201).json({
      success: true,
      message: 'Resume saved successfully',
      data: resume
    });

  } catch (error) {
    console.error('Resume save error:', error);
    return res.status(500).json({ 
      error: 'Internal server error',
      message: 'Failed to save resume. Please try again later.'
    });
  } finally {
    await prisma.$disconnect();
  }
}