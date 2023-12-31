import { faker } from '@faker-js/faker';
import { TestingModule, Test } from '@nestjs/testing';
import { CreateUserDTO } from '../../dto/create-user.dto';
import { UpdateUserDTO } from '../../dto/update-user.dto';
import { User } from '../../entities/user.entity';
import { UsersController } from '../../users.controller';
import { UsersService } from '../../users.service';

describe('UsersController', () => {
  // In unit tests, always check the dependencies (constructor)

  let usersController: UsersController;
  const mockUsersService = {
    create: jest.fn((dto) => {
      return {
        id: Date.now(),
        ...dto,
      };
    }),
    update: jest.fn().mockImplementation((id, dto) => ({
      id,
      ...dto,
    })),
  };

  beforeEach(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [UsersService],
    })
      .overrideProvider(UsersService)
      .useValue(mockUsersService)
      .compile();

    usersController = moduleRef.get<UsersController>(UsersController);
  });

  it('Should be defined', () => {
    expect(usersController).toBeDefined();
  });

  test('createUser', () => {
    const dto: CreateUserDTO = {
      name: faker.person.firstName(),
      // name: 'Test',
    };

    expect(usersController.create(dto)).toEqual({
      id: expect.any(Number),
      name: dto.name,
    } as User);

    expect(mockUsersService.create).toHaveBeenCalled();
  });

  it('should update a user', () => {
    const id = 5;
    const dto: UpdateUserDTO = {
      name: faker.person.firstName(),
    };

    expect(usersController.update(id, dto)).toEqual({
      id: +id,
      name: dto.name,
    } as User);

    expect(mockUsersService.update).toHaveBeenCalled();
  });
});
