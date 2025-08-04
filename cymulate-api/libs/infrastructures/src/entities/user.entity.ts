import { Exclude } from 'class-transformer';

export class UserEntity {
  @Exclude()
  password: string | null;

  @Exclude()
  token: string | null;

  constructor(partial: Partial<UserEntity>) {
    Object.assign(this, partial);
  }
}
