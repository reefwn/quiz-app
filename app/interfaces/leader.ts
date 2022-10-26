export interface Leader {
  id: number;
  firstName: string;
  lastName: string;
  maidenName: string;
  age: number;
  gender: string;
  email: string;
  phone: string;
  username: string;
  password: string;
  birthDate: string;
  image: string;
  bloodGroup: string;
  height: number;
  weight: number;
  eyeColor: string;
  hair: HairType;
  domain: string;
  ip: string;
  address: Address;
  macAddress: string;
  university: string;
  bank: Bank;
  company: Company;
  ein: string;
  ssn: string;
  userAgent: string;
}

export interface LeaderResponse {
  users: Leader[];
  total: number;
  skip: number;
  limit: number;
}

interface HairType {
  color: string;
  type: string;
}

interface Address {
  address: string;
  city: string;
  coordinates: AddressCoordinate;
  postalCode: string;
  state: string;
}

interface AddressCoordinate {
  lat: number;
  lng: number;
}

interface Bank {
  cardExpire: string;
  cardNumber: string;
  cardType: string;
  currency: string;
  iban: string;
}

interface Company {
  address: Address;
  department: string;
  name: string;
  title: string;
}
