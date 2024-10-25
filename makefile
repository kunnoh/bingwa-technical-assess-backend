# Makefile

# Environment variables
MYSQL_CONTAINER_NAME = bingwa-mysql
MYSQL_IMAGE = mysql:9
MYSQL_ROOT_PASSWORD = my-secret-pw
MYSQL_PORT = 3306
MYSQL_DATA_VOLUME = ./db:/var/lib/mysql
MYSQL_DATABASE = sahihi_builders
MYSQL_USER = bingwa_user
MYSQL_PASSWORD = user-password

# run app development mode
dev:
	make start-db
	make app-dev

# check, stop, and remove existing MySQL container, then create a new one
start-db:
	@if docker ps -a --format '{{.Names}}' | grep -q '^$(MYSQL_CONTAINER_NAME)$$'; then \
		echo "MySQL container '$(MYSQL_CONTAINER_NAME)' is running. Stopping and removing it..."; \
		docker stop $(MYSQL_CONTAINER_NAME); \
		echo "Stopped $(MYSQL_CONTAINER_NAME) container...";\
		# docker rm $(MYSQL_CONTAINER_NAME); \
	else \
		echo "MySQL container '$(MYSQL_CONTAINER_NAME)' is not running or does not exist."; \
	fi
	@echo "Starting a new MySQL container '$(MYSQL_CONTAINER_NAME)'..."
	docker run --name $(MYSQL_CONTAINER_NAME) \
		--rm \
		-e MYSQL_ROOT_PASSWORD=$(MYSQL_ROOT_PASSWORD) \
		-e MYSQL_DATABASE=$(MYSQL_DATABASE) \
		-e MYSQL_USER=$(MYSQL_USER) \
		-e MYSQL_PASSWORD=$(MYSQL_PASSWORD) \
		-p $(MYSQL_PORT):3306 \
		-v $(MYSQL_DATA_VOLUME) \
		-d $(MYSQL_IMAGE)
	@echo "MySQL container '$(MYSQL_CONTAINER_NAME)' is up and running."

# build the application Docker image
build:
	docker image build -t bingwa-api:v1.0.0 .

# start the application
app-dev:
	nodejs -v
	npm run start:dev

# clean up Docker containers and images
clean:
	@echo "Cleaning up Docker containers and images..."
	docker stop $(MYSQL_CONTAINER_NAME) || true
	docker rm $(MYSQL_CONTAINER_NAME) || true
	docker rmi bingwa-api:v1.0.0 || true
	@echo "Cleanup complete."
