import java.io.IOException;
import java.util.Arrays;
import java.util.Iterator;
import java.util.LinkedList;
import java.util.List;
import java.util.StringTokenizer;

import org.apache.hadoop.conf.Configuration;
import org.apache.hadoop.fs.Path;
import org.apache.hadoop.io.IntWritable;
import org.apache.hadoop.io.LongWritable;
import org.apache.hadoop.io.Text;
import org.apache.hadoop.mapred.JobClient;
import org.apache.hadoop.mapred.JobConf;
import org.apache.hadoop.mapred.MapReduceBase;
import org.apache.hadoop.mapred.OutputCollector;
import org.apache.hadoop.mapred.Reporter;
import org.apache.hadoop.mapreduce.Job;
import org.apache.hadoop.mapreduce.Mapper;
import org.apache.hadoop.mapreduce.Reducer;
import org.apache.hadoop.mapreduce.lib.input.FileInputFormat;
import org.apache.hadoop.mapreduce.lib.output.FileOutputFormat;

public class CommonFriends {

	public static class Map extends Mapper<LongWritable, Text, Text, Text>{
    public void map(LongWritable key, Text value, OutputCollector<Text, Text> output, Reporter reporter)
            throws IOException{
            StringTokenizer tokenizer = new StringTokenizer(value.toString(), "\n");
            String line = null;
            String[] lineArray = null;
            String[] friendArray = null;
            String[] tempArray = null;
            while(tokenizer.hasMoreTokens()){
                    line = tokenizer.nextToken();
                    lineArray = line.split(" : ");
                    friendArray = lineArray[1].split(" ");
                    tempArray = new String[2];
                    for(int i = 0; i < friendArray.length; i++){
                            tempArray[0] = friendArray[i];
                            tempArray[1] = lineArray[0];
                            Arrays.sort(tempArray);
                            output.collect(new Text(tempArray[0] + " " + tempArray[1]), new Text(lineArray[1]));
                    }
            }
    }
}

	public static class Reduce extends Reducer<Text, Text, Text, Text>{
    public void reduce(Text key, Iterator<Text> values,
    OutputCollector<Text, Text> output, Reporter reporter) throws IOException{
            Text[] texts = new Text[2];
            int index = 0;
            while(values.hasNext()){
                    texts[index++] = new Text(values.next());
            }
            String[] list1 = texts[0].toString().split(" ");
            String[] list2 = texts[1].toString().split(" ");
            List<String> list = new LinkedList<String>();
            for(String friend1 : list1){
                    for(String friend2 : list2){
                            if(friend1.equals(friend2)){
                                    list.add(friend1);
                            }
                    }
            }
            StringBuffer sb = new StringBuffer();
            for(int i = 0; i < list.size(); i++){
                    sb.append(list.get(i));
                    if(i != list.size() - 1)
                            sb.append(" ");
            }
            output.collect(key, new Text(sb.toString()));
    }
}
	 
		 public static void main(String[] args) throws Exception{
			 Configuration conf = new Configuration();
		        
		        Job job = new Job(conf, "CommonFriends");
		        job.setJarByClass(CommonFriends.class);
		        job.setMapperClass(Map.class);
		        job.setReducerClass(Reduce.class);
		        
		        job.setOutputKeyClass(LongWritable.class);

		        job.setOutputValueClass(Text.class);
		        // set the HDFS path of the input data
		        //FileInputFormat.addInputPath(job, new Path("Input"));
		        FileInputFormat.addInputPath(job, new Path(args[0]));
		        FileOutputFormat.setOutputPath(job, new Path(args[1]));
		        // set the HDFS path for the output
		       // FileOutputFormat.setOutputPath(job, new Path("Output"));
		        // Wait till job completion
		        System.exit(job.waitForCompletion(true) ? 0 : 1);
 }
}