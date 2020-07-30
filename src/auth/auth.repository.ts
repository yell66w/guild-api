import { Repository, EntityRepository } from 'typeorm';
import { User } from '../users/users.entity';
import { AuthSignUpCredentialsDto } from './dto/auth-signup-credentials.dto';
import * as bcrypt from 'bcrypt';
@EntityRepository(User)
export class AuthRepository extends Repository<User> {
  async signUp(credentials: AuthSignUpCredentialsDto): Promise<void> {
    const { password } = credentials;
    delete credentials.confirmPassword;
    credentials.salt = await bcrypt.genSalt();
    credentials.password = await bcrypt.hash(password, credentials.salt);
    await this.save(credentials);
  }
}
