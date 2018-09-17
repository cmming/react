## 快速启动多个节点

bin/elasticsearch  

bin/elasticsearch -Ehttp.port=8200 -Epath.data=node2
bin/elasticsearch -Ehttp.port=7200 -Epath.data=node3

url/_cat/nodes

http://127.0.0.1:8200/_cat/nodes?v  看集群版本

http://127.0.0.1:9200/_cluster/stats 看集群的详情


bin/kibana



使用filebeat 进行nginx 的日志收集

本机的日志位置
/Applications/MAMP/logs/nginx_access.log

head -n 2 /Applications/MAMP/logs/nginx_access.log



head -n 2 /Applications/MAMP/logs/nginx_access.log| ./filebeat -e -c nginx.yml



bin/elasticsearch -Ecluster.name=sniff_search -Ehttp.port=8200 -Epath.data=sniff_search
bin/kibana -e http://127.0.0.1:8200 -p 8601