# Real Estate Data Map App

### Purpose

To provide an easy to use platform where users can get an informed idea of individual housing prices of properties within Sydney.
Users are able to click on different properties on the map and get the respective sales information.

### Project Milestones:
+ Week 9:
    + **DONE** React Skeleton Implemented
    + **DONE** Basic Website Front-End Structure
    + **DONE** Google Maps API Embedded
    + **DONE** Google Maps API connection with Front-End components

+ Week 10:
    + **UNFINISHED** Back End Implementation
    + **UNFINISHED** Data source Implementation: Bulk Data Clean up or Domain API Implementation
    + **UNFINISHED** API Get Request Handling
    + **UNFINISHED** API Post Request Handling

+ Week 11:
    + **UNFINISHED** User Click Functionality for Maps returns: Address and Sales History if applicable
    + **UNFINISHED** Control Behaviour (Error control)
    + **UNFINISHED** CSS Styling

+ Week 12: 
    + **UNFINISHED** Back-End Testing 
    + **UNFINISHED** Front-End Testing
    + **UNFINISHED** Additional Functionality & CSS toucgit hups

### Requirements:

Requirements needed to run app:

-   npm
-   nodemon

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

### Contributors

-   45317755 - Kent Ye [Backend Development | Data acquisition and cleanup]
-   45953260 - Justin Lie [Frontend Development | Backend Assistance]
-   45782334 - Erick Hartawan [Fullstack Developer | Connecting Frontend and Backend via various APIs]
-   45577323 - Grishit taneja [Front end development | Documentations]
