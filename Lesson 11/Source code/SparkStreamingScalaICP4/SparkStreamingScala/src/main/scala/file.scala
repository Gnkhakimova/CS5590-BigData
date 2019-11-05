

import java.io._
import scala.io.Source

object file {
  def main(args: Array[String]): Unit = {
    var a = 1

    val filename = Source.fromFile("/home/gulnoza/Downloads/SparkStreamingScala/lorem.txt")
      while(a<=5){
        val file = "/home/gulnoza/Downloads/SparkStreamingScala/log/log" + a + ".txt"
        val writer = new BufferedWriter(new OutputStreamWriter(new FileOutputStream(file)))
        var buffer = filename.getLines()
        var nextlines = buffer.next() + "\n" + buffer.next() + "\n" + buffer.next() + "\n" + buffer.next() + "\n"
          writer.write(nextlines + "\n")  // however you want to format it

        writer.close()
        a = a+1;
        Thread.sleep(4000)
      }

  }

}
