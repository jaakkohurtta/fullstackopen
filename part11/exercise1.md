### Java CI/CD pipeline with Azure DevOps

A robust Java CI/CD pipeline consists of the following tools: Checkstyle for linting, JUnit for testing, 
Maven to build and package your app and finally using Auze Pipelines to deploy the application. Using Checkstyle in combination with an IDE suitable for Java development will ensure that the code adheres to a set of predefined rules and best practices.

#### Azure DevOps

Using Azure DevOps for the CI/CD pipeline has several advantages: it is very easy to set up and provides many analytics tools out of the box. You can either choose to configure the pipeline as code using YAML or choose one of many different templates that will guide you through the configuring process. In this scenario we could use a template for Java applications built with Maven. After the CI process is complete the application can be automatically deployed to Azure.

Clear disadvanteges of using Azure DevOps are its' lack of integration of non-Microsoft products and the lack of if-else statements in Azure Pipelines - this makes creating more complex workflows very difficult. Azure DevOps can be installed locally, but that requires a Windows operating system. Using the cloud-based solution makes it possible to be used with all platforms.

 
