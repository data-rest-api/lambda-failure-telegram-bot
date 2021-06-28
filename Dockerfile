FROM node:14 as build-image

WORKDIR /srv
COPY . .

######################################################################
### Add credentials for private github npm packages
######################################################################
RUN mv .env.npmrc .npmrc

######################################################################
### Install system packages
######################################################################
RUN curl -sf https://gobinaries.com/tj/node-prune | sh

######################################################################
### Install packages
######################################################################
RUN npm ci \
	&& npm run build:prod \
	&& rm -rf ./node_modules >/dev/null 2>&1 \
	&& npm ci --only=production \
	&& curl -sf https://gobinaries.com/tj/node-prune | sh

######################################################################
### Clean project
######################################################################
RUN node-prune \
	&& rm -rf src >/dev/null 2>&1 \
	&& rm -f *.js >/dev/null 2>&1 \
	&& rm -f *.json >/dev/null 2>&1 \
	&& rm -f *.yml >/dev/null 2>&1 \
	&& rm -f *.yaml >/dev/null 2>&1 \
	&& rm -f *.md >/dev/null 2>&1 \
	&& rm -rf config >/dev/null 2>&1 \
	&& rm -f tsconfig.tsbuildinfo >/dev/null 2>&1 \
	&& rm -f Dockerfile >/dev/null 2>&1 \
	&& find ./ -iname ".*" -maxdepth 1 -type f -exec rm {} \; 2> /dev/null \
	&& find ./ -iname ".*" -maxdepth 1 -type d -exec rm -rf {} \; 2> /dev/null \
	&& rm /usr/local/bin/node-prune >/dev/null 2>&1

######################################################################
### RUN
######################################################################
FROM public.ecr.aws/lambda/nodejs:14

WORKDIR /var/task/
COPY --from=build-image /srv /var/task/

# Command can be overwritten by providing a different command in the template directly.
CMD ["./dist/index.handler"]
