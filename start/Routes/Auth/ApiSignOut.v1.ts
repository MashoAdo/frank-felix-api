/**
 * @apiGroup           Users
 * @apiName            sign out
 * @api                {post} /api/v1/register  Register
 * @apiDescription     User self registration
 * @apiVersion         1.0.0
 *
 * @apiHeader          Accept application/json
 *
 * @apiBody   {String}    name            User's name
 * @apiBody   {String}    email           User's email
 * @apiBody   {String}    phone_number    The users phone number e.g. +2547xxxxxxxx
 *
 * @apiSuccessExample  {json}    Success-Response:
 * HTTP/1.1 200 OK
 * {
 *   "success": true,
 *   "success_code": 10000,
 *   "success_message": "",
 * }
 *
 **/
import Route from "@ioc:Adonis/Core/Route";
import UsersController from "App/Controllers/Http/UsersController";

Route.post("/api/v1/sign-out", () => new UsersController().signOut()).as(
  "user.sign.out"
);
