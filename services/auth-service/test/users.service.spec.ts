import { UsersService } from '../src/modules/users/users.service';
import { UsersRepository } from '../src/modules/users/users.repository';

describe('UsersService', () => {
  let service: UsersService;
  let repo: Partial<UsersRepository>;

  beforeEach(() => {
    repo = {
      findById: jest.fn().mockResolvedValue({ id: 'u1', email: 'test@atlas.io' }),
    };
    service = new UsersService(repo as UsersRepository);
  });

  it('should return user by id', async () => {
    const user = await service.getUserById('u1');
    expect(user.id).toBe('u1');
    expect(repo.findById).toHaveBeenCalledWith('u1');
  });
});
