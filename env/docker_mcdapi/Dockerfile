FROM python:3.8

# Set environment variables
ENV PYTHONUNBUFFERED 1

COPY env/docker_mcdapi/requirements.txt requirements.txt

# Install dependencies.
RUN pip install -r /requirements.txt

# Set work directory.
RUN mkdir /code
WORKDIR /code

# Copy project code.
COPY django/ /code/

EXPOSE 80
