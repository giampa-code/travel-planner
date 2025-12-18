# travel-planner
Sitio web de práctica con React y Fast API

# Primer commit
Proyecto de práctica con React + FastAPI usando GitHub Codespaces

# Resumen
## Git
git add .

git commit -m "Initial project setup"

git push

## Python
crear, activar env

mkdir backend

cd backend

python -m venv .venv

source .venv/bin/activate

pip install fastapi uvicorn

pip freeze > requirements.txt

## Uvicorn
correr servirdor

uvicorn app.main:app --host 0.0.0.0 --port 8000 --reload

## React
crear y correr servidor

cd ..

mkdir frontend

cd frontend

npm create vite@latest . -- --template react

npm install

npm run dev

## Puertos
Por default CodeSpaces configura los puertos en privado, por lo que hay que cambiarlos a públicos en la pestania de puertos