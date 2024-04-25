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
            agent 
                kubernetes {
                    defaultContainer 'jnlp'

     }
            steps {
                container('jnlp'){
                script {
                    kubernetesDeploy(configs: "next-js-app/deployment.yaml", "next-js-app/service.yaml")
                }}
        }   }
}
}

//--destination=192.168.100.10:31320/nextjs:test