Локальное развертывание кластера K8S, так же создание CI/CD сети с помощью Jenkins, и развертывание небольшого Nextjs приложения с БД на PostgreSQL
https://web-testing-pied.vercel.app/
1. Выбор железа
    Для этой практики я в течении месяца выбирал железо, ведь без опыта собственного ручного развертывания k8s использовать облачные сервисы я не хотел.
    Выбор почти сразу пал на мини пк, они мобильны и оснащены неплохими процессорами для своих размеров. Выбирал варианты от 8 физический ядер, для размещения более большего кол-во виртуалок и приложений. Выбирал между NO_NAME китайцем на 5800у и Minisforum на 7840HS. По причине наличия приличной дискретной видеокарты, я взял второй вариант(очень хотел потрогать 7840HS, а так же там имеется переходник и разьем в корпусе для Oculink, хочу протестировать EGPU 3070 ti через Oculink). Брал варинта без памяти за 41к на ОЗОНе. Одновременно с эти заказом, заказал в ДНС SSD от Samsung 980 pro и RAM от Crucial SODIMM DDR5 на 32гб для начала этого достаточно.
2. Поставка задач 
    После покупки я решил разметить что именно я хотел получить в конце или в процессе, и поэтому я думал зачем я начал это делать.И так, чтоб можно было сменить сферу деятельности с системного администратора на кого-то по-интересней, по-интересней - в основном в плане работы и ежедвемного досуга. Я смотрел кем может пойти системный администратор, чтоб не сильно потерять в опыте, а также чтоб сам опыт как системный администратор был полезен в будущем. И на и более интересным вариантом на сегодня(13.05.2024) был для меня DevOps-Инженер. 
    Далее я стал более точно узучать кто такой DevOps-Инженер и кто он должен уметь делать и знать. Почти параллельно я стал листать HH, и смотреть вакансии на эту специальность и требования на неё. Много где требуется опыт администрирования Linux, опыт работы в Kubernetes, Jenkins(или подобными), PostgreSQL(или подобными), Ansible/Terraform, Prometheus/Grafana/Zabbix, а так же скриптовые языки программирования(GO, Python, bash) и понятия CI/CD. На основе этого я решил реализовать локальное развертывание кластера K8S, так же создание небольшой CI/CD сети с помощью Jenkins используя репозиторий на GitHub, и развертывание небольшого Nextjs приложения с БД на PostgreSQL, А так же мониторинги Zabbix внутри proxmox, и Prometheus/Grafana внутри K8S. Так же из-за того что в K8S нужно несколько nodes для нормального функционирования, я решил использовать Proxmox как систему вертуализации, так как там есть веб интерфейс для взаимодействия с виртуалками, а сеть внутри Proxmox, чтоб не мусорить во внешней сети, создать через виртуалку Mikrotik, которая находится внутри proxmox.
3. Установка Proxmox
    Из-за того что proxmox ставился на голое железо, и из-за того что по DHCP хост на linux получается адрес только в момент установки, пришлось мудрить чтоб мини пк был подключен по кабелю. 
        https://www.proxmox.com/en/downloads
    Без трудностей скачал и установил по интрукции, которая была указана на оф сайте, галочки которые были при установки не менял, кроме галочки на сетевом интерфейсе, нужно было получать адрес по именно DHCP.
    После установки без пробел подключился к веб интерфейсу и начал настройку.
4. Настройка Proxmox
    После установки я стал продумывать как разворачивать виртуалки внутри proxmox. И первое что я решил, создать внутренную виртуальную подсеть для того чтобы легче управлятся сетевым доступом между виртуалок и так же облегчить настройку NAT для тех же виртуалок. В интернете я нашел что RouterOS, ОС для маршрутизаторов Mikrotik, можно скачать и поставить на х86 систему, то есть на виртуалку. 
        https://mikrotik.com/download
    Скачал и установил без проблем на виртуалку и начал настройку. Так же активировал безлимитную по времени демо версию ОС с помощью учетки Mikrotik, скачанная была 30 дней-лимитной. Это нужно было чтоб RouterOS продолжала работать.
    Создать 2 виртуальных моста было не трудно, для внешного соединения Proxmox/Mikrotik с интернетом, и для внутренного соединения от Mikrotik к виртуалкам в Proxmox и между ними. RouterOS очень важный компонент в данном случае. Мне по последнему опыту привычней с ним работать, а так же легче настроить начальные параметры сети.
5. Настройка Mikrotik в proxmox
    Для начала я сбросил конфигурацию, чтоб весь конфик RouterOS был пустой.После настроил чтоб сама виртуалка получала IP адресс по DHCP от внешнего роутера, далее дал виртуалке 192.168.100.1 адресс во внутренней сети. Затем настроил DHCP с подсетью 192.168.100.0, а так же статичный DNS 192.168.100.1 для этой сети, и пул адрессов с *.*.100.50 до *.*.100.250.
    После добавил стандартные правила в файлвол и настроил правило для работы NAT и чтоб виртуалки имели доступ в интернет. 
    Для проверки работоспособности, а также для помощи настройки виртуалки-роутера я поставил Windows-client. Доступ в интернет был реализован, и адрес по DHCP получен нормально, а значить и будущие виртуалки получать нормально адрес.
6. Создание первого нода k8s
    Далее я рассуждал как реализовать установку k8s внутри proxmox. Из сети я узнал что Kubernetes ставиться софтом на Ubuntu(самый популярный способ), но так как нужно несколько хостов(для распределения ролей мастер - рабочий), нужно было установка и настройка как минимум 2-3 хостов.
    Поэтому я решил просто создать 3 виртуалки с 3 похожими конфигурациями, чтоб kubectl исправно работала на всех трех.
    1. Установка ubuntu server на виртуалку
        1) Обновляем списки репозиториев, производим обновление всех пакетов в ОС, а также устанавливаем необходимые пакеты:
            apt update && apt -y upgrade && apt -y install apt-transport-https ca-certificates
        2) Отключаю swap(навсякий случай) через nano и #
            nano /etc/fstab
        3) ребут
        4) Установка k8s
            Скачиваю пак с k8s
            curl -LO "https://dl.k8s.io/release/$(curl -L -s https://dl.k8s.io/release/stable.txt)/bin/linux/amd64/kubectl"
        Устанавливаю k8s
            sudo install -o root -g root -m 0755 kubectl /usr/local/bin/kubectl
        Проверяю установку
            kubectl version --client
        5) Ставлю Cri-O, conteinerd не завелся нормально
        Устанавливаю зависимости для добавленных репозиториев
        apt-get update
        apt-get install -y software-properties-common curl
        Добавляют K8S репозиторий
            curl -fsSL https://pkgs.k8s.io/core:/stable:/v1.28/deb/Release.key |
                gpg --dearmor -o /etc/apt/keyrings/kubernetes-apt-keyring.gpg
            echo "deb [signed-by=/etc/apt/keyrings/kubernetes-apt-keyring.gpg] https://pkgs.k8s.io/core:/stable:/v1.28/deb/ /" |
                tee /etc/apt/sources.list.d/kubernetes.list
        Добавляю CRI-O репозиторий
            curl -fsSL https://pkgs.k8s.io/addons:/cri-o:/prerelease:/main/deb/Release.key |
                gpg --dearmor -o /etc/apt/keyrings/cri-o-apt-keyring.gpg
            echo "deb [signed-by=/etc/apt/keyrings/cri-o-apt-keyring.gpg] https://pkgs.k8s.io/addons:/cri-o:/prerelease:/main/deb/ /" |
                tee /etc/apt/sources.list.d/cri-o.list
        Устанавливаю kubectl
            apt-get update
            apt-get install -y cri-o kubelet kubeadm kubectl
        6) Инициализвация кластера k8s 
        kubeadm init
        (на этом моменте, при использовании conternerd, kubectl нормально не работал, уходил на ребут после секунд 10-15 после запуска, а также после перезагрузки conteinerd, проблема решилась при замене conteinerd на cri-o, kubectl запустился без проблем)
        7) Установка Flannel
        kubectl apply -f https://github.com/flannel-io/flannel/releases/latest/download/kube-flannel.yml
        8) Проверяю работоспособность kubectl

Копирование первого нода k8s для создания второго и третьего 
На основе первого нода я делаю 2 копии VM в Proxmox, меняю имена и настройки хоста так, чтоб в сети они не конфиликтовали(hostname, mac address и тд)

6. Установка Jenkins
Копирую файлы Jenkins с Github на мейн ноду k8s
    git clone https://github.com/scriptcamp/kubernetes-jenkins
Далее создаю файл deployment.yaml для деплоя Jenkins в K8S. Чтоб разместить Jenkins отдельно от других сервисов создаю namespace jenkins
    kubectl create namespace jenkins
Далее создаю манифест для создание СервиснойУчетки Jenkins в k8s
            <!-- ---
            apiVersion: rbac.authorization.k8s.io/v1
            kind: ClusterRole
            metadata:
            name: jenkins-admin
            rules:
            - apiGroups: [""]
                resources: ["*"]
                verbs: ["*"]
            ---
            apiVersion: v1
            kind: ServiceAccount
            metadata:
            name: jenkins-admin
            namespace: jenkins
            ---
            apiVersion: rbac.authorization.k8s.io/v1
            kind: ClusterRoleBinding
            metadata:
            name: jenkins-admin
            roleRef:
            apiGroup: rbac.authorization.k8s.io
            kind: ClusterRole
            name: jenkins-admin
            subjects:
            - kind: ServiceAccount
            name: jenkins-admin
            namespace: jenkins -->
Данный файл создает кластерную роль jenkins-admin, учетную запись службы jenkins-admin и привязывает ClusterRole к учетной записи службы.
Роль кластера jenkins-admin обладает всеми разрешениями для управления компонентами кластера. 
Далее применим данный манифест в кластере
    kubectl apply -f serviceAccount.yaml
Теперь создадим файл манифеста для создания образов для хранения файлов Jenkins
        <!-- kind: StorageClass
        apiVersion: storage.k8s.io/v1
        metadata:
        name: local-storage
        provisioner: kubernetes.io/no-provisioner
        volumeBindingMode: WaitForFirstConsumer
        ---
        apiVersion: v1
        kind: PersistentVolume
        metadata:
        name: jenkins-pv-volume
        labels:
            type: local
        spec:
        storageClassName: local-storage
        claimRef:
            name: jenkins-pv-claim
            namespace: jenkins
        capacity:
            storage: 10Gi
        accessModes:
            - ReadWriteOnce
        local:
            path: /mnt
        nodeAffinity:
            required:
            nodeSelectorTerms:
            - matchExpressions:
                - key: kubernetes.io/hostname
                operator: In
                values:
                - ubuntu-k8s-main
        ---
        apiVersion: v1
        kind: PersistentVolumeClaim
        metadata:
        name: jenkins-pv-claim
        namespace: jenkins
        spec:
        storageClassName: local-storage
        accessModes:
            - ReadWriteOnce
        resources:
            requests:
            storage: 3Gi -->
И теперь применим манифест чтоб для jenkins был уже готовые PVC и PV
    kubectl create -f volume.yaml
Далее созданим файл манифеста для создание уже основного деплоймета jenkins в K8S
        <!-- apiVersion: apps/v1
        kind: Deployment
        metadata:
        name: jenkins
        namespace: jenkins
        spec:
        replicas: 1
        selector:
            matchLabels:
            app: jenkins-server
        template:
            metadata:
            labels:
                app: jenkins-server
            spec:
            securityContext:
                    fsGroup: 1000
                    runAsUser: 1000
            serviceAccountName: jenkins-admin
            containers:
                - name: jenkins
                image: jenkins/jenkins:lts
                resources:
                    limits:
                    memory: "2Gi"
                    cpu: "1000m"
                    requests:
                    memory: "500Mi"
                    cpu: "500m"
                ports:
                    - name: httpport
                    containerPort: 8080
                    - name: jnlpport
                    containerPort: 50000
                livenessProbe:
                    httpGet:
                    path: "/login"
                    port: 8080
                    initialDelaySeconds: 90
                    periodSeconds: 10
                    timeoutSeconds: 5
                    failureThreshold: 5
                readinessProbe:
                    httpGet:
                    path: "/login"
                    port: 8080
                    initialDelaySeconds: 60
                    periodSeconds: 10
                    timeoutSeconds: 5
                    failureThreshold: 3
                volumeMounts:
                    - name: jenkins-data
                    mountPath: /var/jenkins_home
            volumes:
                - name: jenkins-data
                persistentVolumeClaim:
                    claimName: jenkins-pv-claim -->
И теперь применим манифест чтоб создался деплоймент Jenkins в k8s
    kubectl apply -f deployment.yaml
После этого проверим статус pods в namespace jenkins
    kubectl get deployments -n jenkins
Для получения доступа к самому Jenkins нужен сервис в k8s, и поэтому нужно создать еще один манифест для сервиса 
        <!-- apiVersion: v1
        kind: Service
        metadata:
        name: jenkins-service
        namespace: devops-tools
        annotations:
            prometheus.io/scrape: 'true'
            prometheus.io/path:   /
            prometheus.io/port:   '8080'
        spec:
        selector:
            app: jenkins-server
        type: NodePort
        ports:
            - port: 8080
            targetPort: 8080
            nodePort: 32000 -->
И применим данный манифест
    kubectl apply -f service.yaml
После этого jenkins будет доступен по данному адресу
    http://<node-ip>:32000
Для первого входа в веб-интерфейс необходимо достать пароль напрямую в k8s из jenkins используя следующую команду CLI.
    kubectl get pods --namespace=jenkin
Используя название модуля, вы можете получить логи, как показано ниже. Замените название модуля на свое собственное.
    kubectl logs jenkins-deployment-**********-**** --namespace=jenkins
Пароль будет в конце лога.
В качестве альтернативы вы можете запустить команду exec, чтобы получить пароль непосредственно из папки, как показано ниже.
    kubectl exec -it jenkins-deployment-**********-**** cat /var/jenkins_home/secrets/initialAdminPassword -n jenkins
По поводу пароль, из-за того что я криво созданил пароль и не поставил другой, пришлось сносить jenkins с ставить его по новой. И во второй раз я поставил нормальный пароль.

B

Проксирование Next js с помощью nginx
Размещаем nginx в k8s, далее в конфиге меняем параметры для переброса с 80 на 3000 запросы через прокси nginx
    location / {
        proxy_pass  http://localhost:3000;
        proxy_set_header Host   $host;
        proxy_set_header X-Real-IP $remote_addr;
    }