import org.apache.spark.sql.SparkSession
import org.graphframes.GraphFrame
import org.apache.spark.sql._
import org.apache.spark.sql.functions._
import org.graphframes._



object SparkGraphFrameAdd {
  def main(args: Array[String]) {
    System.setProperty("hadoop.home.dir", "C:\\winutils")
    val spark = SparkSession
      .builder()
      .appName("Spark SQL basic example")
      .config("spark.master", "local")
      .getOrCreate()



    var trip = spark.read.format("csv").option("header", "true").load("/home/gulnoza/Downloads/Sourcecode2/SparkGraphframe/201508_trip_data.csv").toDF();
    var station = spark.read.format("csv").option("header", "true").load("/home/gulnoza/Downloads/Sourcecode2/SparkGraphframe/201508_station_data.csv").toDF();

    trip.printSchema()
    station.printSchema()



    trip.createOrReplaceTempView("Trips")

    station.createOrReplaceTempView("Stations")


    val nstation = spark.sql("select * from Stations")

    val ntrips = spark.sql("select * from Trips")

    val stationVertices = nstation
      .withColumnRenamed("name", "id")
      .distinct()

    val tripEdges = ntrips
      .withColumnRenamed("Start Station", "src")
      .withColumnRenamed("End Station", "dst")


    val stationGraph = GraphFrame(stationVertices, tripEdges)

    tripEdges.cache()
    stationVertices.cache()

    // Task 2 - triangle count

    val stationTraingleCount = stationGraph.triangleCount.run()
    stationTraingleCount.select("id","count").show()


    // Task 3 - shortest path
    val shortPath = stationGraph.shortestPaths.landmarks(Seq("St James Park","Park at Olive")).run
    shortPath.show()

    //Task 4 - Page Rank

    val stationPageRank = stationGraph.pageRank.resetProbability(0.20).tol(0.01).run()
    stationPageRank.vertices.show()
    stationPageRank.edges.show()

    //Task 5 - Saving to File
    stationGraph.vertices.write.csv("/home/gulnoza/Downloads/Sourcecode2/vertecies")

    stationGraph.edges.write.csv("/home/gulnoza/Downloads/Sourcecode2/edges")

  }
}
