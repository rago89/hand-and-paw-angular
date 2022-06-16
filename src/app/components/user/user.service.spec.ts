import { UrlService } from './../../url/url.service';
import { HttpClient } from '@angular/common/http';

import { UserService } from './user.service';
import { User } from './interface/User';
import { of } from 'rxjs';

describe('UserService', () => {
  let service: UserService;
  let httpClientSpy: jasmine.SpyObj<HttpClient>;
  let urlService: UrlService;

  beforeEach(() => {
    httpClientSpy = jasmine.createSpyObj('HttpClient', [
      'get',
      'put',
      'post',
      'patch',
    ]);
    urlService = new UrlService();
    service = new UserService(httpClientSpy, urlService);
  });

  it('should create user', (done: DoneFn) => {
    const expectedResponse: {
      message: string;
      user: { _id: string; name: string; email: string };
    } = {
      message: "You're successfully registered",
      user: {
        _id: '6298fd785e3aes4gd58e3d5a',
        name: 'Rafael',
        email: 'user@email.com',
      },
    };
    const newUser: { name: string; email: string; password: string } = {
      name: 'Rafael',
      email: 'user@email.com',
      password: 'hello13*',
    };
    httpClientSpy.post.and.returnValue(of(expectedResponse));
    service.postUser(newUser).subscribe({
      next: (response) => {
        expect(response).withContext('create user').toEqual(expectedResponse);
        done();
      },
    });
    expect(service).toBeTruthy();
  });

  it('should return expected user', (done: DoneFn) => {
    const userId = '6298fd785e3aes4gd58e3d5a';
    const expectedUser: User = {
      id: '6298fd785e3aes4gd58e3d5a',
      name: 'Peter',
      phone: '+32123546789',
      location: 'MONS',
      avatar: {},
      favorites: [],
      publicAccess: {},
      registeredAnimals: [],
    };
    httpClientSpy.get.and.returnValue(of(expectedUser));
    service.getUser(userId).subscribe({
      next: (response) => {
        expect(response).withContext('expected user').toEqual(expectedUser);
        done();
      },
    });
    expect(service).toBeTruthy();
  });

  it('should update user', (done: DoneFn) => {
    const userId = '6298fd785e3aes4gd58e3d5a';
    const expectedUser: User = {
      id: '6298fd785e3aes4gd58e3d5a',
      name: 'Rafael',
      phone: '+32123546321',
      location: 'MONS',
      avatar: {},
      favorites: [],
      publicAccess: {},
      registeredAnimals: [],
    };

    const updateValues: User = {
      id: '6298fd785e3aes4gd58e3d5a',
      name: 'Rafael',
      phone: '+32123546321',
      location: '',
      avatar: {},
      favorites: [],
      publicAccess: {},
      registeredAnimals: [],
    };
    httpClientSpy.put.and.returnValue(of(expectedUser));
    service.updateUser(updateValues, userId).subscribe({
      next: (response) => {
        expect(response).withContext('update user').toEqual(expectedUser);
        done();
      },
    });
  });

  it('should add favorite animal to user', (done: DoneFn) => {
    const expectedResponse: {
      message: string;
    } = {
      message: 'animal added successfully',
    };
    const animalId = '6298fd785e3aes4gsd0xd5r0';
    const userId = '6298fd785e3aes4gd58e3d5a';

    httpClientSpy.patch.and.returnValue(of(expectedResponse));
    service.setFavoriteAnimal(animalId, userId).subscribe({
      next: (response) => {
        expect(response)
          .withContext('add favorite animal')
          .toEqual(expectedResponse);
        done();
      },
    });
  });

  it('should remove favorite animal to user', (done: DoneFn) => {
    const expectedResponse: {
      message: string;
    } = {
      message: 'animal removed successfully',
    };
    const animalId = '6298fd785e3aes4gsd0xd5r0';
    const userId = '6298fd785e3aes4gd58e3d5a';

    httpClientSpy.patch.and.returnValue(of(expectedResponse));
    service.removeFavoriteAnimal(animalId, userId).subscribe({
      next: (response) => {
        expect(response)
          .withContext('remove favorite animal')
          .toEqual(expectedResponse);
        done();
      },
    });
  });

  it('should return null if userId is not provided in add favorite animal', (done: DoneFn) => {
    const expectedResponse: null = null;
    const animalId = '6298fd785e3aes4gsd0xd5r0';
    const userId: undefined = undefined;

    httpClientSpy.patch.and.returnValue(of(expectedResponse));
    service.setFavoriteAnimal(animalId, userId).subscribe({
      next: (response) => {
        expect(response)
          .withContext('add favorite animal')
          .toEqual(expectedResponse);
        done();
      },
    });
  });

  it('should return null if userId is not provided in remove favorite animal', (done: DoneFn) => {
    const expectedResponse: null = null;
    const animalId = '6298fd785e3aes4gsd0xd5r0';
    const userId: undefined = undefined;

    httpClientSpy.patch.and.returnValue(of(expectedResponse));
    service.removeFavoriteAnimal(animalId, userId).subscribe({
      next: (response) => {
        expect(response)
          .withContext('remove favorite animal')
          .toEqual(expectedResponse);
        done();
      },
    });
  });
});
