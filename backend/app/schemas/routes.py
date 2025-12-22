from pydantic import BaseModel, Field

class RoutesResponse(BaseModel):
    destinations: list[str]