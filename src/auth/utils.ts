import { ConflictException, InternalServerErrorException } from "@nestjs/common";
import { UNIQUE_CONSTRAINT_ERROR_CODE } from "./constants";

export const handleUserSaveError = (errorCode: string): void => {
  if (errorCode === UNIQUE_CONSTRAINT_ERROR_CODE) {
    throw new ConflictException('This name or email already exists');
  }

  throw new InternalServerErrorException()
};
