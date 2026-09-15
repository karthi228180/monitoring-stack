pipeline {
    agent any

    environment {
        PROMETHEUS_CONFIG_DIR = "${workspace}/prometheus"
    }

    stages {
        stage ('code cloning') {
            steps {
                git branch: 'main',
                    url: 'https://github.com/karthi228180/monitoring-stack.git'
            }
        }

        stage ('Run node exporter') {
            steps {
                sh '''
                docker ps -q --filter "name=node-exporter" | grep -q . && docker stop node-exporter && docker rm node-exporter || true

                docker run -d \
                 --name=node-exporter \
                 -p 9100:9100 \
                 prom/node-exporter
              '''
            }
        }

        stage ('Run prometheus') {
            steps {
                sh '''
                mkdir -p $PROMETHEUS_CONFIG_DIR
                cp prometheus.yml $PROMETHEUS_CONFIG_DIR/prometheus.yml

                docker ps -q --filter "name=prometheus" | grep -q . && docker stop prometheus && docker rm prometheus || true

                docker run -d \
                 --name=prometheus \
                 -p 9090:9090 \
                 -v $PROMETHEUS_CONFIG_DIR/prometheus.yml:/etc/prometheus/prometheus.yml \
                 prom/prometheus
            '''
            }
        }

        stage ('Run Grafana') {
            steps {
                sh '''
                docker ps -q --filter "name=grafana" | grep -q . && docker stop grafana && docker rm grafana || true

                docker run -d \
                --name=grafana \
                -p 3000:3000 \
                grafana/grafana
            '''
            }
        }
    }

    post {
        success {
            echo "Monitoring stack deployed successfully"
            echo " GRAFANA > http://<EC2_PUBLIC_IP:3000"
            echo " PROMETHEUS> http://<EC2_PUBLIC_IP:9090"
            echo " NODE EXPORTER > http://<EC2_PUBLIC_IP:9100/METRICS"            
        }
        failure {
            echo "Deployment failed. check jenkins logs"
        }
    }

}