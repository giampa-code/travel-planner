# Travel Planner - AI Coding Guidelines

## Architecture Overview
- **Backend**: FastAPI (Python) with modular structure: `routes/` for endpoints, `schemas/` for Pydantic models, `services/` for business logic
- **Frontend**: React + Vite, components in `src/components/`, API calls in `src/services/`
- **Data Flow**: Frontend fetches from backend API (`/api/routes/from-airport`), backend calls Ryanair API with caching
- **CORS**: Configured in `main.py` for specific frontend origin (GitHub Codespaces URL)

## Key Patterns & Conventions
- **Caching**: Use in-memory dict with TTL in backend services (e.g., `ryanair.py`), `useRef` for client-side caching in React
- **Error Handling**: Raise `HTTPException` in routes, throw errors in frontend API service
- **Type Safety**: Pydantic models for API responses, optional TypeScript in frontend
- **API Design**: RESTful endpoints with query params, response models defined in `schemas/`

## Developer Workflows
- **Backend**: `cd backend && source .venv/bin/activate && uvicorn app.main:app --host 0.0.0.0 --port 8000 --reload`
- **Frontend**: `cd frontend && npm run dev` (runs on port 5173)
- **Environment**: Use virtualenv in `backend/.venv/`, API_URL via `VITE_API_URL` env var
- **Linting**: `npm run lint` in frontend (ESLint), no backend linting configured

## Integration Points
- **External API**: Ryanair routes endpoint (market=en), cached for 60 minutes
- **Frontend-Backend**: Direct HTTP calls, no proxy - ensure CORS origins match deployment URLs
- **Data Sources**: Static airport data in `app/data/airports_to.py` for validation

## Code Examples
- **Add Route**: Follow `routes/routes.py` pattern - router with prefix, query validation, service call
- **New Component**: Use hooks for state, import from `services/api.jsx` for data fetching
- **Caching**: Check cache first, fallback to API, store with timestamp (backend) or useRef (frontend)

## File References
- Core app: `backend/app/main.py`, `frontend/src/App.jsx`
- API endpoints: `backend/app/routes/routes.py`
- Services: `backend/app/services/ryanair.py`, `frontend/src/services/api.jsx`
- Schemas: `backend/app/schemas/routes.py`