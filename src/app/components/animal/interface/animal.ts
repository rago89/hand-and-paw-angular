type Picture = {
  picture: {
    data: string;
    contentType: string;
  };
  isPrincipal: string;
  fieldname: string;
  _id: string;
};

export interface Animal {
  _id?: string;
  userId: string;
  name: string;
  type: string;
  breed: string;
  gender: string;
  character: string;
  age: string;
  location: string;
  province: string;
  phone: string;
  webSite: string;
  describeAnimal: string;
  pictures: Picture[];
  registerDate: string;
  updateDate: string;
}
