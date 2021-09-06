import express, { Application } from 'express';
import users from './Router/userRouter';
import articleTypes from './Router/articleTypeRouter';
import glossary from './Router/GlossaryRouter';
import article from './Router/ArticleRouter';

const app: Application = express();
app.use(express.json());
app.use('/', users);
app.use('/', articleTypes);
app.use('/', glossary);
app.use('/', article);

export default app;
