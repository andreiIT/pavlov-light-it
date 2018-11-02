export class Post {
  public body: string;
  public id: number;
  public title: string;
  public userId: number;

  constructor(data: any) {
    this.title = data.title;
    this.id = data.id;
    this.body = data.body;
    this.userId = data.userId;
  }
}
