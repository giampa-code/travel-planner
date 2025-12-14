from fastapi import APIRouter

router = APIRouter(prefix="/ryanair", tags=["Ryanair"]) # Todos los endpoints de este router comienzan con /ryanair

@router.get("/list_rutes_from_airport")
def list_rutes_from_airport():
    # code
    return {"status": "funcionando ryanair"}