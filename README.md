
# Intelligent Forms 

Intelligent Forms is a web-based application designed for the creation of customizable form templates. Its unique functionality includes a "scan-document" feature that utilizes Azure Form Recognizer to automatically populate form fields with relevant data extracted from scanned documents. As a testament to its innovative capabilities, Intelligent Forms achieved second place in the Assist Tech Challenge 2023.

## 
The app is created with React, Typescript, NodeJs and Express.\
Azure Form Recognizer is the tool used to extract data from uploaded documents. 



## DEMO
The app is published online with Azure and Netlify.

You can try all the available features by clicking one of the links below.You can create an account or use the demo account that already has forms you can test 

username='demo@gmail.com'\
password='123456'

[DEMO-Azure](https://zealous-pebble-085bc8303.2.azurestaticapps.net/)\
[DEMO-Netlify](https://frontend--gentle-figolla-3ef08d.netlify.app/)

## Authors

- [Laur Gabor](https://www.github.com/laurgabor) -  UI/UX design and Frontend
- [Catalin Mitrofan](https://www.github.com/mitrogun) - Frontend
- [Liviu Mitrofan](https://www.github.com/Liviujmk) - Full-Stack 
- [Alin Tanasa](https://www.github.com/AllanT12) - Backend



## Features

### Authenticated users 

#### Create form

- The user is able to create a form in his account
- The user is able to add multiple dynamic fields and multiple sections in a Form.
- For any dynamic field, the user can configure a label, a Placeholder Keyword and if it’s Mandatory or not. 
- For any dynamic field, the user can set one of the types: Text/Number/Decimal/Date/Single-choice/Multiple-choice

#### Generate QR-code
- For any form, the user can generate a QR-code to make it easily accessible

#### Submissions
- For any given submission, the user is able to generate a PDF with the form content, filled with the data submitted in the form. 

### Non-Authenticated users 

#### Fill form
- User is able to upload the picture of a document and the system is able to extract data from it and automatically fill some of the fields from the form
- User is able to scan the picture of a Romanian Id Card, Passport, Romanian Vehicle Identity Card and Romanian Birth Certificate(This are the only ones trained so far).

## Screenshots

<img src="https://raw.githubusercontent.com/Liviujmk/IntelligentForms-BosanciCo/main/landing%20page.jpg" width="50%" height="50%"> 
<img src="https://raw.githubusercontent.com/Liviujmk/IntelligentForms-BosanciCo/main/forms%20page.jpg" width="50%" height="50%"> 
<img src="https://raw.githubusercontent.com/Liviujmk/IntelligentForms-BosanciCo/main/demo_IF.jpg" width="50%" height="50%"> 

