.PHONY: help list lint test release

help:
	@echo "lint - check style with eslint"
	@echo "test - run tests headless"
	@echo "release - package and upload a release on npm"
	@echo "bump-and-push - run tests, lint, bump patch, push to git, and release on npm"

lint:
	./node_modules/.bin/eslint src

test:
	CI=1 npm test

test-watch:
	find lib/ spec/ static/ -name \*.js | entr -r npm test

bump-and-push: test
	bumpversion patch
	git push
	git push --tags
	make release

release:
	npm publish
