import type { Request, RequestHandler, Response } from 'express';

const logoutController: RequestHandler = async (req: Request, res: Response) => {
  const cookies = req?.cookies;
  if (!cookies?.token || cookies.token === 'null' || cookies.token === 'undefined') {
    res.sendStatus(204);
    return;
  }

  res.clearCookie('token');
  res.status(200).json({ message: 'Logged out successfully' });
  return;
};

export default logoutController;
