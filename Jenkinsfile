properties([disableConcurrentBuilds()])

pipeline {
    agent none
    stages {
        // stage('Building docker in kaniko and push to localhost') {
        //     agent {
        //         kubernetes {
        //              defaultContainer 'kaniko'
        //               yamlFile 'kaniko.yaml'
        //}             
        //} 
        //     steps {
        //         container('kaniko'){
        //             script {
        //                 sh '''
        //                 /kaniko/executor --dockerfile=DOCKERFILE-test \
        //                                  --context=. \
        //                                  --insecure \
        //                                  --destination=192.168.100.10:31320/nextjs:test
        //                 '''
        //             }
        //         }

        // }
        // }
            stage('Push from localhost to k8s') {
                agent any
                steps {
                    withKubeConfig([credentialsId: 'kubectl']){
                        sh 'curl -LO "https://storage.googleapis.com/kubernetes-release/release/v1.29.0/bin/linux/amd64/kubectl"'  
                        sh 'chmod u+x ./kubectl'  
                        sh 'ls next-app-k8s'  
                        sh './kubectl get nodes'
                        sh './kubectl get pods --all-namespaces'
                        sh './kubectl apply -f next-app-k8s/deployment.yaml' 
                        } 
                        } 
                        }  
                        } 
                        }

//--destination=192.168.100.10:31320/nextjs:test