## 镜像 image
    搜索镜像
    安装镜像
    删除镜像
    导出镜像
    导出镜像
    修改镜像名称
    docker tag imageBeforeName imageNewName

## 容器
    启动容器
    docker run -it -p 9000:8080 -p 9001:8085 -v /home/project:soft --privileged --name myjava docker.io/java bash 

    暂停
    docker pause myjava

    恢复运行 相当于保持状态？？
    docker unpause myjava

    关闭 停止运行（exit）
    docker stop myjava

    开启
    docker start -i  myjava

    删除

    docker rm containerName

    所有的容器列表
    docker ps -a


## 网络
    创建网络1
    docker network create --subnet=172.18.0.0/24 net1
    指定网段
    docker network create net1
    显示网路详情
    docker network inspect net1
    删除网路详情
    docker network rm net1

##  数据卷

docker volume create v1
docker inspect v1 
docker volume rm v1 

docker volume create --name v1
   docker volume create --name v2
   docker volume create --name v3
   docker volume create --name v4
   docker volume create --name v5


## 使用pxc 搭建mysql 集群
    //后台运行 -p 
    #创建第1个MySQL节点
   docker run -d -p 3306:3306 -e MYSQL_ROOT_PASSWORD=abc123456 -e CLUSTER_NAME=PXC -e XTRABACKUP_PASSWORD=abc123456 -v v1:/var/lib/mysql -v backup:/data --privileged --name=node1 --net=net1 --ip 172.18.0.2 pxc
   #创建第2个MySQL节点
   docker run -d -p 3307:3306 -e MYSQL_ROOT_PASSWORD=abc123456 -e CLUSTER_NAME=PXC -e XTRABACKUP_PASSWORD=abc123456 -e CLUSTER_JOIN=node1 -v v2:/var/lib/mysql -v backup:/data --privileged --name=node2 --net=net1 --ip 172.18.0.3 pxc
   #创建第3个MySQL节点
   docker run -d -p 3308:3306 -e MYSQL_ROOT_PASSWORD=abc123456 -e CLUSTER_NAME=PXC -e XTRABACKUP_PASSWORD=abc123456 -e CLUSTER_JOIN=node1 -v v3:/var/lib/mysql --privileged --name=node3 --net=net1 --ip 172.18.0.4 pxc
   #创建第4个MySQL节点
   docker run -d -p 3309:3306 -e MYSQL_ROOT_PASSWORD=abc123456 -e CLUSTER_NAME=PXC -e XTRABACKUP_PASSWORD=abc123456 -e CLUSTER_JOIN=node1 -v v4:/var/lib/mysql --privileged --name=node4 --net=net1 --ip 172.18.0.5 pxc
   #创建第5个MySQL节点
   docker run -d -p 3310:3306 -e MYSQL_ROOT_PASSWORD=abc123456 -e CLUSTER_NAME=PXC -e XTRABACKUP_PASSWORD=abc123456 -e CLUSTER_JOIN=node1 -v v5:/var/lib/mysql -v backup:/data --privileged --name=node5 --net=net1 --ip 172.18.0.6 pxc

    docker run -d -p 3306:3306 
    -e MYSQL_ROOT_PASSWORD=abc123456 
    -e CLUSTER_NAME=PXC 
    -e XTRABACKUP_PASSWORD=abc123456 
    -v v1:/var/lib/mysql -v 
    backup:/data --privileged --name=node1 --net=net1 --ip 172.18.0.2 pxc

## 使用 haproxy

    docker pull haproxy

11. 宿主机安装Keepalived，实现双击热备x
#宿主机执行安装Keepalived
    yum -y install keepalived
    #修改Keepalived配置文件
    vi /etc/keepalived/keepalived.conf
    #启动Keepalived
    service keepalived start