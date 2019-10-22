import org.apache.spark.{SparkConf, SparkContext}

object icp2 {
  val conf = new SparkConf()
  conf.setMaster("local").setAppName("jsonfile")

  val sc = new SparkContext(conf)

  // recursive merge of 2 sorted lists
  def merge(left: List[Int], right: List[Int]): List[Int] =
    (left, right) match {
      case (left, Nil) => left
      case (Nil, right) => right
      case (leftHead :: leftTail, rightHead :: rightTail) =>
        if (leftHead < rightHead) leftHead :: merge(leftTail, right)
        else rightHead :: merge(left, rightTail)
    }

  def mergeSort(list: List[Int]): List[Int] = {
    val n = list.length / 2
    if (n == 0) list // i.e. if list is empty or single value, nosorting  needed
    else {
      val (left, right) = list.splitAt(n)
      merge(mergeSort(left), mergeSort(right))
    }
  }

  def main(args: Array[String]) {
    val data = List(33, 44, 22, -10, 99)
    val newData = sc.parallelize(mergeSort(data))
    //> res0: List[Int] = List(-10, 22, 33, 44, 99)
    println(123)
    for (x <- newData) {
      print(x)
      print(",")
    }

  }
}
