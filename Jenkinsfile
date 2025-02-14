pipeline {
    agent any

    environment {
        IBM_REGISTRY = 'us.icr.io'  
        IMAGE_NAME_BACKEND = 'collab-app/backend'
        IMAGE_NAME_FRONTEND = 'collab-app/frontend'
        IMAGE_TAG = 'latest'
    }

    stages {
        stage('Checkout Code') {
            steps {
                git 'https://github.com/Rachanakr/collaboration-app.git'
            }
        }

        stage('Build Docker Images Locally') {
            steps {
                script {
                    echo "Building Backend Docker Image..."
                    bat "docker build -t backend:latest ./backend"

                    echo "Building Frontend Docker Image..."
                    bat "docker build -t frontend:latest ./frontend"
                }
            }
        }

      

        stage('Login to IBM Cloud Registry') {
            steps {
                withCredentials([string(credentialsId: 'IBM_CLOUD_API_KEY', variable: 'IBM_CLOUD_API_KEY')]) {
                    script {
                        // Install the IBM Cloud Container Registry plugin if it's not already installed
                        bat """
                            "C:\\Program Files\\IBM\\Cloud\\bin\\ibmcloud.exe" plugin install container-registry --no-auto-update
                            set IBM_CLOUD_API_KEY=${IBM_CLOUD_API_KEY}
                            "C:\\Program Files\\IBM\\Cloud\\bin\\ibmcloud.exe" login --apikey %IBM_CLOUD_API_KEY% -r us-south
                            "C:\\Program Files\\IBM\\Cloud\\bin\\ibmcloud.exe" cr login
                        """
                    }
                }
            }
        }

        stage('Tag & Push Images to IBM Cloud Registry') {
            steps {
                script {
                    echo "Tagging and Pushing Frontend Image..."
                    bat "docker tag frontend:latest ${IBM_REGISTRY}/collab-app/frontend:latest"
                    bat "docker push ${IBM_REGISTRY}/collab-app/frontend:latest"

                    echo "Tagging and Pushing Backend Image..."
                    bat "docker tag backend:latest ${IBM_REGISTRY}/collab-app/backend:latest"
                    bat "docker push ${IBM_REGISTRY}/collab-app/backend:latest"
                }
            }
        }

        stage('Deploy to Kubernetes') {
            steps {
                script {
                    echo "Deploying to Kubernetes..."
                    bat "kubectl apply -f k8s\\backend-deployment.yaml"
	                bat "kubectl apply -f k8s\\frontend-deployment.yaml"

                  
                }
            }
        }
    }

    post {
        success {
            echo "Pipeline executed successfully!"
        }
        failure {
            echo "Pipeline failed. Please check the logs."
        }
    }
}
