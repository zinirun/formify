<p align="center" style="margin-bottom:5px">
    <img width="80" src=".github/formify-logo.png">
</p>

# Formify
누구나 쉽게 만들고, 쉽게 답변할 수 있는 폼

Make Easy, Answer Easy

# Start
- [Formify](http://formify.xyz)
- [Guide](http://formify.xyz/guide)
- [Preview - 상반기 공개채용 폼 예시](http://formify.xyz/do/qyyuv)

# Stack
- Backend
  - Nest.js
  - TypeORM
  - GraphQL
  - JWT/OAuth2
  - PM2
- Frontend
  - React/Typescript
  - Apollo
  - Ant Design
- Database
  - MySQL
- Infra
  - Docker-compose + shell-script
  - Nginx + certbot

# Usage

## Development
1. Clone this repo
    ```bash
    git clone https://github.com/zinirun/formify.git
    ```
2. Create environment setup
    - in root folder
      - create `.env`
        ```
        DATABASE = ""
        DB_USER = ""
        DB_PASSWORD = ""
        DB_HOST = "db"
        ```
    - in `backend` folder
      - create `.env`
        ```
        SERVER_ADDR = "http://YOUR_URL:4000"
        CLIENT_ADDR = "http://YOUR_URL"

        GOOGLE_CLIENT_ID = ""
        GOOGLE_SECRET = ""

        GITHUB_CLIENT_ID = ""
        GITHUB_SECRET = ""

        JWT_SECRET_KEY = ""
        ```
      - create `ormconfig.json` and define your database / same with root environment setup
        ```
        {
            "type": "mysql",
            "host": "db",
            "port": 3306,
            "username": "",
            "password": "",
            "database": "",
            "entities": ["dist/**/*.entity{.ts,.js}"],
            "synchronize": true
        }
        ```
    - (*) in `frontend/package.json`
      - add backend proxy when develop
        ```json
        "proxy": "http://localhost:4000"
        ```
3. Setup Packages
   ```bash
   cd backend
   yarn install
   cd ../frontend
   yarn install
4. Start Projects
    ```bash
    yarn start:dev # backend
    yarn start # frontend
    ```

## Production
1. Init your host (Ubuntu)
    ```bash
    chmod +x init.sh
    ./init.sh
    ```
2. Do docker-compose up
    ```bash
    docker-compose up -d --build
    ```
- Rebuild images and containers
    ```bash
    chmod +x rebuild.sh
    ./rebuild.sh
    ```

## License

Formify is [MIT licensed](LICENSE).