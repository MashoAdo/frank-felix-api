import { TaskInterface } from "App/Types/Interfaces";
import { v4 as uuid } from "uuid";

export default class GenerateTokenTask implements TaskInterface {
  public async run() {
    return uuid();
  }
}
