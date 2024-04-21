properties([disableConcurrentBuilds()])

pipeline {
    agent {
        kubernetes {
            label 'kaniko'
            defaultContainer 'jnlp'
            yaml_File 'kaniko.yaml'

     }
    }
    //tools {docker 'jenkins-docker'}
    
    

    stages {
        // Чтоб 2 раза не проверял git
         stage('Checkout') {
             steps {
                 git 'https://github.com/STaLeRGooD/web-testing.git'
             }
         }

  // "Это работает, но возможно бесполезно"
        // stage('Build') {
        //     tools {nodejs "jenkins-nodejs"}
        //     steps {
        //         sh 'npm install'
        //         sh 'npm run build'
        //     }
        // }

        
        stage('Docker build') {
            steps {
                echo " ====================== start building image ======================"
                container('gcr.io/kaniko-project/executor:latest') {
                    sh "export DOCKER_CONFIG=/tmp/.docker && /kaniko/executor --context /app --dockerfile DOCKERFILE --no-push"
                }
            }
        }
        // stage('Docker push') {
        //     steps {
        //        echo " ====================================== pushing image to hub======================================" 
        //        sh 'docker push stalergood/web-test:testing'
        //     }


        
        // stage('Docker build') {
        //     steps {
        //         script {
        //             dockerImage = docker.build("web-testing:${env.BUILD_NUMBER}")
        //         }
        //     }
        // }

        // stage('Docker login') {
        //     steps {
        //         script {
        //             withDockerRegistry([credentialsId: 'docker_hub_credentials', url: 'https://registry.hub.docker.com']) {
        //                 docker.withRegistry('https://registry.hub.docker.com', 'docker_hub_credentials') {
        //                     dockerImage.push()
        //                 }
        //             }
        //         }
        //     }
        // }
    }
}
