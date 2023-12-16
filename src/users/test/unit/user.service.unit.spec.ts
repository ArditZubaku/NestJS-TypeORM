import { faker } from '@faker-js/faker';
import { TestingModule, Test } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { CreateUserDTO } from '../../dto/create-user.dto';
import { User } from '../../entities/user.entity';
import { UsersService } from '../../users.service';

describe('UsersController', () => {
  let userService: UsersService;
  const mockUserRepository = {
    create: jest.fn().mockImplementation((dto) => dto),
    save: jest
      .fn()
      .mockImplementation((user) =>
        Promise.resolve({ id: 1, ...user } as User),
      ),
  };

  beforeEach(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: getRepositoryToken(User),
          useValue: mockUserRepository,
        },
      ],
    }).compile();

    userService = moduleRef.get<UsersService>(UsersService);
  });

  it('Should be defined', () => {
    expect(userService).toBeDefined();
  });

  it('should create a new user and return it', async () => {
    const dto: CreateUserDTO = {
      name: faker.person.firstName(),
    };

    expect(await userService.create(dto)).toEqual({
      id: expect.any(Number),
      name: expect.any(String),
    } as User);
  });
});
