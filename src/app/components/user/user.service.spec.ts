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
    httpClientSpy = jasmine.createSpyObj('HttpClient', ['get']);
    urlService = new UrlService();
    service = new UserService(httpClientSpy, urlService);
  });

  it('should return expected user', (done: DoneFn) => {
    const userId = '6298fd785e3aes4gd58e3d5a';
    const expectedUser: User = {
      id: '62a8315d407259b60bd2740b',
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
});
