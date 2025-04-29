import { plainToInstance } from "class-transformer";
import { validate } from "class-validator";
import { Request, Response, NextFunction } from "express";

export function validateDto(dtoClass: any) {
  return async (req: Request, res: Response, next: NextFunction) => {
    const dtoObject = plainToInstance(dtoClass, req.body);

    const errors = await validate(dtoObject, {
      whitelist: true,
      forbidNonWhitelisted: true,
      skipMissingProperties: false
    });

    if (errors.length > 0) {
      const errorMessages = errors.map(err => ({
        property: err.property,
        constraints: err.constraints
      }));

      return res.status(400).json({
        message: "Validation failed",
        errors: errorMessages
      });
    }

    next();
  };
}
