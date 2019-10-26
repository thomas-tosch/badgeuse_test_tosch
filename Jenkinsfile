pipeline {
    agent any
    tools { nodejs "nodejs" }

    environment {
        PORT = 8090
    }

    stages {
        stage('build') {
            steps {
                gitlabCommitStatus(name: 'Build') {
                    sh """
                        sudo chown -R jenkins .
                        npm i -g npm@6.4.1
                        npm ci --only=production
                        sudo mysql -e "source ./BDD/init.d/1-BDD-Badgeuse-tables.sql"
                        sudo mysql -e "source ./BDD/init.d/2-BDD-Badgeuse-Data.sql"
                        pm2 stop all
                        pm2 stop all
                        export PORT=$PORT
                        pm2 start index.js --name badgeuse
                        """
                }
            }
        }
        stage('test') {
            steps {
                gitlabCommitStatus(name: 'Test') {
                    sh """
                        export PORT=$PORT
                        npm test
                        npm run test-nyc
                        npm run report-coverage
                        """
                }
            }
        }
        stage('quality') {
            steps {
                gitlabCommitStatus(name: 'Quality') {
                    sh 'sonar-scanner'
                }
            }
        }
        stage('deploy') {
            steps {
                gitlabCommitStatus(name: 'Deploy') {
                    sh """
                    git remote add heroku https://git.heroku.com/badgeuse-intelligente.git
                    git push heroku HEAD:master
                    """
                }
            }
        }
    }
    post {
        always {
            cleanWs()
            sh """
            pm2 stop all
            """
        }
    }
}