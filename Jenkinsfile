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

node {
        stage('Push from localhost to k8s') {

            steps {
                container('jnlp'){
                withKubeConfig([credentialsId: 'kubectl', serverUrl: '192.168.100.10:6443']){
                    sh 'kubectl apply -f next-app-k8s/deployment.yaml --record' 
                }
                }
           }
           }  
}}
}

//--destination=192.168.100.10:31320/nextjs:test