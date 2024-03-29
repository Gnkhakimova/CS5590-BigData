import org.apache.spark.{SparkConf, SparkContext}

//import org.apache.spark.sql._
//import org.apache.spark.sql.SQLContext._
//import org.apache.spark.sql.hive.HiveContext

object WordCount {

  def main(args: Array[String]) {
    val conf = new SparkConf().setAppName("WordCount").setMaster("local")
    // Create a Scala Spark Context.
    val sc = new SparkContext(conf)
    // Load our input data.
    val input =  sc.textFile("/home/gulnoza/IdeaProjects/ICP1/resource/input")
    // Split up into words.
    val words = input.flatMap(line => line.split(" "))
    // Transform into word and count.
    val counts = words.map(word => (word, 1)).reduceByKey{case (x, y) => x + y}
    // Save the word count back out to a text file, causing evaluation.
    counts.saveAsTextFile("/home/gulnoza/IdeaProjects/ICP1/resource/output")
  }
}
