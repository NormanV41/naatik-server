import { Request, Response, NextFunction } from 'express';
import { contactModel, IContact } from './contact-model';
import { config } from '../../config/config';
import { transporter } from '../../util/nodemailer';
import { logger } from '../../util/logger';

export const post = (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  contactModel.create(request.body).then(
    (contact) => {
      sendEmail(contact);
      response.json(contact);
    },
    (error) => {
      next(error);
    }
  );
};

const sendEmail = (contact: IContact) => {
  const content = `Nombre de la persona: ${contact.name}
    Correo electrónico: ${contact.email}
    Numero de celular: ${contact.telephone}
    Mensaje: ${contact.message}`;
  const message = {
    from: 'nvasquez@serviciosap.com',
    to: config.targetContactEmail as string,
    subject: 'Mensaje desde el formulario de la Página',
    text: content,
    encoding: 'utf8'
  };
  transporter.sendMail(message, (error, info) => {
    if (error) {
      logger.error(error);
      return;
    }
    logger.log(info);
  });
};
