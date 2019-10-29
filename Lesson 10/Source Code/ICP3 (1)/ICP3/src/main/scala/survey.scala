import org.apache.spark._
import org.apache.spark.{SparkConf, SparkContext}
import org.apache.spark.sql.SparkSession
import org.apache.spark.sql.functions._



object survey {



  def main(args: Array[String]) {
    val spark = SparkSession
      .builder()
      .appName("icp3")
      .config("spark.master", "local")
      .getOrCreate()



    //TASK 1-1
    val sc = SparkContext.getOrCreate() // Creating spark context object
    val sqlContext = new org.apache.spark.sql.SQLContext(sc)
    val df = sqlContext.read.format("csv").option("header", "true").load("/home/gulnoza/IdeaProjects/ICP3/input/survey.csv")
    df.show()

    //TASK 1-2
    df.write.format("com.databricks.spark.csv").save("/home/gulnoza/IdeaProjects/ICP3/output")

    // TASK 1-3
    df.groupBy("Age", "Gender", "Country").count().show()

    // TASK 1-4

    df.select("Timestamp", "Age", "Gender", "Country", "state").show()

    df.select("Timestamp", "self_employed", "family_history", "treatment", "no_employees", "work_interfere").show()

    df.select("Timestamp", "Age", "Gender", "Country", "state").join(df.select("Timestamp", "self_employed", "family_history", "treatment", "no_employees", "work_interfere"), "Timestamp").show()


    //TASK 1-5
    df.groupBy("treatment").count().show();

    //TASK 2-1


    df.groupBy("Gender").agg(min("Age"), count("state")).show()
    df.groupBy("State").agg(sum("Age").as("AgeSum"), max("Age")).show()

    //TASK 2-2
    print(df.take(13).last)


    import spark.implicits._

//BONUS
    def parseLine(line: String):(String,String,String)={
      val rows = line.split(",")
      val age = rows(2).toString
      val state = rows(5).toString
      val gender = rows(3).toString
      (age,state,gender)
    }

    val bonus = sc.textFile("/home/gulnoza/IdeaProjects/ICP3/input/survey.csv")
    val result = bonus.map(parseLine).toDF()
    result.show()


  }


}
