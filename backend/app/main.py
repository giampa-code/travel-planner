from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routes import routes, users

app = FastAPI()

# Configurar CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["https://super-potato-rw76jxp775w3pv-5173.app.github.dev"],  # Permitir el origen del frontend
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

#Registrar routers
app.include_router(routes.router)
app.include_router(users.router)


@app.get("/")
def root():
    return {"message": "Backend is running 🚀"}

@app.get("/health")
def health():
    return {"status": "ok"}



