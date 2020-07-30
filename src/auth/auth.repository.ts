import { Repository, EntityRepository } from 'typeorm';
import { User } from '../users/users.entity';

@EntityRepository(User)
export class AuthRepository extends Repository<User> {}
