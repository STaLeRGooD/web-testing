properties([disableConcurrentBuilds()])

pipeline {
    agent {
        kubernetes {
            defaultContainer 'kaniko'
            yamlFile 'kaniko.yaml'

     }
    }
    stages {
        stage('Docker build') {
            steps {
                container('kaniko'){
                    script {
                        sh '''
                        /kaniko/executor --dockerfile=DOCKERFILE \
                                         --context=. \
                                         --destination=192.168.100.10:31320/next-js:test
                        '''
                    }
                }

        }
        }    
}
}