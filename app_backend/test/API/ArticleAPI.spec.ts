import { Collection, MongoClient } from 'mongodb';
import { connectionOptions, dbName, uri } from '../../src/Utils/dbConnection';
import UserRepository from '../../src/Repository/UserRepository';
import ArticleTypeRepository from '../../src/Repository/ArticleTypeRepository';
import Authentication from '../../src/Repository/Authentication';
import ArticleCollectionSeeder from '../utils/ArticleCollectionSeeder';
import ArticleRepository from '../../src/Repository/ArticleRepository';
import CollectionHelper from '../utils/CollectionHelper';
// @ts-ignore
import request from 'supertest';
import app from '../../src/app';
import { errorsMessages } from '../../src/Validator/ErrorMessages';

let connection: void | MongoClient;
let articlesCollection: Collection;
let articleTypeCollection: Collection;
let userCollection: Collection;
beforeAll(async () => {
  // connection
  connection = await MongoClient.connect(uri, connectionOptions);
  // injection db
  await UserRepository.injectDB(connection);
  await ArticleTypeRepository.injectDB(connection);
  await Authentication.injectDB(connection);
  await ArticleRepository.injectDB(connection);
  articlesCollection = connection.db(dbName).collection('articles');
  articleTypeCollection = connection.db(dbName).collection('articleTypes');
  userCollection = connection.db(dbName).collection('users');

  await ArticleCollectionSeeder.checkAndPrepareArticlesCollection(articlesCollection, articleTypeCollection, userCollection);
});

describe('Single article id by id', () => {
  describe('preview endpoint', () => {
    let someArticle: any;
    it('Should be 422 error without Accept-Language header', async () => {
      someArticle = await CollectionHelper.getSomeDocument(articlesCollection, 2);
      const result = await request(app)
        .get(`/article/${someArticle!._id.toString()}`);
      const response = JSON.parse(result.text);
      expect(result.status).toEqual(422);
      expect(response).toEqual(errorsMessages.missingLang);
    });
    it('Should be 422 error with incorrect language ', async () => {
      const incorrectLangs = ['de', 'fr', 'ru'];
      for (const incorrectLang of incorrectLangs) {
        const result = await request(app)
          .get(`/article/${someArticle!._id.toString()}`)
          .set('Accept-Language', incorrectLang);
        const response = JSON.parse(result.text);
        expect(result.status).toEqual(422);
        expect(response).toEqual(errorsMessages.invalidLang);
      }
    });
    it('Should be 422 error with invalid id format', async () => {
      const invalidId = 'someStupidText';
      const result = await request(app)
        .get(`/article/${invalidId}`)
        .set('Accept-Language', 'en');
      const response = JSON.parse(result.text);
      expect(result.status).toEqual(422);
      expect(response).toEqual(errorsMessages.invalidIdFormat);
    });
    it('Should be 404 error when id not exists in articleTypes collection', async () => {
      const result = await request(app)
        .get(`/article/${CollectionHelper.makeNotExistingId()}`)
        .set('Accept-Language', 'en');
      const response = JSON.parse(result.text);
      expect(result.status).toEqual(404);
      expect(response).toEqual(errorsMessages.itemNotFound);
    });
    it('Should be 404 error id exists in articleTypes collection but articleType is disabled', async () => {
      const disabledArticle = await articlesCollection.findOne({ isEnabled: false });
      const result = await request(app)
        .get(`/article/${disabledArticle!._id.toString()}`)
        .set('Accept-Language', 'en');
      const response = JSON.parse(result.text);
      expect(result.status).toEqual(404);
      expect(response).toEqual(errorsMessages.itemNotFound);
    });
    it('Should be status 200 and proper response object in polish language ', async () => {
      const creator = await userCollection.findOne({ _id: someArticle!.creator });
      const articleType = await articleTypeCollection.findOne({ _id: someArticle.articleTypeId });
      const result = await request(app)
        .get(`/article/${someArticle!._id.toString()}`)
        .set('Accept-Language', 'pl');
      const response = JSON.parse(result.text);
      expect(result.status).toEqual(200);
      expect(response.title).toEqual(someArticle!.titlePl);
      expect(response.seriePart).toEqual(someArticle!.seriePart);
      expect(response.content).toEqual(someArticle!.content.pl);
      expect(response.creator._id).toEqual(someArticle!.creator.toString());
      expect(response.creator._id).toEqual(creator!._id.toString());
      expect(response.creator.firstName).toEqual(creator!.firstName);
      expect(response.creator.lastName).toEqual(creator!.lastName);
      expect(response.articleType._id).toEqual(articleType!._id.toString());
      expect(response.articleType.name).toEqual(articleType!.name);
      expect(response.articleType.type).toEqual(articleType!.type);
      expect(response.articleType.icon).toEqual(articleType!.icon);
      expect(response.isEnabled).toBeUndefined();
    });
    it('Should be status 200 and proper response object in english language ', async () => {
      const creator = await userCollection.findOne({ _id: someArticle!.creator });
      const articleType = await articleTypeCollection.findOne({ _id: someArticle.articleTypeId });
      const result = await request(app)
        .get(`/article/${someArticle!._id.toString()}`)
        .set('Accept-Language', 'en');
      const response = JSON.parse(result.text);
      expect(result.status).toEqual(200);
      expect(response.title).toEqual(someArticle!.titleEn);
      expect(response.seriePart).toEqual(someArticle!.seriePart);
      expect(response.content).toEqual(someArticle!.content.en);
      expect(response.creator._id).toEqual(someArticle!.creator.toString());
      expect(response.creator._id).toEqual(creator!._id.toString());
      expect(response.creator.firstName).toEqual(creator!.firstName);
      expect(response.creator.lastName).toEqual(creator!.lastName);
      expect(response.articleType._id).toEqual(articleType!._id.toString());
      expect(response.articleType.name).toEqual(articleType!.name);
      expect(response.articleType.type).toEqual(articleType!.type);
      expect(response.articleType.icon).toEqual(articleType!.icon);
      expect(response.isEnabled).toBeUndefined();
    });
  });
  describe('Admin endpoint', () => {
    let someArticle: any;
    let somUser: any;
    it('Should be 401 error when url contains \'admin\' and missing Authorization header', async () => {
      someArticle = await CollectionHelper.getSomeDocument(articlesCollection, 2);
      const result = await request(app)
        .get(`/admin/article/${someArticle!._id.toString()}`)
        .set('Accept-Language', 'pl');
      const response = JSON.parse(result.text);
      expect(result.status).toEqual(401);
      expect(response).toEqual(errorsMessages.missingAuthorization);
    });
    it('Should be 401 error with invalid jwtToken', async () => {
      const result = await request(app)
        .get(`/admin/article/${someArticle!._id.toString()}`)
        .set('Authorization', 'Bearer ' + CollectionHelper.makeInvalidToken())
        .set('Accept-Language', 'pl');
      expect(result.status).toEqual(401);
    });
    it('Should be 401 error with expired token', async () => {
      somUser = await CollectionHelper.getSomeDocument(userCollection, 14);
      const auth = new Authentication();
      const expiredLogin = await auth.login(somUser!.email, somUser!.firstName, '1ms');
      const result = await request(app)
        .get(`/admin/article/${someArticle!._id.toString()}`)
        .set('Authorization', 'Bearer ' + expiredLogin.jwtToken)
        .set('Accept-Language', 'pl');
      expect(result.status).toEqual(401);
    });
    it('Should be 200 status code and proper response with valid jwtToken', async () => {
      const creator = await userCollection.findOne({ _id: someArticle!.creator });
      const articleType = await articleTypeCollection.findOne({ _id: someArticle.articleTypeId });

      const auth = new Authentication();
      const userLogin = await auth.login(somUser!.email, somUser!.firstName);
      const result = await request(app)
        .get(`/admin/article/${someArticle!._id.toString()}`)
        .set('Authorization', 'Bearer ' + userLogin.jwtToken)
        .set('Accept-Language', 'pl');
      expect(result.status).toEqual(200);
      const response = JSON.parse(result.text);
      expect(result.status).toEqual(200);
      expect(response.titlePl).toEqual(someArticle!.titlePl);
      expect(response.titleEn).toEqual(someArticle!.titleEn);
      expect(response.seriePart).toEqual(someArticle!.seriePart);
      expect(response.content).toEqual(someArticle!.content);
      expect(response.creator._id).toEqual(someArticle!.creator.toString());
      expect(response.creator._id).toEqual(creator!._id.toString());
      expect(response.creator.firstName).toEqual(creator!.firstName);
      expect(response.creator.lastName).toEqual(creator!.lastName);
      expect(response.articleType._id).toEqual(articleType!._id.toString());
      expect(response.articleType.name).toEqual(articleType!.name);
      expect(response.articleType.type).toEqual(articleType!.type);
      expect(response.articleType.icon).toEqual(articleType!.icon);
      expect(response.isEnabled).toEqual(someArticle!.isEnabled);
    });
  });
});
