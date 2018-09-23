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



##api
### 索引 


    创建
    put /test_index
    获取所有的索引
    get _cat/indices
    删除
    delete /test_index

### 文档

    创建
    put /index/type/id  (/test_index/doc/1) 后期type会删除
    不指定type和id 会自动生成 id或type
    查询
    get /index/type/id (/test_index/doc/1)
        /index/type/_search 
        //参数
        {
            "query":{
                "term":{
                    "_id":"1"
                }
            }
        }
    修改
    删除

    批量操作
    覆盖创建
    post _bulk
    {
        "index":{
            "_index":"_test_index",
            "_type":"doc",
            "_id":"3"
        }
    }
    {
        name:chmi3,
        age:25
    }

    //删除
    {
        "delete":{
            "_index":"test_index",
            "_type":"doc",
            "id":"1"
        }
    }
    //更新
    {
        "update":{
            "_index":"test_index",
            "_type":"doc",
            "id":"1"
        }
    }
    {
        "doc":{
            "age":"99"
        }
    }


    批量查询
    get /_mget



## 索引与分词

### 索引（关键词，快速查找内容

### 正排索引 （mysql）
    id找文章


### 倒排索引（搜索引擎）
    文章找id

#### 1.单词词典
    采用技术 B+树的方式
#### 2.倒排列表
    存储各种关键词的关联性列表（id,频率，位置，偏移）

##### 分词器
    每个分词器的流程（3步））
    1.
    2.
    3
    测试分词的api（测试一个单词的分词结果s）
    post  _analyze
    指定analyzer 分词器
    {
        "analyzer":"standard",//指定分词器
        "text":"hello world"//测试文本
    }
    指定索引 分词器
    post test_index/_analyze
    {
        "analyzer":"standard",//指定分词器
        "text":"hello world"//测试文本
    }
    自定义分词器
    POST _analyze
    {
        "tokenizer": "standard",
        "filter": ["lowercase"],
        "text": ["Hello World"]
    }

    7中
    1 standard analyer
    按词切分 ，默认将所有转换为小写
    tokenizer standard
    token filter :standard,lowercase

    2 simple analyer
    去掉非字母的
    有转换为小写
    3 whitespace 

    4 stop

    5 keyword

    6 pattern \W 默认使用非字符进行分词

    7 languge (不同语言)

    *** 中文分词
        1. ik
        2. jieba
        3. hanlp(智能学习)
        4. THULAC
    1. 自定义分词（character filter） char_filter
         自定义 character filters 和tokenizer 和 token filter 这三个过程中任意一个
        1. character filters 将输入内容转换为指定的文本
            1. html_strip
        2. tokenizer 将原始文本按照一定规则分为单词
            1. standard 
            2. letter
            3. whitespace 。。。。
        3. token filter 将输出的单词进行增删改

        POST _analyze
        {
            //指定 文本处理方式
            "char_filter": ["html_strip"], 
            //指定 分词的方式
            "tokenizer": "standard",
            //指定 分词的类型
            "filter": ["lowercase"],
            "text": ["<p>Hello World</p>"]
        }
    2. 为一个索引自定义一个分词器
        1. PUT test_index
            {
                "settings":{
                    "analysis":{
                        analyzer：{
                            my_analyzer_name：{
                                //指定 文本处理方式
                                "char_filter":[], 
                                //指定 分词的方式
                                "tokenizer": [], 
                                //指定 分词的类型
                                "filter": [], 
                                //引用之前自定义的
                                analyzer:[]
                            }
                        }
                    }
                }
            }

###两种方式结合实现一个完整的搜索过程
    倒排索引快速找到关联的id，然后通过id将关联的内容完全显示出来，也就完成了一次搜索过程
所以倒排索引就是搜索引擎的关键。


### mapping
    定义字段的名称 类型 倒排索引相关的配置

    PUT my_index 
    {
    "mappings": {
        "doc": { 
        "properties": { 
            "title":    { "type": "text"  }, 
            "name":     { "type": "text"  }, 
            "age":      { "type": "integer" },  
            "created":  {
            "type":   "date", 
            "format": "strict_date_optional_time||epoch_millis"
            }
        }
        }
    }
    }

    1.index : bool default:true 控制是否做为索引
    2.copy_to: 将中复制到指定的字段
    3.index_options(4中 默认加入越来越多的内容)
        1. 2. 3. 4
    4.null_value:为null的时候设置默认值 


#  cerebro es集群管理

bin/cerebro -Dhttp.port=1234 -Dhttp.address=127.0.0.1

bin/elasticsearch -Ehttp.port=9200 -Epath.data=node1
bin/elasticsearch -Ecluster.name=my_cluster -Epath.data=my_cluster_node1 -Enode.name=node1 -Ehttp.port=9200
bin/elasticsearch -Ecluster.name=my_cluster -Epath.data=my_cluster_node2 -Enode.name=node2 -Ehttp.port=8200
bin/elasticsearch -Ecluster.name=my_cluster -Epath.data=my_cluster_node3 -Enode.name=node3 -Ehttp.port=7200