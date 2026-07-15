# Evara Backend — MongoDB Atlas Setup

This backend adds real user registration/login to your Evara site, backed by MongoDB Atlas.

## 1. Install dependencies
```bash
cd backend
npm install
```

## 2. Configure your database connection
```bash
cp .env.example .env
```
Then open `.env` and set:
```
MONGODB_URI=mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/evara?retryWrites=true&w=majority
JWT_SECRET=some_long_random_string
PORT=5000
```
(See the guide above for how to get your Atlas connection string — Atlas dashboard → Connect → Drivers → Node.js.)

## 3. Run the server
```bash
npm start
```
You should see:
```
Connected to MongoDB Atlas
Server running on http://localhost:5000
```

## 4. Connect the frontend
Open the site's `login.html` in a browser (e.g. via a simple static server, or directly). The login/register forms
already call the API at `http://localhost:5000/api/auth/...` (see `auth.js` in the site root).

If your backend runs on a different host/port, update `API_BASE_URL` at the top of `auth.js`.

## API Endpoints
| Method | Endpoint             | Body                                                   |
|--------|----------------------|---------------------------------------------------------|
| POST   | /api/auth/register   | `{ username, email, password, confirmPassword }`        |
| POST   | /api/auth/login      | `{ email, password }` → returns `{ token, user }`        |
| GET    | /api/health           | health check                                             |

Passwords are hashed with bcrypt before being stored — never stored in plain text.
