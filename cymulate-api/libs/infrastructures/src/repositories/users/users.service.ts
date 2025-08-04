import { PaginationDto } from '@cymulate/infrastructures/dtos';
import { UserEntity } from '@cymulate/infrastructures/entities';
import { DatabaseService } from '@cymulate/infrastructures/modules/database';
import { Injectable } from '@nestjs/common';
import { SignupDto } from 'apps/cymulate-api/src/auth/dtos';

@Injectable()
export class UsersService {
  constructor(private readonly database: DatabaseService) {}

  createOne(user: SignupDto): Promise<UserEntity> {
    return this.database.users.create({
      data: {
        email: user.email,
        password: user.password,
        firstName: user.firstName,
        lastName: user.lastName,
      },
    });
  }

  findUniqueByEmail(email: string) {
    return this.database.users.findFirst({
      where: { email },
    });
  }

  findMany(paginationDto: PaginationDto): Promise<UserEntity[]> {
    return this.database.users.findMany({
      take: paginationDto.take,
      skip: paginationDto.skip,

      ...(paginationDto.orderByField && {
        orderBy: {
          [paginationDto.orderByField]: paginationDto.orderByDirection || 'asc',
        },
      }),
    });
  }
}
