import org.apache.spark.sql.SparkSession
import org.graphframes.GraphFrame
import org.apache.spark.sql._
import org.apache.spark.sql.functions._
import org.graphframes._



object SparkGraphFrame {
  def main(args: Array[String]) {
    System.setProperty("hadoop.home.dir", "C:\\winutils")
    val spark = SparkSession
      .builder()
      .appName("Spark SQL basic example")
      .config("spark.master", "local")
      .getOrCreate()



    var df1 = spark.read.format("csv").option("header", "true").load("/home/gulnoza/Downloads/Sourcecode2/SparkGraphframe/201508_trip_data.csv").toDF();
    var station = spark.read.format("csv").option("header", "true").load("/home/gulnoza/Downloads/Sourcecode2/SparkGraphframe/201508_station_data.csv").toDF();
    // TASK 1
    var df = spark.read.format("csv").option("header", "true").load("/home/gulnoza/Downloads/Sourcecode2/SparkGraphframe/201508_trip_data.csv");
    df.printSchema();
    df.toDF().show();

    //TASK 2
    import org.apache.spark.sql.functions.{concat,lit}
    df.select(concat(df("Bike #"), lit(" "), df("Zip Code"))).toDF().show(false);

    //TASK 3-4-5
    var distinct = df1.distinct().show();
    var tripVerticices = df.withColumnRenamed("Duration","Path").distinct().show();
    var edges = df1.withColumnRenamed("End Terminal","dst").withColumnRenamed("Start Terminal","src").withColumnRenamed("Subscriber Type","relationship");
    val g = GraphFrame(station.withColumnRenamed("station_id","id"), edges);
    g.vertices.show(false);
    g.edges.show(false);

   g.inDegrees.show(false);
    g.outDegrees.show(false);

    val motifs = g.find("(50)-[e]->(70); (70)-[e2]->(501)").show(false)
    /*val input = spark.createDataFrame(List(
      ("a", "Alice", 34),
      ("b", "Bob", 36),
      ("c", "Charlie", 30),
      ("d", "David", 29),
      ("e", "Esther", 32),
      ("f", "Fanny", 36),
      ("g", "Gabby", 60)
    )).toDF("id", "name", "age")
    val output = spark.createDataFrame(List(
      ("a", "b", "friend"),
      ("b", "c", "follow"),
      ("c", "b", "follow"),
      ("f", "c", "follow"),
      ("e", "f", "follow"),
      ("e", "d", "friend"),
      ("d", "a", "friend"),
      ("a", "e", "friend")
    )).toDF("src", "dst", "relationship")

    val g = GraphFrame(input,output)
    g.vertices.show()
    g.edges.show()*/
  }
}
