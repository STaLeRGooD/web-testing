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
                sh 'executor --dockerfile=DOCKERFILE --context=/app --no-push'

        }
        }    
}
}