### Add git
`git init`

### ADD Husky
```bash
npm set-script prepare "husky install"
npm run prepare

npx husky add .husky/pre-commit ""
```
and add to `precommit`
```
npx eslint  app_frontend/ --ext .js,.jsx,.tsx,.ts --fix 
npx eslint  app_backend/src/ --ext .js,.jsx,.tsx,.ts --fix  
git add
```
potem terminal
```bash
git add .husky/pre-commit
```
