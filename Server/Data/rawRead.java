
import java.io.*;
import java.util.zip.*;
import com.google.gson.*;
import org.json.simple.*;
import org.json.simple.JSONArray;
import org.json.simple.JSONObject; //Json.simple
import org.json.simple.parser.JSONParser;

import javax.management.ConstructorParameters;

import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Comparator;
import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.Stream;

public class rawRead{

    //List all directories (this includes all sub directories)
    public static List<Path> listDirs(Path path) throws IOException {
        List<Path> res;
        try (Stream<Path> walk = Files.walk(path)) {
            res = walk.filter(Files::isDirectory).collect(Collectors.toList());
        }
        return res;
    }

    //List all files (this includes all files inside sub directories)
    public static List<Path> listFiles(Path path) throws IOException {
        List<Path> res;
        try (Stream<Path> walk = Files.walk(path)) {
            res = walk.filter(Files::isRegularFile).collect(Collectors.toList());
        }
        return res;
    }

    //Unzip all files in subdirs
    public static void unzipFiles(Path inputPath) throws IOException {
        List<Path> paths = listFiles(inputPath);
        paths.forEach(f -> {
            //System.out.println("Converting " + f.getFileName() + " :" + f.toFile().getName().endsWith(".zip"));
            if(f.toFile().getName().endsWith(".zip") || f.toFile().getName().endsWith(".rar")){ //if file is zip or rar
                try{
                    unzip(f, inputPath.toString());
                    deleteZip(f.toFile());
                }
                catch (FileNotFoundException fileErr){
                    System.out.println("Error while unzipping single item: " + fileErr);
                }
                catch(IOException IOerr){
                    System.out.println("Error while unzipping single item: " + IOerr);
                }
            }
        });
        System.out.println("Zip to folder conversion completed.");
    }

    //unzip single item
    public static void unzip(Path zipFile, String basePath) throws FileNotFoundException,IOException{
        byte[] buffer = new byte[1024];

        String sZipfile = zipFile.getFileName().toString();
        String sZip = sZipfile.substring(0, sZipfile.length()-4); //remove .zip from filename

        //create folder if !exist
        String outputFolder = basePath + File.separator + sZip;
        File folder = new File(outputFolder);
        if(!folder.exists()){
            folder.mkdir();
        }

        ZipInputStream zis = new ZipInputStream(new FileInputStream(zipFile.toString())); //zip file to be unzipped
        ZipEntry ze = zis.getNextEntry(); //entries in zip file

        //while entries exist
        while(ze != null) {
            String eName = ze.getName(); //entries name
            File f = new File(outputFolder + File.separator + eName);

            //handling filenotfoundexception on compressed folders
            new File(f.getParent()).mkdirs();
            
            //file out handling
            FileOutputStream fos = new FileOutputStream(f);
            int len;
            while ((len = zis.read(buffer)) > 0) {
                fos.write(buffer, 0, len);
            }
            fos.close();
            ze = zis.getNextEntry();
        }
        zis.closeEntry();
        zis.close();

    }

    //Concat .DAT files in single year into one JSON
    public static void datToJson(List<Path> files, String outputFolder, String outputfilename) { 
        JSONObject yearJson = new JSONObject();
        JSONArray year = new JSONArray();
        //List<JSONObject> yearJson = new ArrayList<>();
        files.forEach(file -> {
            if(!file.getFileName().toString().equals("creative_commons.txt")){ //skip junk file
                try(Stream<String> stream = Files.lines(file)){
                    stream.forEach(line -> {
                        JSONObject lineJson = null;
                        if(line.length() != 0){
                            lineJson = lineToJSON(line);
                        }
                        if(lineJson != null){
                            year.add(lineJson);
                        }
                    });
                }
                catch(IOException IOerr){   
                    System.out.println("Error accessing .dat file: " + IOerr);
                }
            }
        });
        //TODO: output final json object into file out
        yearJson.put("Entries",year);
        String pathout = outputFolder + File.separator;
        String outfile = outputfilename + ".json";

        try{
            File f = new File(pathout + outfile);
            FileOutputStream fos = new FileOutputStream(f);
            if (!f.exists()) {
				f.createNewFile();
			}
            //handling filenotfoundexception on compressed folders
            new File(f.getParent()).mkdirs();
            //get bytes to put into file
            String buff = yearJson.toJSONString();
            byte[] bufferstream = buff.getBytes();
            //file out handling
            fos.write(bufferstream);
            fos.flush();
            fos.close();
            System.out.println(outfile + " completed write out");
        }

        catch (Exception err){
            System.out.println("Json write out exception: " + err);
            err.printStackTrace();
        }
    }

    //String manipulation per line into -> json object
    public static JSONObject lineToJSON(String line){
        String[] spliced = line.split(";");
        //We only want "B" records
        //anything else returns null
        if(spliced.length != 0){
            if(spliced[0].equals("B")){
                JSONObject lineJson = new JSONObject();
                //store data in json object
                //fields follow: https://www.valuergeneral.nsw.gov.au/__data/assets/pdf_file/0016/216403/Property_Sales_Data_File_-_Data_Elements_V3.pdf 
                lineJson.put("D_Code", spliced[1]); //District Code
                lineJson.put("SL_Num", spliced[19]); //Strata lot number
                lineJson.put("P_U_Num", spliced[6]); //Property Unit number
                lineJson.put("P_H_Num", spliced[7]); //Property House number
                lineJson.put("P_S_Name", spliced[8]); //Property Street name
                lineJson.put("P_Sub", spliced[9]);  //Property suburb
                lineJson.put("P_Code", spliced[10]); //Post code
                lineJson.put("P_Area", spliced[11]); //Area of property
                lineJson.put("Area_Type", spliced[12]); //Area Type Metres/Hectares
                lineJson.put("P_Purp", spliced[18]); //Property Purpose
                lineJson.put("C_Date", lineDate(spliced[13])); //Contract Date
                lineJson.put("S_Date", lineDate(spliced[14])); //Settlement Date
                lineJson.put("P_Price", spliced[15]); //Purchase Price
                lineJson.put("D_num", spliced[23]); //unique identifier for each json object
                return lineJson;
            }
        }
        return null;
    }

    //Helper method for date conversion
    public static Date lineDateUNUSED(String line){ //Date object messes with jsonsimple parser
        if(line.length()>0){
            String year = line.substring(0,4);
            String month = line.substring(4,6);
            String day = line.substring(6,8);
            String combined = year + "-" + month + "-" + day;
            SimpleDateFormat simpleDateObj = new SimpleDateFormat("yyyy-MM-dd");
            Date dateObj;
            try{
                dateObj = simpleDateObj.parse(combined);
                return dateObj;
            } catch (ParseException e){
                System.out.println("Parse error: " + e);
            }
        }
        return null;
    }

    public static String lineDate(String line){ //Date object messes with jsonsimple parser
        if(line.length()>0){
            String year = line.substring(0,4);
            String month = line.substring(4,6);
            String day = line.substring(6,8);
            String combined = year + "-" + month + "-" + day;
            return combined;
        }
        return "";
    }

    public static void deleteZip (File file){
        file.delete();
        System.out.println("Deleting   " + file.getName() + " :true");
    }

    //Delete all sub directories then delete top level directory
    public static void deleteDir(File file){
        deletesubDir(file);
        file.delete();
        System.out.println("Deletion of " + file.getName() + " Complete");
    }

    //recursive deletion function to delete all subdirectories
    public static void deletesubDir(File file){
        for(File subfile : file.listFiles()){
            //if subfolder delete it
            if(subfile.isDirectory()) {
                deletesubDir(subfile);
            }
            subfile.delete();
            System.out.println("----" + subfile.getName() + ":deleted");
        }
    }



    //Concat All years into one single file
    public static void concatJSON(){

        //TODO
    }

    //Read JSON from file
    public static void readJSON(String file){
        JSONParser parser = new JSONParser();
        JSONObject jsonObject;
        try(FileReader reader = new FileReader(file)){
            jsonObject = (JSONObject) parser.parse(reader);
            System.out.println(jsonObject);
        }
        catch(FileNotFoundException e){
            e.printStackTrace();
        }
        catch(IOException e){
            e.printStackTrace();
        }
        catch (org.json.simple.parser.ParseException e) {
            e.printStackTrace();
        }
    }

    //convert all.dat files into years
    public static void bulkConversion(Path dataFolderPath, Path jsonOutputFolderPath){// params:(input,output)
        //Loop through bulkdata folders
        try(Stream<Path> dataFolders = Files.list(dataFolderPath)) {
            dataFolders.forEach(folder -> {
            //check each folder if json data already exists
            String folderName = folder.getFileName().toString();
            File file = new File(jsonOutputFolderPath + File.separator + folderName + "_data.json");
            System.out.println("Folder is: " + folderName);
            System.out.println(folderName + " Json file exists: " + file.exists());
                //if json data does not exist for that folder go through unzip conversion
                if(!file.exists()){
                    try {
                        System.out.println("Unzipping all zipped files");
                        unzipFiles(folder);
                        System.out.println("Converting .dat to Json");
                        List<Path> folderFiles = listFiles(folder);
                        datToJson(folderFiles, jsonOutputFolderPath.toString(), folderName + "_data"); //then output json file
                    } catch (IOException e) {
                        e.printStackTrace();
                        System.out.println("Error in bulkConversion: Looping through " + folderName + " files");
                    }
                }
            });
        }
        catch (IOException err){
            err.printStackTrace();
            System.out.println("Error in bulkConversion: Looping through folders");
        }
        System.out.println("Bulk conversion completed");
    }

    public static void main(String[] args) throws IOException{
        String sMainPath = new File("").getAbsolutePath();
        String sDataPath = sMainPath + "/Server/Data";
        String sJsonPath = sDataPath + "/json_data";
        String sRawDataPath = sDataPath + "/Raw_data";
        String sRawAnnualPath = sRawDataPath + "/Annual_data";
        String sJsonAnnualPath = sJsonPath + "/Annual_data";
        String sJsonSuburbPath = sJsonPath + "/Suburb_data";
        Path pRawAnnualpath = Paths.get(sRawAnnualPath);
        Path pJsonAnnualPath = Paths.get(sJsonAnnualPath);
        bulkConversion(pRawAnnualpath, pJsonAnnualPath);
    }//END OF MAIN

}//END OF CLASS
