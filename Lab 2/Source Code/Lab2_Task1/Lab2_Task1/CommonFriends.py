import os

os.environ["SPARK_HOME"] = "/home/gulnoza/Downloads/spark-2.3.0-bin-hadoop2.6"
os.environ["HADOOP_HOME"] = "/usr/local/hadoop/hadoop-2.6.0/bin"
from operator import add
from pyspark import SparkContext


def map_friends(value):
    value = value.split(" ")
    user = value[0]
    friends = value[1]
    keys = []

    for friend in friends:
        keys.append((''.join(sorted(user + friend)), friends.replace(friend, "")))

    return keys


def reduce_firneds(key, value):
    reducer = ''
    for friend in key:
        if friend in value:
            reducer += friend
    return reducer


if __name__ == "__main__":
    sc = SparkContext.getOrCreate()
    Lines = sc.textFile("facebook_combined.txt", 1)
    Line = Lines.flatMap(map_friends)
    Commonfriends = Line.reduceByKey(reduce_firneds)
    Commonfriends.coalesce(1).saveAsTextFile("Output")
sc.stop()