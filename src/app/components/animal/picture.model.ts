export class AnimalPicture {
  constructor(
    public picture: { data: string; contentType: string },
    public isPrincipal: { type: string; default: false },
    public fieldname: string
  ) {}
}
