import { User } from '../user.entity';

export class SignUpOkResponse {
  name: User['name'];
  email: User['email'];
}
