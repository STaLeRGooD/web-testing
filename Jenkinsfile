properties([disableConcurrentBuilds()])

pipeline {
    agent none
    stages {
        stage('Building docker in kaniko and push to localhost') {
            agent {
                kubernetes {
                     defaultContainer 'kaniko'
                      yamlFile 'kaniko.yaml'
        }             
        } 
            steps {
                container('kaniko'){
                    script {
                        sh '''
                        /kaniko/executor --dockerfile=DOCKERFILE \
                                         --context=. \
                                         --insecure \
                                         --destination=192.168.100.10:31320/nextjs:${BUILD_NUMBER}
                        '''
                    }
                }

        }
        }
            stage('Push from localhost to k8s') {
                agent any
                steps {
                    withKubeConfig([credentialsId: 'kubectl']){
                        sh 'curl -LO "https://storage.googleapis.com/kubernetes-release/release/v1.29.0/bin/linux/amd64/kubectl"'  
                        sh 'chmod u+x ./kubectl'  
                        sh './kubectl apply -f next-app-k8s/deployment.yaml --record=true' 
                        sh './kubectl apply -f next-app-k8s/service.yaml --record=true' 
                        sh './kubectl set image deployments/next-js-app next-js-app=localhost:31320/nextjs:${BUILD_NUMBER}'
                        } 
                        } 
                        }  
                        } 
                        }

//--destination=192.168.100.10:31320/nextjs:test