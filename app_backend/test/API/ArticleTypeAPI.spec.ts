// @ts-ignore
import request from 'supertest';
import { Collection, MongoClient } from 'mongodb';
import { connectionOptions, dbName, uri } from '../../src/Utils/dbConnection';
import UserRepository from '../../src/Repository/UserRepository';
import ArticleTypeRepository from '../../src/Repository/ArticleTypeRepository';
import ArticleTypesCollectionSeeder from '../utils/ArticleTypesCollectionSeeder';
import CollectionHelper from '../utils/CollectionHelper';
import app from '../../src/app';
import { errorsMessages } from '../../src/Validator/ErrorMessages';
import { validLanguages } from '../../src/Interfaces/Enums';
import Authentication from '../../src/Repository/Authentication';

let connection: void | MongoClient;
let articleTypeCollection: Collection;
let userCollection: Collection;
beforeAll(async () => {
  // connection
  connection = await MongoClient.connect(uri, connectionOptions);
  // injection db
  await UserRepository.injectDB(connection);
  await ArticleTypeRepository.injectDB(connection);
  await Authentication.injectDB(connection);
  articleTypeCollection = connection.db(dbName).collection('articleTypes');
  userCollection = connection.db(dbName).collection('users');

  await ArticleTypesCollectionSeeder.checkAndPrepareArticleTypesCollection(articleTypeCollection, userCollection);
});

describe('Single article id by id', () => {
  describe('preview endpoint', () => {
    let someAType: any;
    it('Should be 422 error without Accept-Language header', async () => {
      someAType = await CollectionHelper.getSomeDocument(articleTypeCollection, 2);
      const result = await request(app)
        .get(`/articleType/${someAType!._id.toString()}`);
      const response = JSON.parse(result.text);
      expect(result.status).toEqual(422);
      expect(response).toEqual(errorsMessages.missingLang);
    });
    it('Should be 422 error with incorrect language ', async () => {
      const incorrectLangs = ['de', 'fr', 'ru'];
      for (const incorrectLang of incorrectLangs) {
        const result = await request(app)
          .get(`/articleType/${someAType!._id.toString()}`)
          .set('Accept-Language', incorrectLang);
        const response = JSON.parse(result.text);
        expect(result.status).toEqual(422);
        expect(response).toEqual(errorsMessages.invalidLang);
      }
    });
    it('Should be 422 error with invalid id format', async () => {
      const invalidId = 'someStupidText';
      const result = await request(app)
        .get(`/articleType/${invalidId}`)
        .set('Accept-Language', 'en');
      const response = JSON.parse(result.text);
      expect(result.status).toEqual(422);
      expect(response).toEqual(errorsMessages.invalidIdFormat);
    });
    it('Should be 404 error when id not exists in articleTypes collection', async () => {
      const result = await request(app)
        .get(`/articleType/${CollectionHelper.makeNotExistingId()}`)
        .set('Accept-Language', 'en');
      const response = JSON.parse(result.text);
      expect(result.status).toEqual(404);
      expect(response).toEqual(errorsMessages.articleTypeNotFound);
    });
    it('Should be 404 error id exists in articleTypes collection but articleType is disabled', async () => {
      const disabledAType = await articleTypeCollection.findOne({ isEnabled: false });
      const result = await request(app)
        .get(`/articleType/${disabledAType!._id.toString()}`)
        .set('Accept-Language', 'en');
      const response = JSON.parse(result.text);
      expect(result.status).toEqual(404);
      expect(response).toEqual(errorsMessages.articleTypeNotFound);
    });
    it('Should be status 200 and proper response object ', async () => {
      const creator = await userCollection.findOne({ _id: someAType!.creator });
      for (const validLanguage of Object.keys(validLanguages)) {
        const result = await request(app)
          .get(`/articleType/${someAType!._id.toString()}`)
          .set('Accept-Language', validLanguage);
        const response = JSON.parse(result.text);
        expect(result.status).toEqual(200);
        expect(response.name).toEqual(someAType!.name);
        expect(response.type).toEqual(someAType!.type);
        expect(response.icon).toEqual(someAType!.icon);
        expect(response.description).toEqual(someAType!.description[validLanguage]);
        expect(response.creator._id).toEqual(someAType!.creator.toString());
        expect(response.creator._id).toEqual(creator!._id.toString());
        expect(response.creator.firstName).toEqual(creator!.firstName);
        expect(response.creator.lastName).toEqual(creator!.lastName);
        expect(response.isEnabled).toBeUndefined();
      }
    });
  });
  describe('Admin endpoint', () => {
    let someAType: any;
    let somUser: any;
    it('Should be 401 error when url contains \'admin\' and missing Authorization header', async () => {
      someAType = await CollectionHelper.getSomeDocument(articleTypeCollection, 2);
      const result = await request(app)
        .get(`/admin/articletype/${someAType!._id.toString()}`)
        .set('Accept-Language', 'pl');
      const response = JSON.parse(result.text);
      expect(result.status).toEqual(401);
      expect(response).toEqual(errorsMessages.missingAuthorization);
    });
    it('Should be 401 error with invalid jwtToken', async () => {
      const result = await request(app)
        .get(`/admin/articletype/${someAType!._id.toString()}`)
        .set('Authorization', 'Bearer ' + CollectionHelper.makeInvalidToken())
        .set('Accept-Language', 'pl');
      expect(result.status).toEqual(401);
    });
    it('Should be 401 error with expired token', async () => {
      somUser = await CollectionHelper.getSomeDocument(userCollection, 14);
      const auth = new Authentication();
      const expiredLogin = await auth.login(somUser!.email, somUser!.firstName, '1ms');
      const result = await request(app)
        .get(`/admin/articletype/${someAType!._id.toString()}`)
        .set('Authorization', 'Bearer ' + expiredLogin.jwtToken)
        .set('Accept-Language', 'pl');
      expect(result.status).toEqual(401);
    });
    it('Should be 200 status code and proper response with valid jwtToken', async () => {
      const creator = await userCollection.findOne({ _id: someAType!.creator });

      const auth = new Authentication();
      const userLogin = await auth.login(somUser!.email, somUser!.firstName);
      const result = await request(app)
        .get(`/admin/articletype/${someAType!._id.toString()}`)
        .set('Authorization', 'Bearer ' + userLogin.jwtToken)
        .set('Accept-Language', 'pl');
      expect(result.status).toEqual(200);
      const response = JSON.parse(result.text);
      expect(response.name).toEqual(someAType!.name);
      expect(response.type).toEqual(someAType!.type);
      expect(response.icon).toEqual(someAType!.icon);
      expect(response.description).toEqual(someAType!.description);
      expect(response.isEnabled).toEqual(someAType!.isEnabled);
      expect(response.creator._id).toEqual(someAType!.creator.toString());
      expect(response.creator._id).toEqual(creator!._id.toString());
      expect(response.creator.firstName).toEqual(creator!.firstName);
      expect(response.creator.lastName).toEqual(creator!.lastName);
    });
  });
});
