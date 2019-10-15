import org.apache.spark.{SparkConf, SparkContext}

object SecondarySorting {
  def main(args: Array[String]) {
    val conf = new SparkConf().setAppName("Spark - Secondary Sort").setMaster("local")
    val sc = new SparkContext(conf)

    val personRDD = sc.textFile("/home/gulnoza/IdeaProjects/ICP1/resource/input1")
    val pairsRDD = personRDD.map(_.split(",")).map { k => (k(0), k(1)) }

    val numReducers = 2;

    val listRDD = pairsRDD.groupByKey(numReducers).mapValues(iter => iter.toList.sortBy(r => r))

    val resultRDD = listRDD.flatMap {
      case (label, list) => {
        list.map((label, _))
      }
    }

    resultRDD.saveAsTextFile("/home/gulnoza/IdeaProjects/ICP1/resource/output1")
  }
}
