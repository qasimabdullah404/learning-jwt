## Auth API with JWT
1. Rename .env.example to .env and fill in the corresponding data
2. Run `npm install`
3. Run `npm run dev`

------------


### POST Routes (Assuming PORT 3000)
- Register (http://localhost:3000/api/user/register)  {POST request with name, email and password}
- Login (http://localhost:3000/api/user/login) {POST request with email and password} {RETURNS AUTH-TOKEN in the 		header}

------------

### GET Routes (Assuming PORT 3000)
- welcome (localhost:3000/api/welcome) {**PROTECTED ROUTE**}  {GET request with auth-token in the header}