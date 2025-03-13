FROM python:3.13.2-alpine3.20
WORKDIR /app
COPY requirements.txt .
RUN pip install -r requirements.txt
COPY . .
CMD ["python","-u", "app.py"]