properties([disableConcurrentBuilds()])

pipeline {
    agent {
        kubernetes {
            defaultContainer 'kaniko'
            yamlFile 'kaniko.yaml'

     }
    }
    //tools {docker 'jenkins-docker'}
    
    

    stages {
        

        
        stage('Docker build') {
            steps {
                container('kaniko'){
                    script {
                        sh '''
                        /kaniko/executor --dockerfile DOCKERFILE-2 \
                                         --context /app \
                                         --no-push
                        '''
                    }
                }

        }
        }    
}
}