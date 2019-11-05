import org.apache.spark.SparkConf
import org.apache.spark.streaming.{Seconds, StreamingContext}

object StreamLog {
  def main(args: Array[String]): Unit = {

    // Create the context with a 1 second batch size
    val conf = new SparkConf().setMaster("local[2]").setAppName("LogStream")
    val ssc = new StreamingContext(conf, Seconds(3))
    val data = ssc.textFileStream("/home/gulnoza/Downloads/SparkStreamingScala/log")

    //val lines = ssc.socketTextStream(args(0), args(1).toInt, StorageLevel.MEMORY_AND_DISK_SER)
    //val words = lines.flatMap(_.split(" "))
    val wc = data.flatMap(_.split(" ")).map(x => (x, 1)).reduceByKey(_ + _)
    wc.print()
    ssc.start()
    ssc.awaitTermination()
  }
}
