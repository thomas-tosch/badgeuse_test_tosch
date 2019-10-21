pipeline {
    agent any
    tools { nodejs "nodejs" }

    stages {
        stage('build') {
            steps {
                sh """
                    npm i -g npm@6.4.1
                    npm ci --only=production
                    sudo mysql -e "source ./BDD/init.d/1-BDD-Badgeuse-tables.sql"
                    sudo mysql -e "source ./BDD/init.d/2-BDD-Badgeuse-Data.sql"
                    pm2 stop all
                    export PORT=8090
                    pm2 start index.js --name badgeuse
                    """
            }
        }
        stage('test') {
            steps {
                sh """
                    npm test
                    npm run test-nyc
                    npm run report-coverage
                    """
            }
        }
        stage('quality')
            steps {
                sh 'sonar-scanner'
            }
    }
}