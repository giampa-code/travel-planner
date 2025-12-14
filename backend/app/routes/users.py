from fastapi import APIRouter


router = APIRouter(prefix="/api/users", tags=["Users"])

@router.get("/")
def list_users():
    return ["juan","maria", "pedro"]