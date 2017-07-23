export interface Person {
  id: number;
  name: string;
  avatar: string;

  // it is optional because I know it
  // doesn't exist in the API that we will
  // consume in the next exercise :)
  profession?: string;
}
