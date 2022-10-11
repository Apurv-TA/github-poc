frontend:
	docker build -t frontend -f env/docker_mcdui/Dockerfile .

backend:
	docker build -t backend -f env/docker_mcdapi/Dockerfile .

nginx:
	docker build -t proxy -f env/docker_nginx/Dockerfile .
