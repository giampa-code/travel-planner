from fastapi import FastAPI
from app.routes import ryanair, users

app = FastAPI()


#Registrar routers
app.include_router(ryanair.router)
app.include_router(users.router)

@app.get("/")
def root():
    return {"message": "Backend is running 🚀"}

@app.get("/health")
def health():
    return {"status": "ok"}

@app.get("/api/cities")
def get_cities():
    return {"status": "ok"}

