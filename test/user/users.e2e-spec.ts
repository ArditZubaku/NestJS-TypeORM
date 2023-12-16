import { HttpStatus, INestApplication, ValidationPipe } from '@nestjs/common';
import { TestingModule, Test } from '@nestjs/testing';
import * as request from 'supertest';
import { UsersModule } from '../../src/users/users.module';
import { User } from '../../src/users/entities/user.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { CreateUserDTO } from '../../src/users/dto/create-user.dto';

describe('UserController (e2e)', () => {
  let app: INestApplication;
  const mockUsers = [{ id: 1, name: 'Test' } as User];
  const mockUserRepository = {
    create: jest.fn().mockImplementation((dto) => dto),
    save: jest
      .fn()
      .mockImplementation((user) => Promise.resolve({ id: 1, ...user })),
    find: jest.fn().mockResolvedValue(mockUsers),
  };

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [UsersModule],
    })
      .overrideProvider(getRepositoryToken(User))
      .useValue(mockUserRepository)
      .compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(new ValidationPipe());
    await app.init();
  });

  afterEach(async () => {
    await app.close();
  });

  it('should retrieve users (GET /users)', async () => {
    expect.assertions(1); // Explicitly state the number of assertions

    const response = await request(app.getHttpServer())
      .get('/users')
      .expect(HttpStatus.OK)
      .expect('Content-Type', /json/);

    expect(response.body).toEqual(mockUsers); // Check if the response matches the mock
  });

  it('should create a user (POST /users)', async () => {
    expect.assertions(1);

    const createUserDTO: CreateUserDTO = { name: 'New User' };
    // const expectedResponse = { id: 1, name: 'New User' };

    const response = await request(app.getHttpServer())
      .post('/users')
      .send(createUserDTO)
      .expect(HttpStatus.CREATED)
      .expect('Content-Type', /json/);

    expect(response.body).toEqual({
      id: expect.any(Number),
      name: expect.any(String),
    } as User);
  });

  it('should throw 400 on validation error (POST /users)', async () => {
    const createUserDTO = { name: 1 }; // This should fail validation
    await request(app.getHttpServer())
      .post('/users')
      .send(createUserDTO)
      .expect('Content-Type', /json/)
      .expect(HttpStatus.BAD_REQUEST)
      .expect({
        message: ['name must be a string'],
        error: 'Bad Request',
        statusCode: 400,
      });
  });

  // it('should throw 404 on this request', async () => {
  //   return request(app.getHttpServer())
  //     .post('/usersssssssss')
  //     .expect('Content-Type', /json/)
  //     .expect(HttpStatus.CREATED); // Expect a 400 Bad Request
  // });
});
