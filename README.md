## Project Structure

- `backend/` - NestJS API (MongoDB, Axios)
- `frontend/` - Next.js React app

## How to Run

### 1. Clone the repository

```bash
git clone https://github.com/your-username/meme-collection.git
cd meme-collection
```

### 2. Setup Backend

```bash
cd backend
npm install
```

Create a `.env` file in the `backend/` folder:

```
MONGO_URI=your_mongo_connection_string
CLIENT_URL=http://localhost:3001
PORT=5000
```

Then run the server:

```bash
npm run start:dev
```

### 3. Setup Frontend

```bash
cd ../frontend
npm install
npm run dev
```

## Access

- Frontend: http://localhost:3001  
- Backend: http://localhost:3002

