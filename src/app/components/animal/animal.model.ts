import { AnimalPicture } from './picture.model';

export class Animal {
  constructor(
    public userId: string,
    public name: string,
    public type: string,
    public breed: string,
    public gender: string,
    public character: string,
    public age: string,
    public location: string,
    public province: string,
    public phone: string,
    public describeAnimal: string,
    public webSite?: string,
    public pictures?: Array<AnimalPicture>
  ) {}
}
