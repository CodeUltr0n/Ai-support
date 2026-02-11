# Swadesh - AI Support Agent System

Swadesh1 is an AI-powered customer support system designed to handle e-commerce queries. It features a React-based frontend and a robust backend built with Hono, Node.js, and PostgreSQL. The system utilizes specialized AI agents to route and resolve user inquiries regarding orders, billing, and general support.

## 🚀 Tech Stack

### Frontend
-   **Framework**: [React](https://react.dev/)
-   **Build Tool**: [Vite](https://vitejs.dev/)
-   **Styling**: CSS / TailwindCSS (inferred from usage)
-   **HTTP Client**: [Axios](https://axios-http.com/)

### Backend
-   **Framework**: [Hono](https://hono.dev/) (running on Node.js)
-   **Runtime**: [Node.js](https://nodejs.org/)
-   **Database**: [PostgreSQL](https://www.postgresql.org/)
-   **ORM**: [Prisma](https://www.prisma.io/)
-   **AI Integration**: Vercel AI SDK (integrated for potential future use, currently using deterministic logic for agents)

## 📋 Prerequisites

Ensure you have the following installed:
-   [Node.js](https://nodejs.org/) (v18+ recommended)
-   [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)
-   [PostgreSQL](https://www.postgresql.org/) database instance

## 🛠️ Setup Instructions

### 1. Clone the Repository
```bash
git clone <repository-url>
cd Swadesh1
```

### 2. Backend Setup
Navigate to the backend directory and install dependencies:
```bash
cd backend
npm install
```

#### Environment Configuration
Create a `.env` file in the `backend` directory. You will need to configure your database connection string and any necessary API keys.
```env
DATABASE_URL="postgresql://user:password@localhost:5432/swadesh_db"
# Add other keys if required by specific agents (e.g., OPENAI_API_KEY)
```

#### Database Setup
Initialize the database schema and seed data:
```bash
# Generate Prisma client
npm run prisma:generate

# Run migrations
npm run prisma:migrate

# Seed the database (if applicable)
npm run prisma:seed
```

#### Start the Server
```bash
npm run dev
# Server generally runs on http://localhost:3000
```

### 3. Frontend Setup
Open a new terminal, navigate to the frontend directory, and install dependencies:
```bash
cd frontend
npm install
```

#### Start the Application
```bash
npm run dev
# Access the app at http://localhost:5173 (default Vite port)
```

## 🏗️ Architecture & Features

### AI Agents
The system employs a multi-agent architecture to handle different types of user requests:

-   **Router Agent**: Analyzes the intent of the incoming message and routes it to the appropriate specific agent.
-   **Order Agent**: Handles inquiries related to order status, tracking, and history. It accesses the database to retrieve real-time order details.
-   **Billing Agent**: manages billing-related queries such as invoices, refunds, and payment issues.
-   **Support Agent**: A generalist agent for handling FAQs and other support requests.

### Intent Classification
The system uses a keyword-based intent classifier (`utils/intentClassifier.ts`) to categorize messages into:
-   `ORDER`
-   `BILLING`
-   `SUPPORT`
-   `GENERAL`

### API Endpoints
The main entry point for chat interactions is:
-   **POST** `/api/chat`
    -   **Body**: `{ "message": "string", "email": "string" }`
    -   **Response**: Returns the agent's response and the identified intent.

## 📄 License
This project is licensed under the ISC License.
