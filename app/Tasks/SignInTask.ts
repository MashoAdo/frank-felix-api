import { TaskInterface } from "App/Types/Interfacts";

export class signIn implements TaskInterface {
  public async run(args) {
    console.log(args);
  }
}
