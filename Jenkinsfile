pipeline {
    agent any
    tools { nodejs "node" }

    stages {
        stage('test') {
            agent {
                docker {
                image 'mariadb'
                args '--name mariadb -e MYSQ_ROOT_PASSWORD=toor -d'
                }
            }
            steps {
                sh 'npm i -g npm@6.4.1'
                sh 'npm ci --only=production'
                sh 'docker exec mariadb sh -c "exec mysql < ./BDD/init.d/1-BDD-Badgeuse-tables.sql"'
                sh 'docker exec mariadb sh -c "exec mysql < ./BDD/init.d/2-BDD-Badgeuse-Data.sql"'
                sh 'pm2 start index.js --name badgeuse'
                sh 'npm test'
            }
        }
    }
}