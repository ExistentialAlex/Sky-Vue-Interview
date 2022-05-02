export class DogApi {
  private baseUrl = "https://dog.ceo/api";
  private imgUrl = "https://images.dog.ceo";

  public getBaseUrl = () => this.baseUrl;
  public getImgUrl = () => this.imgUrl;

  public async getAllBreeds(): Promise<any> {
    try {
      const allBreeds = "/breeds/list/all";
      const resp = await (await fetch(this.baseUrl + allBreeds)).json();
      return this.convertBreedList(resp.message);
    } catch (e) {
      console.error(e);
    }
  }

  public async getParentBreeds(): Promise<string[]> {
    try {
      const allBreeds = "/breeds/list/all";
      const resp = await (await fetch(this.baseUrl + allBreeds)).json();
      return Object.keys(resp.message);
    } catch (e) {
      console.error(e);
      return [];
    }
  }

  public async getAllByBreed(breed: string): Promise<string[]> {
    try {
      const breedList = `/breed/${breed}/images`;
      const resp = await (await fetch(this.baseUrl + breedList)).json();
      return resp.message;
    } catch (e) {
      console.error(e);
      return [];
    }
  }

  public async getRandomByBreed(breed: string): Promise<string> {
    try {
      const randBreed = `/breed/${breed}/images/random`;
      const resp = await (await fetch(this.baseUrl + randBreed)).json();
      return resp.message;
    } catch (e) {
      console.error(e);
      return "";
    }
  }

  public async getRandom(): Promise<string> {
    try {
      const randBreed = `/breeds/image/random`;
      const resp = await (await fetch(this.baseUrl + randBreed)).json();
      return resp.message;
    } catch (e) {
      console.error(e);
      return "";
    }
  }

  private convertBreedList(breeds: any): string[] {
    const breedList: string[] = [];

    for (const key of Object.keys(breeds)) {
      if (breeds[key] == []) {
        breedList.push(key);
        continue;
      }

      for (const subBreed of breeds[key]) {
        breedList.push(subBreed + " " + key);
      }
    }

    return breedList;
  }
}
