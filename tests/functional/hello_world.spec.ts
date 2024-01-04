import { test } from "@japa/runner";

test("display welcome page", async ({ client }) => {
  const response = await client.get("/");

  response.assertStatus(200);
  response.assertTextIncludes("Frank felix api is up and running");
});
