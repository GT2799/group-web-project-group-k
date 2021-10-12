# Real Estate Data Map App
### Purpose
To provide an easy to use platform where users can get an informed idea of individual housing prices of properties within Sydney.
Users are able to click on different properties on the map and get the respective sales information.

### Users
Our target demographic is mostly NSW first home buyers where they can use a simple straightforward and interactive app that can give them the pricing history and time between sales on various properties.

### Project Milestones:
+ Week 9:
    + **DONE** React Skeleton Implemented
    + **DONE** Basic Website Front-End Structure
    + **DONE** Google Maps API Embedded
    + **DONE** Google Maps API connection with Front-End components

+ Week 10:
    + **UNFINISHED** Back End Implementation
    + **DONE** Data source Implementation: Bulk Data Clean up or Domain API Implementation
    + **UNFINISHED** API Get Request Handling
    + **UNFINISHED** API Post Request Handling

+ Week 11:
    + **UNFINISHED** User Click Functionality for Maps returns: Address and Sales History if applicable
    + **UNFINISHED** Control Behaviour (Error control)
    + **UNFINISHED** CSS Styling

+ Week 12: 
    + **UNFINISHED** Back-End Testing 
    + **UNFINISHED** Front-End Testing
    + **UNFINISHED** Additional Functionality & CSS touchups

### Requirements:
Requirements needed to run app:
+ npm
+ nodemon

### Data Sources:
2001 - 2020 inclusive: https://valuation.property.nsw.gov.au/embed/propertySalesInformation
### Usage
Clone: 

```
git clone https://github.com/MQCOMP3120-2021/group-web-project-group-k.git
```

Project Installation:
```
npm install
```

Front end:

```
npm start
```

Back end:

```
npm run dev
```

### Further information:
#### Project Source Code Guide:
+ Back-End related components can be found in: `./Server/`
+ Front-End related components can be found in: `./src/`
+ All data can be found in: `./Server/Data`
+ Json data can be found in: `./Server/Data/json_data/`
+ Annual json data can be found in: `./Server/Data/json_data/Annual_data`
+ Suburb json data can be found in: `./Server/Data/json_data/Suburb_data`
+ Functions used to convert raw NSW Real Estate Data are found in: `./Server/Data/rawRead.java`
#### JSON Data Structure example:

```
{"Entries":[
	{"C_Date":"2019-11-16", <- dates are handled as yyyy-MM-dd
	"D_Code":"001", 		<- District Code
	"P_Sub":"ABERDARE", 	<- Propert Suburb
	"Area_Type":"M", 		<- Either M or H to signify Metres/Hectares respectively
	"P_Code":"2325", 		<- Post Code
	"P_Purp":"RESIDENCE", 	<- Purpose of Property
	"P_H_Num":"103", 		<- Property House Number
	"S_Date":"2019-12-30", 	<- Date of settlement
	"P_Area":"1011.83", 	<- Area of Property
	"P_S_Name":"RAWSON ST", <- Property Street name
	"P_Price":"260000", 	<- Property Price ($AUD)
	"D_Num":"AP807655", 	<- Dealing Number
	"SL_Num":"", 		    <- Strata Lot Number
	"P_U_Num":""} 			<- Property Unit Number
]}
```

### Interaction and Communication:
Our main interaction and communication during this project was done via Discord which is a VoIP, instant messaging and digital distribution platform.
Group meetings are held every Monday on a Discord Channel where we discuss our current progress with the project and any issues.
Further communication is done with instant-messaging in the Discord Server.
Resource distribution is done via the resource text-channel within the Discord Server.

### Post-Implementation: Next-steps
+ Incorporate 2021 Weekly data: Our App currently only has data for 2001-2020.
+ Data Clean up: There is currently no method for detecting whether the JSON_DATA in these entries are valid i.e. No typos, Correct address, Correct formatting for dates.
+ Automatic Data retrieval: With more time we could create a web scraper which runs periodically every week after the weekly data release date and automatically takes the data,extracts and cleans it into our suburb_data files.
+ Add more States: Expand the app for other states in Australia.
+ Login Function: Allow the user to save certain addresses and information
+ Graphs implementation: Present the data in a graphical format allowing for more clear and simplified information

### Contributors
+ 45317755 - Kent Ye            [Backend Development   | Data acquisition and cleanup]
+ 45953260 - Justin Lie         [Frontend Development  | Backend Assistance]
+ 45782334 - Erick Hartawan     [Fullstack Developer   | Connecting Frontend and Backend via various APIs]
+ 45577323 - Grishit taneja     [Front end development | Documentations]
