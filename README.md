## Local Development Setup

### Prerequisites
- Go 1.21+
- Node.js 18+
- Access to the Firebase project (contact repo owner)

### Backend
1. Clone the repo
2. Obtain a Firebase service account key from the project owner
3. Place it at `/etc/breadmachine/serviceAccountKey.json`
4. Run the API:
```bash
go run main.go
```

### Frontend
1. Install dependencies:
```bash
npm install
```
2. Create a `.env.local` file in the frontend directory with:
```
VITE_API_URL=http://localhost:8080
```
3. Run the dev server:
```bash
npm run dev
```

### Notes
- Never commit the Firebase service account key
- Never commit `.env.local`
- Make sure both `.gitignore` files include these files
