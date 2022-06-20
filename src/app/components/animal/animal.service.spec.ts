import { Animal } from './interface/animal';
import { UrlService } from './../../url/url.service';
import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { AnimalService } from './animal.service';

describe('AnimalService', () => {
  let service: AnimalService;
  let httpClientSpy: jasmine.SpyObj<HttpClient>;
  // let urlService: UrlService;
  beforeEach(() => {
    httpClientSpy = jasmine.createSpyObj('HttpClient', [
      'get',
      'put',
      'post',
      'delete',
    ]);
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(AnimalService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return expected animal', () => {
    const animalId = '6298fd785e3aes4gsd0xd5r0';
    const expectedAnimal: Animal = {
      _id: '6298fd785e3aes4gsd0xd5r0',
      userId: '6298fd785e3aes4gd58e3d5a',
      name: 'apolo',
      type: 'dog',
      breed: 'braco',
      gender: 'male',
      character: 'happy',
      age: '10 years',
      location: 'Guanare',
      province: 'Portuguesa',
      phone: '+32456789123',
      webSite: 'null',
      describeAnimal:
        'Very happy, he loves to play a lot with cocos, if very friendly, hr loves to play with kids, anything you throw he will catch it',
      pictures: [
        {
          picture: {
            data: '/9j/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIg//9k=',
            contentType: 'image/webp',
          },
          isPrincipal: 'false',
          fieldname: 'picture1',
          _id: '6286671b2528a8e7224b9e0c',
        },
      ],
      registerDate: '2022-05-19T15:49:47.282Z',
      updateDate: '2022-06-02T18:35:39.468Z',
    };
    expect(service).toBeTruthy();
  });
});
