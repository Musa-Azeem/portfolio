FROM amazon/aws-lambda-nodejs:12

# Copy app into container
COPY . .

# Install NPM dependencies for function
RUN npm install

# Set the CMD to your handler (could also be done as a parameter override outside of the Dockerfile)
CMD [ "lambda.handler" ]