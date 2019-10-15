name := "ICP1"

version := "0.1"

scalaVersion := "2.11.6"

//libraryDependencies ++= {
  //val sparkVer = "2.1.0"
  //Seq(
    //"org.apache.spark" %% "spark-core" % sparkVer % "provided" withSources()
  //)
//}
libraryDependencies += "org.apache.spark" % "spark-sql_2.11" % "2.2.0"
