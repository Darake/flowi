.PHONY: dev test help
.DEFAULT_GOAL: help

default: help

help: ## Output available commands
	@echo "Available commands:"
	@echo
	@fgrep -h "##" $(MAKEFILE_LIST) | fgrep -v fgrep | sed -e 's/\\$$//' | sed -e 's/##//'

dev:  ## Run a development environment on port 3000
	@docker-compose build
	@docker-compose up

server-unit: ## Run server unit tests
	@docker-compose -f server-unit.yml build
	@docker-compose -f server-unit.yml -p test up --abort-on-container-exit

client-unit: ## Run server unit tests
	@docker-compose -f client-unit.yml build
	@docker-compose -f client-unit.yml -p test up

end: ## Run end to end tests
	@docker-compose -f e2e.yml build
	@docker-compose -f e2e.yml -p test up --abort-on-container-exit

lint: ## Run linter
	@docker-compose -f lint.yml build
	@docker-compose -f lint.yml -p test up

shutdown: ## Stop and remove every project's container
	@docker-compose down
	@docker-compose -f e2e.yml down
	@docker-compose -f unit.yml down
	@docker-compose -f lint.yml down

enter-client: ## Enter the dev environment client's container
	@docker exec -it flowi_client_1 sh

enter-server: ## Enter the dev environment server's container
	@docker exec -it flowi_server_1 sh