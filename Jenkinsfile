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
                    withKubeConfig([credentialsId: 'jenkins-deployer', serverUrl: '192.168.100.10:6443']){
                        sh 'curl -LO "https://storage.googleapis.com/kubernetes-release/release/v1.29.0/bin/linux/amd64/kubectl"'  
                        sh 'chmod u+x ./kubectl'  
                        sh './kubectl get pods'
                        sh 'kubectl apply -f next-app-k8s/deployment.yaml --record' 
                        } 
                        } 
                        }  
                        } 
                        }

//--destination=192.168.100.10:31320/nextjs:test