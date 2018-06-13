/*
 * Wire
 * Copyright (C) 2018 Wire Swiss GmbH
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program. If not, see http://www.gnu.org/licenses/.
 *
 */

import * as Express from 'express';
import * as Joi from 'joi';

const joiValidate = (schema: Joi.SchemaLike) => (
  req: Express.Request,
  res: Express.Response,
  next: Express.NextFunction
): void => {
  const {body, method} = req;

  if (method === 'GET' || method === 'DELETE') {
    return next();
  }

  const {error: joiError} = Joi.validate(body, schema);
  if (joiError) {
    res.status(422).json({error: `Validation error: ${joiError.message}}`});
    return;
  }

  return next();
};

export default joiValidate;